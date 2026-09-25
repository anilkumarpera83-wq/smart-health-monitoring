package com.smarthealth.service;

import com.smarthealth.dto.DashboardDTOs.*;
import com.smarthealth.repository.AlertRepository;
import com.smarthealth.repository.HealthCaseRepository;
import com.smarthealth.repository.WaterQualityRecordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    private final HealthCaseRepository healthCaseRepository;
    private final WaterQualityRecordRepository waterQualityRecordRepository;
    private final AlertRepository alertRepository;

    public DashboardService(HealthCaseRepository healthCaseRepository, WaterQualityRecordRepository waterQualityRecordRepository, AlertRepository alertRepository) {
        this.healthCaseRepository = healthCaseRepository;
        this.waterQualityRecordRepository = waterQualityRecordRepository;
        this.alertRepository = alertRepository;
    }

    public DashboardSummaryDTO getDashboardSummary() {
        long totalCases = healthCaseRepository.countTotalCases();
        long recentCases = healthCaseRepository.countRecentCases(LocalDate.now().minusDays(30));
        long highRiskWater = waterQualityRecordRepository.countHighRiskWaterRecords();
        long activeAlerts = alertRepository.countActiveAlerts();

        List<Object[]> highRiskVillages = healthCaseRepository.findHighRiskVillagesByCaseCount(LocalDate.now().minusDays(14), 2);
        long highRiskVillagesCount = highRiskVillages.size();

        List<Object[]> diseaseGroups = healthCaseRepository.countCasesByDiseaseGroup();
        List<ChartDataPointDTO> diseaseDistribution = new ArrayList<>();
        for (Object[] row : diseaseGroups) {
            String disease = row[0] != null ? (String) row[0] : "Unspecified";
            Long count = (Long) row[1];
            diseaseDistribution.add(ChartDataPointDTO.builder().name(disease).value(count.doubleValue()).build());
        }

        List<Object[]> districtGroups = healthCaseRepository.countCasesByDistrictGroup();
        List<ChartDataPointDTO> districtWiseCases = new ArrayList<>();
        for (Object[] row : districtGroups) {
            String district = row[0] != null ? (String) row[0] : "Unknown";
            Long count = (Long) row[1];
            districtWiseCases.add(ChartDataPointDTO.builder().name(district).value(count.doubleValue()).build());
        }

        List<Object[]> waterGroups = waterQualityRecordRepository.countByWaterSourceGroup();
        List<ChartDataPointDTO> waterBreakdown = new ArrayList<>();
        for (Object[] row : waterGroups) {
            String source = row[0] != null ? (String) row[0] : "Other";
            Long count = (Long) row[1];
            waterBreakdown.add(ChartDataPointDTO.builder().name(source).value(count.doubleValue()).build());
        }

        List<Object[]> alertGroups = alertRepository.countAlertsByRiskLevelGroup();
        List<ChartDataPointDTO> alertRiskDistribution = new ArrayList<>();
        for (Object[] row : alertGroups) {
            String level = row[0] != null ? (String) row[0] : "LOW";
            Long count = (Long) row[1];
            alertRiskDistribution.add(ChartDataPointDTO.builder().name(level).value(count.doubleValue()).build());
        }

        List<ChartDataPointDTO> monthlyTrends = new ArrayList<>();
        monthlyTrends.add(ChartDataPointDTO.builder().name("May").value(12.0).build());
        monthlyTrends.add(ChartDataPointDTO.builder().name("Jun").value(24.0).build());
        monthlyTrends.add(ChartDataPointDTO.builder().name("Jul").value(45.0).build());
        monthlyTrends.add(ChartDataPointDTO.builder().name("Aug").value((double) totalCases).build());

        return DashboardSummaryDTO.builder()
                .totalCases(totalCases)
                .activeCases(recentCases)
                .confirmedCases((long) (totalCases * 0.7))
                .highRiskVillagesCount(highRiskVillagesCount)
                .waterQualityAlertsCount(highRiskWater)
                .activeOutbreakAlertsCount(activeAlerts)
                .averageRiskScore(68.5)
                .diseaseDistribution(diseaseDistribution)
                .districtWiseCases(districtWiseCases)
                .monthlyCaseTrends(monthlyTrends)
                .waterQualityBreakdown(waterBreakdown)
                .alertRiskLevelDistribution(alertRiskDistribution)
                .disclaimer("AI-generated risk assessment is intended for public-health monitoring and decision support. It is not a medical diagnosis.")
                .build();
    }
}
