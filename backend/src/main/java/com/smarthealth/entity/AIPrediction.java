package com.smarthealth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ai_predictions")
public class AIPrediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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
    private String diseaseName;

    @Column(nullable = false)
    private Double riskScore;

    @Column(nullable = false, length = 50)
    private String riskLevel;

    @Column(nullable = false)
    private Double probability;

    @Column(columnDefinition = "TEXT")
    private String contributingFactors;

    private String modelVersion = "1.0.0-RandomForest";
    private LocalDateTime createdAt;

    public AIPrediction() {}

    public AIPrediction(Long id, State state, District district, Mandal mandal, Village village, String diseaseName, Double riskScore, String riskLevel, Double probability, String contributingFactors, String modelVersion) {
        this.id = id;
        this.state = state;
        this.district = district;
        this.mandal = mandal;
        this.village = village;
        this.diseaseName = diseaseName;
        this.riskScore = riskScore;
        this.riskLevel = riskLevel;
        this.probability = probability;
        this.contributingFactors = contributingFactors;
        this.modelVersion = modelVersion != null ? modelVersion : "1.0.0-RandomForest";
    }

    public static AIPredictionBuilder builder() { return new AIPredictionBuilder(); }

    public static class AIPredictionBuilder {
        private Long id;
        private State state;
        private District district;
        private Mandal mandal;
        private Village village;
        private String diseaseName;
        private Double riskScore;
        private String riskLevel;
        private Double probability;
        private String contributingFactors;
        private String modelVersion = "1.0.0-RandomForest";

        public AIPredictionBuilder id(Long id) { this.id = id; return this; }
        public AIPredictionBuilder state(State state) { this.state = state; return this; }
        public AIPredictionBuilder district(District district) { this.district = district; return this; }
        public AIPredictionBuilder mandal(Mandal mandal) { this.mandal = mandal; return this; }
        public AIPredictionBuilder village(Village village) { this.village = village; return this; }
        public AIPredictionBuilder diseaseName(String diseaseName) { this.diseaseName = diseaseName; return this; }
        public AIPredictionBuilder riskScore(Double riskScore) { this.riskScore = riskScore; return this; }
        public AIPredictionBuilder riskLevel(String riskLevel) { this.riskLevel = riskLevel; return this; }
        public AIPredictionBuilder probability(Double probability) { this.probability = probability; return this; }
        public AIPredictionBuilder contributingFactors(String contributingFactors) { this.contributingFactors = contributingFactors; return this; }
        public AIPredictionBuilder modelVersion(String modelVersion) { this.modelVersion = modelVersion; return this; }
        public AIPrediction build() { return new AIPrediction(id, state, district, mandal, village, diseaseName, riskScore, riskLevel, probability, contributingFactors, modelVersion); }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public State getState() { return state; }
    public void setState(State state) { this.state = state; }
    public District getDistrict() { return district; }
    public void setDistrict(District district) { this.district = district; }
    public Mandal getMandal() { return mandal; }
    public void setMandal(Mandal mandal) { this.mandal = mandal; }
    public Village getVillage() { return village; }
    public void setVillage(Village village) { this.village = village; }
    public String getDiseaseName() { return diseaseName; }
    public void setDiseaseName(String diseaseName) { this.diseaseName = diseaseName; }
    public Double getRiskScore() { return riskScore; }
    public void setRiskScore(Double riskScore) { this.riskScore = riskScore; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public Double getProbability() { return probability; }
    public void setProbability(Double probability) { this.probability = probability; }
    public String getContributingFactors() { return contributingFactors; }
    public void setContributingFactors(String contributingFactors) { this.contributingFactors = contributingFactors; }
    public String getModelVersion() { return modelVersion; }
    public void setModelVersion(String modelVersion) { this.modelVersion = modelVersion; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
