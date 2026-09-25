package com.smarthealth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String alertCode;

    @Column(nullable = false, length = 50)
    private String alertType;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "disease_id")
    private Disease disease;

    @Column(nullable = false, length = 50)
    private String riskLevel;

    private Double riskScore;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column(nullable = false, length = 50)
    private String status = "NEW";

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_officer_id")
    private User assignedOfficer;

    private LocalDateTime createdAt;
    private LocalDateTime resolvedAt;

    public Alert() {}

    public Alert(Long id, String alertCode, String alertType, State state, District district, Mandal mandal, Village village, Disease disease, String riskLevel, Double riskScore, String message, String status, User assignedOfficer) {
        this.id = id;
        this.alertCode = alertCode;
        this.alertType = alertType;
        this.state = state;
        this.district = district;
        this.mandal = mandal;
        this.village = village;
        this.disease = disease;
        this.riskLevel = riskLevel;
        this.riskScore = riskScore;
        this.message = message;
        this.status = status != null ? status : "NEW";
        this.assignedOfficer = assignedOfficer;
    }

    public static AlertBuilder builder() { return new AlertBuilder(); }

    public static class AlertBuilder {
        private Long id;
        private String alertCode;
        private String alertType;
        private State state;
        private District district;
        private Mandal mandal;
        private Village village;
        private Disease disease;
        private String riskLevel;
        private Double riskScore;
        private String message;
        private String status = "NEW";
        private User assignedOfficer;

        public AlertBuilder id(Long id) { this.id = id; return this; }
        public AlertBuilder alertCode(String alertCode) { this.alertCode = alertCode; return this; }
        public AlertBuilder alertType(String alertType) { this.alertType = alertType; return this; }
        public AlertBuilder state(State state) { this.state = state; return this; }
        public AlertBuilder district(District district) { this.district = district; return this; }
        public AlertBuilder mandal(Mandal mandal) { this.mandal = mandal; return this; }
        public AlertBuilder village(Village village) { this.village = village; return this; }
        public AlertBuilder disease(Disease disease) { this.disease = disease; return this; }
        public AlertBuilder riskLevel(String riskLevel) { this.riskLevel = riskLevel; return this; }
        public AlertBuilder riskScore(Double riskScore) { this.riskScore = riskScore; return this; }
        public AlertBuilder message(String message) { this.message = message; return this; }
        public AlertBuilder status(String status) { this.status = status; return this; }
        public AlertBuilder assignedOfficer(User assignedOfficer) { this.assignedOfficer = assignedOfficer; return this; }
        public Alert build() { return new Alert(id, alertCode, alertType, state, district, mandal, village, disease, riskLevel, riskScore, message, status, assignedOfficer); }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (status == null) status = "NEW";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAlertCode() { return alertCode; }
    public void setAlertCode(String alertCode) { this.alertCode = alertCode; }
    public String getAlertType() { return alertType; }
    public void setAlertType(String alertType) { this.alertType = alertType; }
    public State getState() { return state; }
    public void setState(State state) { this.state = state; }
    public District getDistrict() { return district; }
    public void setDistrict(District district) { this.district = district; }
    public Mandal getMandal() { return mandal; }
    public void setMandal(Mandal mandal) { this.mandal = mandal; }
    public Village getVillage() { return village; }
    public void setVillage(Village village) { this.village = village; }
    public Disease getDisease() { return disease; }
    public void setDisease(Disease disease) { this.disease = disease; }
    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }
    public Double getRiskScore() { return riskScore; }
    public void setRiskScore(Double riskScore) { this.riskScore = riskScore; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public User getAssignedOfficer() { return assignedOfficer; }
    public void setAssignedOfficer(User assignedOfficer) { this.assignedOfficer = assignedOfficer; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getResolvedAt() { return resolvedAt; }
    public void setResolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; }
}
