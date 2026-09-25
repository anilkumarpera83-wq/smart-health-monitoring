package com.smarthealth.service;

import com.smarthealth.dto.AIPredictionDTOs.*;
import com.smarthealth.entity.AIPrediction;
import com.smarthealth.entity.District;
import com.smarthealth.entity.Mandal;
import com.smarthealth.entity.Village;
import com.smarthealth.repository.AIPredictionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Service
public class MLIntegrationService {

    private final AIPredictionRepository aiPredictionRepository;
    private final LocationService locationService;
    private final AuditLogService auditLogService;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${app.ml-service.url:http://localhost:8000/api/ml/predict}")
    private String mlServiceUrl;

    public MLIntegrationService(AIPredictionRepository aiPredictionRepository, LocationService locationService, AuditLogService auditLogService) {
        this.aiPredictionRepository = aiPredictionRepository;
        this.locationService = locationService;
        this.auditLogService = auditLogService;
    }

    public AIPredictionResponse predictAndSave(AIPredictionRequest request) {
        AIPredictionResponse response;
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<AIPredictionRequest> entity = new HttpEntity<>(request, headers);

            response = restTemplate.postForObject(mlServiceUrl, entity, AIPredictionResponse.class);
        } catch (Exception ex) {
            double calculatedScore = Math.min(100.0, (request.getRecentCases() != null ? request.getRecentCases() * 6.0 : 30.0) +
                    (request.getWaterQualityScore() != null ? (100 - request.getWaterQualityScore()) * 0.4 : 20.0) +
                    (request.getTurbidity() != null ? request.getTurbidity() * 3.0 : 5.0));
            calculatedScore = Math.round(calculatedScore * 10.0) / 10.0;

            String level = "LOW";
            if (calculatedScore > 75) level = "CRITICAL";
            else if (calculatedScore > 50) level = "HIGH";
            else if (calculatedScore > 25) level = "MEDIUM";

            response = AIPredictionResponse.builder()
                    .districtName(request.getDistrict())
                    .mandalName(request.getMandal())
                    .villageName(request.getVillage())
                    .predictedDisease(request.getDisease() != null ? request.getDisease() : "Diarrheal Disease")
                    .riskScore(calculatedScore)
                    .riskLevel(level)
                    .probability(Math.round(calculatedScore) / 100.0)
                    .factors(Arrays.asList("Elevated recent case counts", "Water quality degradation indicator"))
                    .disclaimer("AI-generated risk assessment is intended for public-health monitoring and decision support. It is not a medical diagnosis.")
                    .modelVersion("1.0.0-FallbackEngine")
                    .createdAt(LocalDateTime.now())
                    .build();
        }

        if (request.getDistrict() != null && request.getMandal() != null && request.getVillage() != null) {
            try {
                District district = locationService.getDistrictsByState(1L).stream()
                        .filter(d -> d.getName().equalsIgnoreCase(request.getDistrict()))
                        .findFirst().map(d -> locationService.getDistrictEntity(d.getId())).orElse(null);

                if (district != null) {
                    Mandal mandal = locationService.getMandalsByDistrict(district.getId()).stream()
                            .filter(m -> m.getName().equalsIgnoreCase(request.getMandal()))
                            .findFirst().map(m -> locationService.getMandalEntity(m.getId())).orElse(null);

                    if (mandal != null) {
                        Village village = locationService.getVillagesByMandal(mandal.getId()).stream()
                                .filter(v -> v.getName().equalsIgnoreCase(request.getVillage()))
                                .findFirst().map(v -> locationService.getVillageEntity(v.getId())).orElse(null);

                        if (village != null) {
                            AIPrediction prediction = AIPrediction.builder()
                                    .state(district.getState())
                                    .district(district)
                                    .mandal(mandal)
                                    .village(village)
                                    .diseaseName(response.getPredictedDisease())
                                    .riskScore(response.getRiskScore())
                                    .riskLevel(response.getRiskLevel())
                                    .probability(response.getProbability())
                                    .contributingFactors(response.getFactors() != null ? String.join("; ", response.getFactors()) : "")
                                    .modelVersion(response.getModelVersion())
                                    .build();

                            AIPrediction saved = aiPredictionRepository.save(prediction);
                            response.setId(saved.getId());
                            response.setCreatedAt(saved.getCreatedAt());

                            auditLogService.logAction(null, null, "AI_PREDICTION", "AIPrediction", saved.getId(), "Generated AI risk prediction (Score: " + response.getRiskScore() + ", Level: " + response.getRiskLevel() + ")", null);
                        }
                    }
                }
            } catch (Exception ignore) {}
        }

        return response;
    }

    public Page<AIPredictionResponse> getPredictionHistory(Pageable pageable) {
        return aiPredictionRepository.findAll(pageable).map(p -> AIPredictionResponse.builder()
                .id(p.getId())
                .districtName(p.getDistrict().getName())
                .mandalName(p.getMandal().getName())
                .villageName(p.getVillage().getName())
                .predictedDisease(p.getDiseaseName())
                .riskScore(p.getRiskScore())
                .riskLevel(p.getRiskLevel())
                .probability(p.getProbability())
                .factors(p.getContributingFactors() != null ? Arrays.asList(p.getContributingFactors().split("; ")) : List.of())
                .modelVersion(p.getModelVersion())
                .disclaimer("AI-generated risk assessment is intended for public-health monitoring and decision support. It is not a medical diagnosis.")
                .createdAt(p.getCreatedAt())
                .build());
    }
}
