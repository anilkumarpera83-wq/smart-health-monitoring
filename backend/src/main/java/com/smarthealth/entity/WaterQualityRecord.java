package com.smarthealth.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "water_quality_records")
public class WaterQualityRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String sampleCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id", nullable = false)
    private State state;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id", nullable = false)
    private District district;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mandal_id", nullable = false)
    private Mandal mandal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "village_id", nullable = false)
    private Village village;

    @Column(nullable = false, length = 100)
    private String waterSource;

    @Column(nullable = false)
    private LocalDate collectionDate;

    @Column(nullable = false)
    private Double ph;

    @Column(nullable = false)
    private Double turbidity;

    private Double temperature;
    private Double tds;
    private Boolean bacterialContamination = false;
    private String eColiStatus = "ABSENT";

    @Column(nullable = false, length = 50)
    private String overallQuality;

    @Column(nullable = false, length = 50)
    private String riskLevel;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "submitted_by_user_id", nullable = false)
    private User submittedBy;

    private LocalDateTime createdAt;

    public WaterQualityRecord() {}

    public WaterQualityRecord(Long id, String sampleCode, State state, District district, Mandal mandal, Village village, String waterSource, LocalDate collectionDate, Double ph, Double turbidity, Double temperature, Double tds, Boolean bacterialContamination, String eColiStatus, String overallQuality, String riskLevel, String notes, User submittedBy) {
        this.id = id;
        this.sampleCode = sampleCode;
        this.state = state;
        this.district = district;
        this.mandal = mandal;
        this.village = village;
        this.waterSource = waterSource;
        this.collectionDate = collectionDate;
        this.ph = ph;
        this.turbidity = turbidity;
        this.temperature = temperature;
        this.tds = tds;
        this.bacterialContamination = bacterialContamination != null ? bacterialContamination : false;
        this.eColiStatus = eColiStatus != null ? eColiStatus : "ABSENT";
        this.overallQuality = overallQuality;
        this.riskLevel = riskLevel;
        this.notes = notes;
        this.submittedBy = submittedBy;
    }

    public static WaterQualityRecordBuilder builder() { return new WaterQualityRecordBuilder(); }

    public static class WaterQualityRecordBuilder {
        private Long id;
        private String sampleCode;
        private State state;
        private District district;
        private Mandal mandal;
        private Village village;
        private String waterSource;
        private LocalDate collectionDate;
        private Double ph;
        private Double turbidity;
        private Double temperature;
        private Double tds;
        private Boolean bacterialContamination = false;
        private String eColiStatus = "ABSENT";
        private String overallQuality;
        private String riskLevel;
        private String notes;
        private User submittedBy;

        public WaterQualityRecordBuilder id(Long id) { this.id = id; return this; }
        public WaterQualityRecordBuilder sampleCode(String sampleCode) { this.sampleCode = sampleCode; return this; }
        public WaterQualityRecordBuilder state(State state) { this.state = state; return this; }
        public WaterQualityRecordBuilder district(District district) { this.district = district; return this; }
        public WaterQualityRecordBuilder mandal(Mandal mandal) { this.mandal = mandal; return this; }
        public WaterQualityRecordBuilder village(Village village) { this.village = village; return this; }
        public WaterQualityRecordBuilder waterSource(String waterSource) { this.waterSource = waterSource; return this; }
        public WaterQualityRecordBuilder collectionDate(LocalDate collectionDate) { this.collectionDate = collectionDate; return this; }
        public WaterQualityRecordBuilder ph(Double ph) { this.ph = ph; return this; }
        public WaterQualityRecordBuilder turbidity(Double turbidity) { this.turbidity = turbidity; return this; }
        public WaterQualityRecordBuilder temperature(Double temperature) { this.temperature = temperature; return this; }
        public WaterQualityRecordBuilder tds(Double tds) { this.tds = tds; return this; }
        public WaterQualityRecordBuilder bacterialContamination(Boolean bacterialContamination) { this.bacterialContamination = bacterialContamination; return this; }
        public WaterQualityRecordBuilder eColiStatus(String eColiStatus) { this.eColiStatus = eColiStatus; return this; }
        public WaterQualityRecordBuilder overallQuality(String overallQuality) { this.overallQuality = overallQuality; return this; }
        public WaterQualityRecordBuilder riskLevel(String riskLevel) { this.riskLevel = riskLevel; return this; }
        public WaterQualityRecordBuilder notes(String notes) { this.notes = notes; return this; }
        public WaterQualityRecordBuilder submittedBy(User submittedBy) { this.submittedBy = submittedBy; return this; }
        public WaterQualityRecord build() { return new WaterQualityRecord(id, sampleCode, state, district, mandal, village, waterSource, collectionDate, ph, turbidity, temperature, tds, bacterialContamination, eColiStatus, overallQuality, riskLevel, notes, submittedBy); }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSampleCode() { return sampleCode; }
    public void setSampleCode(String sampleCode) { this.sampleCode = sampleCode; }
    public State getState() { return state; }
    public void setState(State state) { this.state = state; }
    public District getDistrict() { return district; }
    public void setDistrict(District district) { this.district = district; }
    public Mandal getMandal() { return mandal; }
    public void setMandal(Mandal mandal) { this.mandal = mandal; }
    public Village getVillage() { return village; }
    public void setVillage(Village village) { this.village = village; }
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
    public String getOverallQuality() { return overallQuality; }
    public void setOverallQuality(String overallQuality) { this.overallQuality = overallQuality; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public User getSubmittedBy() { return submittedBy; }
    public void setSubmittedBy(User submittedBy) { this.submittedBy = submittedBy; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
