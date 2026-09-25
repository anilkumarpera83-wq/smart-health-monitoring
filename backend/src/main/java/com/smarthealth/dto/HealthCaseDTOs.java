package com.smarthealth.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class HealthCaseDTOs {

    public static class CreateHealthCaseRequest {
        @NotNull(message = "Age is required")
        @Min(0)
        private Integer age;

        @NotBlank(message = "Gender is required")
        private String gender;

        @NotNull(message = "District is required")
        private Long districtId;

        @NotNull(message = "Mandal is required")
        private Long mandalId;

        @NotNull(message = "Village is required")
        private Long villageId;

        private LocalDate reportingDate;

        private Long suspectedDiseaseId;
        private Long confirmedDiseaseId;

        @NotBlank(message = "Severity is required")
        private String severity;

        private Double bodyTemperature;
        private Integer durationDays;
        private String waterSource;
        private String notes;

        private List<Long> symptomIds;

        public CreateHealthCaseRequest() {}

        public Integer getAge() { return age; }
        public void setAge(Integer age) { this.age = age; }
        public String getGender() { return gender; }
        public void setGender(String gender) { this.gender = gender; }
        public Long getDistrictId() { return districtId; }
        public void setDistrictId(Long districtId) { this.districtId = districtId; }
        public Long getMandalId() { return mandalId; }
        public void setMandalId(Long mandalId) { this.mandalId = mandalId; }
        public Long getVillageId() { return villageId; }
        public void setVillageId(Long villageId) { this.villageId = villageId; }
        public LocalDate getReportingDate() { return reportingDate; }
        public void setReportingDate(LocalDate reportingDate) { this.reportingDate = reportingDate; }
        public Long getSuspectedDiseaseId() { return suspectedDiseaseId; }
        public void setSuspectedDiseaseId(Long suspectedDiseaseId) { this.suspectedDiseaseId = suspectedDiseaseId; }
        public Long getConfirmedDiseaseId() { return confirmedDiseaseId; }
        public void setConfirmedDiseaseId(Long confirmedDiseaseId) { this.confirmedDiseaseId = confirmedDiseaseId; }
        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }
        public Double getBodyTemperature() { return bodyTemperature; }
        public void setBodyTemperature(Double bodyTemperature) { this.bodyTemperature = bodyTemperature; }
        public Integer getDurationDays() { return durationDays; }
        public void setDurationDays(Integer durationDays) { this.durationDays = durationDays; }
        public String getWaterSource() { return waterSource; }
        public void setWaterSource(String waterSource) { this.waterSource = waterSource; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
        public List<Long> getSymptomIds() { return symptomIds; }
        public void setSymptomIds(List<Long> symptomIds) { this.symptomIds = symptomIds; }
    }

    public static class HealthCaseResponse {
        private Long id;
        private String caseNumber;
        private Integer age;
        private String gender;
        private String stateName;
        private String districtName;
        private String mandalName;
        private String villageName;
        private LocalDate reportingDate;
        private String suspectedDiseaseName;
        private String confirmedDiseaseName;
        private String severity;
        private Double bodyTemperature;
        private Integer durationDays;
        private String waterSource;
        private String notes;
        private String reportedByName;
        private List<String> symptoms;
        private LocalDateTime createdAt;

        public HealthCaseResponse() {}
        public HealthCaseResponse(Long id, String caseNumber, Integer age, String gender, String stateName, String districtName, String mandalName, String villageName, LocalDate reportingDate, String suspectedDiseaseName, String confirmedDiseaseName, String severity, Double bodyTemperature, Integer durationDays, String waterSource, String notes, String reportedByName, List<String> symptoms, LocalDateTime createdAt) {
            this.id = id; this.caseNumber = caseNumber; this.age = age; this.gender = gender; this.stateName = stateName; this.districtName = districtName; this.mandalName = mandalName; this.villageName = villageName; this.reportingDate = reportingDate; this.suspectedDiseaseName = suspectedDiseaseName; this.confirmedDiseaseName = confirmedDiseaseName; this.severity = severity; this.bodyTemperature = bodyTemperature; this.durationDays = durationDays; this.waterSource = waterSource; this.notes = notes; this.reportedByName = reportedByName; this.symptoms = symptoms; this.createdAt = createdAt;
        }

        public static HealthCaseResponseBuilder builder() { return new HealthCaseResponseBuilder(); }

        public static class HealthCaseResponseBuilder {
            private Long id; private String caseNumber; private Integer age; private String gender; private String stateName; private String districtName; private String mandalName; private String villageName; private LocalDate reportingDate; private String suspectedDiseaseName; private String confirmedDiseaseName; private String severity; private Double bodyTemperature; private Integer durationDays; private String waterSource; private String notes; private String reportedByName; private List<String> symptoms; private LocalDateTime createdAt;
            public HealthCaseResponseBuilder id(Long id) { this.id = id; return this; }
            public HealthCaseResponseBuilder caseNumber(String caseNumber) { this.caseNumber = caseNumber; return this; }
            public HealthCaseResponseBuilder age(Integer age) { this.age = age; return this; }
            public HealthCaseResponseBuilder gender(String gender) { this.gender = gender; return this; }
            public HealthCaseResponseBuilder stateName(String stateName) { this.stateName = stateName; return this; }
            public HealthCaseResponseBuilder districtName(String districtName) { this.districtName = districtName; return this; }
            public HealthCaseResponseBuilder mandalName(String mandalName) { this.mandalName = mandalName; return this; }
            public HealthCaseResponseBuilder villageName(String villageName) { this.villageName = villageName; return this; }
            public HealthCaseResponseBuilder reportingDate(LocalDate reportingDate) { this.reportingDate = reportingDate; return this; }
            public HealthCaseResponseBuilder suspectedDiseaseName(String suspectedDiseaseName) { this.suspectedDiseaseName = suspectedDiseaseName; return this; }
            public HealthCaseResponseBuilder confirmedDiseaseName(String confirmedDiseaseName) { this.confirmedDiseaseName = confirmedDiseaseName; return this; }
            public HealthCaseResponseBuilder severity(String severity) { this.severity = severity; return this; }
            public HealthCaseResponseBuilder bodyTemperature(Double bodyTemperature) { this.bodyTemperature = bodyTemperature; return this; }
            public HealthCaseResponseBuilder durationDays(Integer durationDays) { this.durationDays = durationDays; return this; }
            public HealthCaseResponseBuilder waterSource(String waterSource) { this.waterSource = waterSource; return this; }
            public HealthCaseResponseBuilder notes(String notes) { this.notes = notes; return this; }
            public HealthCaseResponseBuilder reportedByName(String reportedByName) { this.reportedByName = reportedByName; return this; }
            public HealthCaseResponseBuilder symptoms(List<String> symptoms) { this.symptoms = symptoms; return this; }
            public HealthCaseResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
            public HealthCaseResponse build() { return new HealthCaseResponse(id, caseNumber, age, gender, stateName, districtName, mandalName, villageName, reportingDate, suspectedDiseaseName, confirmedDiseaseName, severity, bodyTemperature, durationDays, waterSource, notes, reportedByName, symptoms, createdAt); }
        }

        public Long getId() { return id; }
        public String getCaseNumber() { return caseNumber; }
        public Integer getAge() { return age; }
        public String getGender() { return gender; }
        public String getStateName() { return stateName; }
        public String getDistrictName() { return districtName; }
        public String getMandalName() { return mandalName; }
        public String getVillageName() { return villageName; }
        public LocalDate getReportingDate() { return reportingDate; }
        public String getSuspectedDiseaseName() { return suspectedDiseaseName; }
        public String getConfirmedDiseaseName() { return confirmedDiseaseName; }
        public String getSeverity() { return severity; }
        public Double getBodyTemperature() { return bodyTemperature; }
        public Integer getDurationDays() { return durationDays; }
        public String getWaterSource() { return waterSource; }
        public String getNotes() { return notes; }
        public String getReportedByName() { return reportedByName; }
        public List<String> getSymptoms() { return symptoms; }
        public LocalDateTime getCreatedAt() { return createdAt; }
    }
}
