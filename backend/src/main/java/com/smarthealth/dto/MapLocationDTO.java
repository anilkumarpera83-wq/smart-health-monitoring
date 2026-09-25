package com.smarthealth.dto;

public class MapLocationDTO {
    private Long id;
    private String name;
    private String type; // HEALTH_CENTER, WATER_TESTING, DISEASE_RISK, VILLAGE, MANDAL, DISTRICT
    private Long districtId;
    private String districtName;
    private String mandalName;
    private String villageName;
    private Double latitude;
    private Double longitude;
    private String status; // NORMAL, WARNING, HIGH_RISK
    private Integer riskScore;
    private Integer activeCases;
    private String waterQualityStatus;
    private String description;

    public MapLocationDTO() {}

    public MapLocationDTO(Long id, String name, String type, Long districtId, String districtName,
                          String mandalName, String villageName, Double latitude, Double longitude,
                          String status, Integer riskScore, Integer activeCases,
                          String waterQualityStatus, String description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.districtId = districtId;
        this.districtName = districtName;
        this.mandalName = mandalName;
        this.villageName = villageName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.riskScore = riskScore;
        this.activeCases = activeCases;
        this.waterQualityStatus = waterQualityStatus;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Long getDistrictId() { return districtId; }
    public void setDistrictId(Long districtId) { this.districtId = districtId; }

    public String getDistrictName() { return districtName; }
    public void setDistrictName(String districtName) { this.districtName = districtName; }

    public String getMandalName() { return mandalName; }
    public void setMandalName(String mandalName) { this.mandalName = mandalName; }

    public String getVillageName() { return villageName; }
    public void setVillageName(String villageName) { this.villageName = villageName; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getRiskScore() { return riskScore; }
    public void setRiskScore(Integer riskScore) { this.riskScore = riskScore; }

    public Integer getActiveCases() { return activeCases; }
    public void setActiveCases(Integer activeCases) { this.activeCases = activeCases; }

    public String getWaterQualityStatus() { return waterQualityStatus; }
    public void setWaterQualityStatus(String waterQualityStatus) { this.waterQualityStatus = waterQualityStatus; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
