package com.smarthealth.dto;

import java.time.LocalDateTime;
import java.util.List;

public class AIPredictionDTOs {

    public static class AIPredictionRequest {
        private String state = "Telangana";
        private String district;
        private String mandal;
        private String village;
        private String disease;
        private Integer recentCases;
        private Integer historicalCases;
        private Double waterQualityScore;
        private Double turbidity;
        private Double ph;
        private Double temperature;
        private Integer month;
        private Double rainfall;
        private Double populationDensity;

        public AIPredictionRequest() {}

        public String getState() { return state; }
        public void setState(String state) { this.state = state; }
        public String getDistrict() { return district; }
        public void setDistrict(String district) { this.district = district; }
        public String getMandal() { return mandal; }
        public void setMandal(String mandal) { this.mandal = mandal; }
        public String getVillage() { return village; }
        public void setVillage(String village) { this.village = village; }
        public String getDisease() { return disease; }
        public void setDisease(String disease) { this.disease = disease; }
        public Integer getRecentCases() { return recentCases; }
        public void setRecentCases(Integer recentCases) { this.recentCases = recentCases; }
        public Integer getHistoricalCases() { return historicalCases; }
        public void setHistoricalCases(Integer historicalCases) { this.historicalCases = historicalCases; }
        public Double getWaterQualityScore() { return waterQualityScore; }
        public void setWaterQualityScore(Double waterQualityScore) { this.waterQualityScore = waterQualityScore; }
        public Double getTurbidity() { return turbidity; }
        public void setTurbidity(Double turbidity) { this.turbidity = turbidity; }
        public Double getPh() { return ph; }
        public void setPh(Double ph) { this.ph = ph; }
        public Double getTemperature() { return temperature; }
        public void setTemperature(Double temperature) { this.temperature = temperature; }
        public Integer getMonth() { return month; }
        public void setMonth(Integer month) { this.month = month; }
        public Double getRainfall() { return rainfall; }
        public void setRainfall(Double rainfall) { this.rainfall = rainfall; }
        public Double getPopulationDensity() { return populationDensity; }
        public void setPopulationDensity(Double populationDensity) { this.populationDensity = populationDensity; }
    }

    public static class AIPredictionResponse {
        private Long id;
        private String districtName;
        private String mandalName;
        private String villageName;
        private String predictedDisease;
        private Double riskScore;
        private String riskLevel;
        private Double probability;
        private List<String> factors;
        private String modelVersion;
        private String disclaimer;
        private LocalDateTime createdAt;

        public AIPredictionResponse() {}
        public AIPredictionResponse(Long id, String districtName, String mandalName, String villageName, String predictedDisease, Double riskScore, String riskLevel, Double probability, List<String> factors, String modelVersion, String disclaimer, LocalDateTime createdAt) {
            this.id = id; this.districtName = districtName; this.mandalName = mandalName; this.villageName = villageName; this.predictedDisease = predictedDisease; this.riskScore = riskScore; this.riskLevel = riskLevel; this.probability = probability; this.factors = factors; this.modelVersion = modelVersion; this.disclaimer = disclaimer; this.createdAt = createdAt;
        }

        public static AIPredictionResponseBuilder builder() { return new AIPredictionResponseBuilder(); }

        public static class AIPredictionResponseBuilder {
            private Long id; private String districtName; private String mandalName; private String villageName; private String predictedDisease; private Double riskScore; private String riskLevel; private Double probability; private List<String> factors; private String modelVersion; private String disclaimer; private LocalDateTime createdAt;
            public AIPredictionResponseBuilder id(Long id) { this.id = id; return this; }
            public AIPredictionResponseBuilder districtName(String districtName) { this.districtName = districtName; return this; }
            public AIPredictionResponseBuilder mandalName(String mandalName) { this.mandalName = mandalName; return this; }
            public AIPredictionResponseBuilder villageName(String villageName) { this.villageName = villageName; return this; }
            public AIPredictionResponseBuilder predictedDisease(String predictedDisease) { this.predictedDisease = predictedDisease; return this; }
            public AIPredictionResponseBuilder riskScore(Double riskScore) { this.riskScore = riskScore; return this; }
            public AIPredictionResponseBuilder riskLevel(String riskLevel) { this.riskLevel = riskLevel; return this; }
            public AIPredictionResponseBuilder probability(Double probability) { this.probability = probability; return this; }
            public AIPredictionResponseBuilder factors(List<String> factors) { this.factors = factors; return this; }
            public AIPredictionResponseBuilder modelVersion(String modelVersion) { this.modelVersion = modelVersion; return this; }
            public AIPredictionResponseBuilder disclaimer(String disclaimer) { this.disclaimer = disclaimer; return this; }
            public AIPredictionResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
            public AIPredictionResponse build() { return new AIPredictionResponse(id, districtName, mandalName, villageName, predictedDisease, riskScore, riskLevel, probability, factors, modelVersion, disclaimer, createdAt); }
        }

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getDistrictName() { return districtName; }
        public void setDistrictName(String districtName) { this.districtName = districtName; }
        public String getMandalName() { return mandalName; }
        public void setMandalName(String mandalName) { this.mandalName = mandalName; }
        public String getVillageName() { return villageName; }
        public void setVillageName(String villageName) { this.villageName = villageName; }
        public String getPredictedDisease() { return predictedDisease; }
        public Double getRiskScore() { return riskScore; }
        public String getRiskLevel() { return riskLevel; }
        public Double getProbability() { return probability; }
        public List<String> getFactors() { return factors; }
        public String getModelVersion() { return modelVersion; }
        public String getDisclaimer() { return disclaimer; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }
}
