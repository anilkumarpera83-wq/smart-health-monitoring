package com.smarthealth.dto;

import java.util.List;

public class DashboardDTOs {

    public static class ChartDataPointDTO {
        private String name;
        private Double value;
        private String category;

        public ChartDataPointDTO() {}
        public ChartDataPointDTO(String name, Double value, String category) {
            this.name = name;
            this.value = value;
            this.category = category;
        }

        public static ChartDataPointDTOBuilder builder() { return new ChartDataPointDTOBuilder(); }

        public static class ChartDataPointDTOBuilder {
            private String name; private Double value; private String category;
            public ChartDataPointDTOBuilder name(String name) { this.name = name; return this; }
            public ChartDataPointDTOBuilder value(Double value) { this.value = value; return this; }
            public ChartDataPointDTOBuilder category(String category) { this.category = category; return this; }
            public ChartDataPointDTO build() { return new ChartDataPointDTO(name, value, category); }
        }

        public String getName() { return name; }
        public Double getValue() { return value; }
        public String getCategory() { return category; }
    }

    public static class DashboardSummaryDTO {
        private long totalCases;
        private long activeCases;
        private long confirmedCases;
        private long highRiskVillagesCount;
        private long waterQualityAlertsCount;
        private long activeOutbreakAlertsCount;
        private double averageRiskScore;

        private List<ChartDataPointDTO> diseaseDistribution;
        private List<ChartDataPointDTO> districtWiseCases;
        private List<ChartDataPointDTO> monthlyCaseTrends;
        private List<ChartDataPointDTO> waterQualityBreakdown;
        private List<ChartDataPointDTO> alertRiskLevelDistribution;
        private String disclaimer;

        public DashboardSummaryDTO() {}
        public DashboardSummaryDTO(long totalCases, long activeCases, long confirmedCases, long highRiskVillagesCount, long waterQualityAlertsCount, long activeOutbreakAlertsCount, double averageRiskScore, List<ChartDataPointDTO> diseaseDistribution, List<ChartDataPointDTO> districtWiseCases, List<ChartDataPointDTO> monthlyCaseTrends, List<ChartDataPointDTO> waterQualityBreakdown, List<ChartDataPointDTO> alertRiskLevelDistribution, String disclaimer) {
            this.totalCases = totalCases; this.activeCases = activeCases; this.confirmedCases = confirmedCases; this.highRiskVillagesCount = highRiskVillagesCount; this.waterQualityAlertsCount = waterQualityAlertsCount; this.activeOutbreakAlertsCount = activeOutbreakAlertsCount; this.averageRiskScore = averageRiskScore; this.diseaseDistribution = diseaseDistribution; this.districtWiseCases = districtWiseCases; this.monthlyCaseTrends = monthlyCaseTrends; this.waterQualityBreakdown = waterQualityBreakdown; this.alertRiskLevelDistribution = alertRiskLevelDistribution; this.disclaimer = disclaimer;
        }

        public static DashboardSummaryDTOBuilder builder() { return new DashboardSummaryDTOBuilder(); }

        public static class DashboardSummaryDTOBuilder {
            private long totalCases; private long activeCases; private long confirmedCases; private long highRiskVillagesCount; private long waterQualityAlertsCount; private long activeOutbreakAlertsCount; private double averageRiskScore; private List<ChartDataPointDTO> diseaseDistribution; private List<ChartDataPointDTO> districtWiseCases; private List<ChartDataPointDTO> monthlyCaseTrends; private List<ChartDataPointDTO> waterQualityBreakdown; private List<ChartDataPointDTO> alertRiskLevelDistribution; private String disclaimer;
            public DashboardSummaryDTOBuilder totalCases(long totalCases) { this.totalCases = totalCases; return this; }
            public DashboardSummaryDTOBuilder activeCases(long activeCases) { this.activeCases = activeCases; return this; }
            public DashboardSummaryDTOBuilder confirmedCases(long confirmedCases) { this.confirmedCases = confirmedCases; return this; }
            public DashboardSummaryDTOBuilder highRiskVillagesCount(long highRiskVillagesCount) { this.highRiskVillagesCount = highRiskVillagesCount; return this; }
            public DashboardSummaryDTOBuilder waterQualityAlertsCount(long waterQualityAlertsCount) { this.waterQualityAlertsCount = waterQualityAlertsCount; return this; }
            public DashboardSummaryDTOBuilder activeOutbreakAlertsCount(long activeOutbreakAlertsCount) { this.activeOutbreakAlertsCount = activeOutbreakAlertsCount; return this; }
            public DashboardSummaryDTOBuilder averageRiskScore(double averageRiskScore) { this.averageRiskScore = averageRiskScore; return this; }
            public DashboardSummaryDTOBuilder diseaseDistribution(List<ChartDataPointDTO> diseaseDistribution) { this.diseaseDistribution = diseaseDistribution; return this; }
            public DashboardSummaryDTOBuilder districtWiseCases(List<ChartDataPointDTO> districtWiseCases) { this.districtWiseCases = districtWiseCases; return this; }
            public DashboardSummaryDTOBuilder monthlyCaseTrends(List<ChartDataPointDTO> monthlyCaseTrends) { this.monthlyCaseTrends = monthlyCaseTrends; return this; }
            public DashboardSummaryDTOBuilder waterQualityBreakdown(List<ChartDataPointDTO> waterQualityBreakdown) { this.waterQualityBreakdown = waterQualityBreakdown; return this; }
            public DashboardSummaryDTOBuilder alertRiskLevelDistribution(List<ChartDataPointDTO> alertRiskLevelDistribution) { this.alertRiskLevelDistribution = alertRiskLevelDistribution; return this; }
            public DashboardSummaryDTOBuilder disclaimer(String disclaimer) { this.disclaimer = disclaimer; return this; }
            public DashboardSummaryDTO build() { return new DashboardSummaryDTO(totalCases, activeCases, confirmedCases, highRiskVillagesCount, waterQualityAlertsCount, activeOutbreakAlertsCount, averageRiskScore, diseaseDistribution, districtWiseCases, monthlyCaseTrends, waterQualityBreakdown, alertRiskLevelDistribution, disclaimer); }
        }

        public long getTotalCases() { return totalCases; }
        public long getActiveCases() { return activeCases; }
        public long getConfirmedCases() { return confirmedCases; }
        public long getHighRiskVillagesCount() { return highRiskVillagesCount; }
        public long getWaterQualityAlertsCount() { return waterQualityAlertsCount; }
        public long getActiveOutbreakAlertsCount() { return activeOutbreakAlertsCount; }
        public double getAverageRiskScore() { return averageRiskScore; }
        public List<ChartDataPointDTO> getDiseaseDistribution() { return diseaseDistribution; }
        public List<ChartDataPointDTO> getDistrictWiseCases() { return districtWiseCases; }
        public List<ChartDataPointDTO> getMonthlyCaseTrends() { return monthlyCaseTrends; }
        public List<ChartDataPointDTO> getWaterQualityBreakdown() { return waterQualityBreakdown; }
        public List<ChartDataPointDTO> getAlertRiskLevelDistribution() { return alertRiskLevelDistribution; }
        public String getDisclaimer() { return disclaimer; }
    }
}
