package com.smarthealth.service;

import com.smarthealth.entity.*;
import com.smarthealth.repository.AlertRepository;
import com.smarthealth.repository.HealthCaseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class OutbreakDetectionService {

    private final AlertRepository alertRepository;
    private final HealthCaseRepository healthCaseRepository;

    public OutbreakDetectionService(AlertRepository alertRepository, HealthCaseRepository healthCaseRepository) {
        this.alertRepository = alertRepository;
        this.healthCaseRepository = healthCaseRepository;
    }

    @Transactional
    public void checkAndTriggerDiseaseOutbreakAlert(HealthCase healthCase) {
        Village village = healthCase.getVillage();
        LocalDate sevenDaysAgo = LocalDate.now().minusDays(7);

        long recentCount = healthCaseRepository.countRecentCasesByVillage(village.getId(), sevenDaysAgo);

        if (recentCount >= 3) {
            String alertCode = "ALT-CASE-" + System.currentTimeMillis();
            String riskLevel = recentCount >= 6 ? "CRITICAL" : "HIGH";

            Alert alert = Alert.builder()
                    .alertCode(alertCode)
                    .alertType("DISEASE_OUTBREAK")
                    .state(healthCase.getState())
                    .district(healthCase.getDistrict())
                    .mandal(healthCase.getMandal())
                    .village(village)
                    .disease(healthCase.getSuspectedDisease())
                    .riskLevel(riskLevel)
                    .riskScore(recentCount * 12.5)
                    .message("Outbreak warning: " + recentCount + " cases of suspected " +
                            (healthCase.getSuspectedDisease() != null ? healthCase.getSuspectedDisease().getName() : "disease") +
                            " reported in " + village.getName() + " within 7 days.")
                    .status("NEW")
                    .build();

            alertRepository.save(alert);
        }
    }

    @Transactional
    public void checkAndTriggerWaterContaminationAlert(WaterQualityRecord record) {
        if ("HIGH".equals(record.getRiskLevel()) || "CRITICAL".equals(record.getRiskLevel())) {
            String alertCode = "ALT-WATER-" + System.currentTimeMillis();

            Alert alert = Alert.builder()
                    .alertCode(alertCode)
                    .alertType("WATER_CONTAMINATION")
                    .state(record.getState())
                    .district(record.getDistrict())
                    .mandal(record.getMandal())
                    .village(record.getVillage())
                    .riskLevel(record.getRiskLevel())
                    .riskScore("CRITICAL".equals(record.getRiskLevel()) ? 92.0 : 75.0)
                    .message("Water safety warning: " + record.getRiskLevel() + " contamination detected at " +
                            record.getWaterSource() + " in " + record.getVillage().getName() +
                            ". pH: " + record.getPh() + ", Turbidity: " + record.getTurbidity() + " NTU, E. coli: " + record.getEColiStatus() + ".")
                    .status("NEW")
                    .build();

            alertRepository.save(alert);
        }
    }
}
