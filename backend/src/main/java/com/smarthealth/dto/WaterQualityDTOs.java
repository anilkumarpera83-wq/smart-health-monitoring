package com.smarthealth.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class WaterQualityDTOs {

    public static class CreateWaterQualityRequest {
        @NotNull(message = "District is required")
        private Long districtId;

        @NotNull(message = "Mandal is required")
        private Long mandalId;

        @NotNull(message = "Village is required")
        private Long villageId;

        @NotNull(message = "Water source is required")
        private String waterSource;

        private LocalDate collectionDate;

        @NotNull(message = "pH is required")
        private Double ph;

        @NotNull(message = "Turbidity is required")
        private Double turbidity;

        private Double temperature;
        private Double tds;
        private Boolean bacterialContamination;
        private String eColiStatus;
        private String notes;

        public CreateWaterQualityRequest() {}

        public Long getDistrictId() { return districtId; }
        public void setDistrictId(Long districtId) { this.districtId = districtId; }
        public Long getMandalId() { return mandalId; }
        public void setMandalId(Long mandalId) { this.mandalId = mandalId; }
        public Long getVillageId() { return villageId; }
        public void setVillageId(Long villageId) { this.villageId = villageId; }
        public String getWaterSource() { return waterSource; }
        public void setWaterSource(String waterSource) { this.waterSource = waterSource; }
        public LocalDate getCollectionDate() { return collectionDate; }
        public void setCollectionDate(LocalDate collectionDate) { this.collectionDate = collectionDate; }
        public Double getPh() { return ph; }
        public void setPh(Double ph) { this.ph = ph; }
        public Double getTurbidity() { return turbidity; }
        public void setTurbidity(Double turbidity) { this.turbidity = turbidity; }
        public Double getTemperature() { return temperature; }
        public void setTemperature(Double temperature) { this.temperature = temperature; }
        public Double getTds() { return tds; }
        public void setTds(Double tds) { this.tds = tds; }
        public Boolean getBacterialContamination() { return bacterialContamination; }
        public void setBacterialContamination(Boolean bacterialContamination) { this.bacterialContamination = bacterialContamination; }
        public String getEColiStatus() { return eColiStatus; }
        public void setEColiStatus(String eColiStatus) { this.eColiStatus = eColiStatus; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
    }

    public static class WaterQualityResponse {
        private Long id;
        private String sampleCode;
        private String stateName;
        private String districtName;
        private String mandalName;
        private String villageName;
        private String waterSource;
        private LocalDate collectionDate;
        private Double ph;
        private Double turbidity;
        private Double temperature;
        private Double tds;
        private Boolean bacterialContamination;
        private String eColiStatus;
        private String overallQuality;
        private String riskLevel;
        private String notes;
        private String submittedByName;
        private LocalDateTime createdAt;

        public WaterQualityResponse() {}
        public WaterQualityResponse(Long id, String sampleCode, String stateName, String districtName, String mandalName, String villageName, String waterSource, LocalDate collectionDate, Double ph, Double turbidity, Double temperature, Double tds, Boolean bacterialContamination, String eColiStatus, String overallQuality, String riskLevel, String notes, String submittedByName, LocalDateTime createdAt) {
            this.id = id; this.sampleCode = sampleCode; this.stateName = stateName; this.districtName = districtName; this.mandalName = mandalName; this.villageName = villageName; this.waterSource = waterSource; this.collectionDate = collectionDate; this.ph = ph; this.turbidity = turbidity; this.temperature = temperature; this.tds = tds; this.bacterialContamination = bacterialContamination; this.eColiStatus = eColiStatus; this.overallQuality = overallQuality; this.riskLevel = riskLevel; this.notes = notes; this.submittedByName = submittedByName; this.createdAt = createdAt;
        }

        public static WaterQualityResponseBuilder builder() { return new WaterQualityResponseBuilder(); }

        public static class WaterQualityResponseBuilder {
            private Long id; private String sampleCode; private String stateName; private String districtName; private String mandalName; private String villageName; private String waterSource; private LocalDate collectionDate; private Double ph; private Double turbidity; private Double temperature; private Double tds; private Boolean bacterialContamination; private String eColiStatus; private String overallQuality; private String riskLevel; private String notes; private String submittedByName; private LocalDateTime createdAt;
            public WaterQualityResponseBuilder id(Long id) { this.id = id; return this; }
            public WaterQualityResponseBuilder sampleCode(String sampleCode) { this.sampleCode = sampleCode; return this; }
            public WaterQualityResponseBuilder stateName(String stateName) { this.stateName = stateName; return this; }
            public WaterQualityResponseBuilder districtName(String districtName) { this.districtName = districtName; return this; }
            public WaterQualityResponseBuilder mandalName(String mandalName) { this.mandalName = mandalName; return this; }
            public WaterQualityResponseBuilder villageName(String villageName) { this.villageName = villageName; return this; }
            public WaterQualityResponseBuilder waterSource(String waterSource) { this.waterSource = waterSource; return this; }
            public WaterQualityResponseBuilder collectionDate(LocalDate collectionDate) { this.collectionDate = collectionDate; return this; }
            public WaterQualityResponseBuilder ph(Double ph) { this.ph = ph; return this; }
            public WaterQualityResponseBuilder turbidity(Double turbidity) { this.turbidity = turbidity; return this; }
            public WaterQualityResponseBuilder temperature(Double temperature) { this.temperature = temperature; return this; }
            public WaterQualityResponseBuilder tds(Double tds) { this.tds = tds; return this; }
            public WaterQualityResponseBuilder bacterialContamination(Boolean bacterialContamination) { this.bacterialContamination = bacterialContamination; return this; }
            public WaterQualityResponseBuilder eColiStatus(String eColiStatus) { this.eColiStatus = eColiStatus; return this; }
            public WaterQualityResponseBuilder overallQuality(String overallQuality) { this.overallQuality = overallQuality; return this; }
            public WaterQualityResponseBuilder riskLevel(String riskLevel) { this.riskLevel = riskLevel; return this; }
            public WaterQualityResponseBuilder notes(String notes) { this.notes = notes; return this; }
            public WaterQualityResponseBuilder submittedByName(String submittedByName) { this.submittedByName = submittedByName; return this; }
            public WaterQualityResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
            public WaterQualityResponse build() { return new WaterQualityResponse(id, sampleCode, stateName, districtName, mandalName, villageName, waterSource, collectionDate, ph, turbidity, temperature, tds, bacterialContamination, eColiStatus, overallQuality, riskLevel, notes, submittedByName, createdAt); }
        }

        public Long getId() { return id; }
        public String getSampleCode() { return sampleCode; }
        public String getStateName() { return stateName; }
        public String getDistrictName() { return districtName; }
        public String getMandalName() { return mandalName; }
        public String getVillageName() { return villageName; }
        public String getWaterSource() { return waterSource; }
        public LocalDate getCollectionDate() { return collectionDate; }
        public Double getPh() { return ph; }
        public Double getTurbidity() { return turbidity; }
        public Double getTemperature() { return temperature; }
        public Double getTds() { return tds; }
        public Boolean getBacterialContamination() { return bacterialContamination; }
        public String getEColiStatus() { return eColiStatus; }
        public String getOverallQuality() { return overallQuality; }
        public String getRiskLevel() { return riskLevel; }
        public String getNotes() { return notes; }
        public String getSubmittedByName() { return submittedByName; }
        public LocalDateTime getCreatedAt() { return createdAt; }
    }
}
