package com.smarthealth.service;

import com.smarthealth.dto.HealthCaseDTOs.*;
import com.smarthealth.entity.*;
import com.smarthealth.exception.ResourceNotFoundException;
import com.smarthealth.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class HealthCaseService {

    private final HealthCaseRepository healthCaseRepository;
    private final DiseaseRepository diseaseRepository;
    private final SymptomRepository symptomRepository;
    private final UserRepository userRepository;
    private final LocationService locationService;
    private final OutbreakDetectionService outbreakDetectionService;
    private final AuditLogService auditLogService;

    public HealthCaseService(HealthCaseRepository healthCaseRepository, DiseaseRepository diseaseRepository, SymptomRepository symptomRepository, UserRepository userRepository, LocationService locationService, OutbreakDetectionService outbreakDetectionService, AuditLogService auditLogService) {
        this.healthCaseRepository = healthCaseRepository;
        this.diseaseRepository = diseaseRepository;
        this.symptomRepository = symptomRepository;
        this.userRepository = userRepository;
        this.locationService = locationService;
        this.outbreakDetectionService = outbreakDetectionService;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public HealthCaseResponse createHealthCase(CreateHealthCaseRequest request, String reporterEmail) {
        User reporter = userRepository.findByEmail(reporterEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Reporting user not found"));

        District district = locationService.getDistrictEntity(request.getDistrictId());
        Mandal mandal = locationService.getMandalEntity(request.getMandalId());
        Village village = locationService.getVillageEntity(request.getVillageId());
        State state = district.getState();

        Disease suspected = null;
        if (request.getSuspectedDiseaseId() != null) {
            suspected = diseaseRepository.findById(request.getSuspectedDiseaseId()).orElse(null);
        }

        Disease confirmed = null;
        if (request.getConfirmedDiseaseId() != null) {
            confirmed = diseaseRepository.findById(request.getConfirmedDiseaseId()).orElse(null);
        }

        Set<Symptom> symptoms = new HashSet<>();
        if (request.getSymptomIds() != null && !request.getSymptomIds().isEmpty()) {
            symptoms.addAll(symptomRepository.findAllById(request.getSymptomIds()));
        }

        String caseNumber = "HC-" + System.currentTimeMillis();

        HealthCase healthCase = HealthCase.builder()
                .caseNumber(caseNumber)
                .age(request.getAge())
                .gender(request.getGender())
                .state(state)
                .district(district)
                .mandal(mandal)
                .village(village)
                .reportingDate(request.getReportingDate() != null ? request.getReportingDate() : LocalDate.now())
                .suspectedDisease(suspected)
                .confirmedDisease(confirmed)
                .severity(request.getSeverity() != null ? request.getSeverity().toUpperCase() : "MEDIUM")
                .bodyTemperature(request.getBodyTemperature())
                .durationDays(request.getDurationDays())
                .waterSource(request.getWaterSource())
                .notes(request.getNotes())
                .reportedBy(reporter)
                .symptoms(symptoms)
                .build();

        HealthCase savedCase = healthCaseRepository.save(healthCase);

        auditLogService.logAction(reporter.getId(), reporter.getEmail(), "CREATE_HEALTH_CASE", "HealthCase", savedCase.getId(), "Reported health case " + caseNumber, null);

        outbreakDetectionService.checkAndTriggerDiseaseOutbreakAlert(savedCase);

        return mapToResponse(savedCase);
    }

    public Page<HealthCaseResponse> getAllCases(Pageable pageable) {
        return healthCaseRepository.findAll(pageable).map(this::mapToResponse);
    }

    public HealthCaseResponse getCaseById(Long id) {
        HealthCase hc = healthCaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Health case not found with id " + id));
        return mapToResponse(hc);
    }

    @Transactional
    public HealthCaseResponse updateHealthCase(Long id, CreateHealthCaseRequest request) {
        HealthCase hc = healthCaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Health case not found with id " + id));

        if (request.getConfirmedDiseaseId() != null) {
            Disease confirmed = diseaseRepository.findById(request.getConfirmedDiseaseId()).orElse(null);
            hc.setConfirmedDisease(confirmed);
        }
        if (request.getSeverity() != null) {
            hc.setSeverity(request.getSeverity().toUpperCase());
        }
        if (request.getNotes() != null) {
            hc.setNotes(request.getNotes());
        }

        HealthCase updated = healthCaseRepository.save(hc);
        return mapToResponse(updated);
    }

    public HealthCaseResponse mapToResponse(HealthCase hc) {
        return HealthCaseResponse.builder()
                .id(hc.getId())
                .caseNumber(hc.getCaseNumber())
                .age(hc.getAge())
                .gender(hc.getGender())
                .stateName(hc.getState() != null ? hc.getState().getName() : null)
                .districtName(hc.getDistrict() != null ? hc.getDistrict().getName() : null)
                .mandalName(hc.getMandal() != null ? hc.getMandal().getName() : null)
                .villageName(hc.getVillage() != null ? hc.getVillage().getName() : null)
                .reportingDate(hc.getReportingDate())
                .suspectedDiseaseName(hc.getSuspectedDisease() != null ? hc.getSuspectedDisease().getName() : "Unspecified")
                .confirmedDiseaseName(hc.getConfirmedDisease() != null ? hc.getConfirmedDisease().getName() : null)
                .severity(hc.getSeverity())
                .bodyTemperature(hc.getBodyTemperature())
                .durationDays(hc.getDurationDays())
                .waterSource(hc.getWaterSource())
                .notes(hc.getNotes())
                .reportedByName(hc.getReportedBy() != null ? hc.getReportedBy().getFullName() : null)
                .symptoms(hc.getSymptoms().stream().map(Symptom::getName).collect(Collectors.toList()))
                .createdAt(hc.getCreatedAt())
                .build();
    }
}
