package com.smarthealth.dto;

import java.util.List;

public class ReportDTOs {

    public static class HealthReportResponse {
        private String reportTitle;
        private String generatedDate;
        private Long totalCasesCount;
        private Long totalHighSeverityCases;
        private String topDisease;
        private List<HealthCaseDTOs.HealthCaseResponse> cases;

        public HealthReportResponse() {}
        public HealthReportResponse(String reportTitle, String generatedDate, Long totalCasesCount, Long totalHighSeverityCases, String topDisease, List<HealthCaseDTOs.HealthCaseResponse> cases) {
            this.reportTitle = reportTitle; this.generatedDate = generatedDate; this.totalCasesCount = totalCasesCount; this.totalHighSeverityCases = totalHighSeverityCases; this.topDisease = topDisease; this.cases = cases;
        }

        public static HealthReportResponseBuilder builder() { return new HealthReportResponseBuilder(); }

        public static class HealthReportResponseBuilder {
            private String reportTitle; private String generatedDate; private Long totalCasesCount; private Long totalHighSeverityCases; private String topDisease; private List<HealthCaseDTOs.HealthCaseResponse> cases;
            public HealthReportResponseBuilder reportTitle(String reportTitle) { this.reportTitle = reportTitle; return this; }
            public HealthReportResponseBuilder generatedDate(String generatedDate) { this.generatedDate = generatedDate; return this; }
            public HealthReportResponseBuilder totalCasesCount(Long totalCasesCount) { this.totalCasesCount = totalCasesCount; return this; }
            public HealthReportResponseBuilder totalHighSeverityCases(Long totalHighSeverityCases) { this.totalHighSeverityCases = totalHighSeverityCases; return this; }
            public HealthReportResponseBuilder topDisease(String topDisease) { this.topDisease = topDisease; return this; }
            public HealthReportResponseBuilder cases(List<HealthCaseDTOs.HealthCaseResponse> cases) { this.cases = cases; return this; }
            public HealthReportResponse build() { return new HealthReportResponse(reportTitle, generatedDate, totalCasesCount, totalHighSeverityCases, topDisease, cases); }
        }

        public String getReportTitle() { return reportTitle; }
        public String getGeneratedDate() { return generatedDate; }
        public Long getTotalCasesCount() { return totalCasesCount; }
        public Long getTotalHighSeverityCases() { return totalHighSeverityCases; }
        public String getTopDisease() { return topDisease; }
        public List<HealthCaseDTOs.HealthCaseResponse> getCases() { return cases; }
    }

    public static class WaterReportResponse {
        private String reportTitle;
        private String generatedDate;
        private Long totalSamplesCount;
        private Long contaminatedSamplesCount;
        private List<WaterQualityDTOs.WaterQualityResponse> records;

        public WaterReportResponse() {}
        public WaterReportResponse(String reportTitle, String generatedDate, Long totalSamplesCount, Long contaminatedSamplesCount, List<WaterQualityDTOs.WaterQualityResponse> records) {
            this.reportTitle = reportTitle; this.generatedDate = generatedDate; this.totalSamplesCount = totalSamplesCount; this.contaminatedSamplesCount = contaminatedSamplesCount; this.records = records;
        }

        public static WaterReportResponseBuilder builder() { return new WaterReportResponseBuilder(); }

        public static class WaterReportResponseBuilder {
            private String reportTitle; private String generatedDate; private Long totalSamplesCount; private Long contaminatedSamplesCount; private List<WaterQualityDTOs.WaterQualityResponse> records;
            public WaterReportResponseBuilder reportTitle(String reportTitle) { this.reportTitle = reportTitle; return this; }
            public WaterReportResponseBuilder generatedDate(String generatedDate) { this.generatedDate = generatedDate; return this; }
            public WaterReportResponseBuilder totalSamplesCount(Long totalSamplesCount) { this.totalSamplesCount = totalSamplesCount; return this; }
            public WaterReportResponseBuilder contaminatedSamplesCount(Long contaminatedSamplesCount) { this.contaminatedSamplesCount = contaminatedSamplesCount; return this; }
            public WaterReportResponseBuilder records(List<WaterQualityDTOs.WaterQualityResponse> records) { this.records = records; return this; }
            public WaterReportResponse build() { return new WaterReportResponse(reportTitle, generatedDate, totalSamplesCount, contaminatedSamplesCount, records); }
        }

        public String getReportTitle() { return reportTitle; }
        public String getGeneratedDate() { return generatedDate; }
        public Long getTotalSamplesCount() { return totalSamplesCount; }
        public Long getContaminatedSamplesCount() { return contaminatedSamplesCount; }
        public List<WaterQualityDTOs.WaterQualityResponse> getRecords() { return records; }
    }
}
