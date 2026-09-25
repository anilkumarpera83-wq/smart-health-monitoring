package com.smarthealth.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "health_cases")
public class HealthCase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String caseNumber;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false, length = 20)
    private String gender;

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

    @Column(nullable = false)
    private LocalDate reportingDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "suspected_disease_id")
    private Disease suspectedDisease;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "confirmed_disease_id")
    private Disease confirmedDisease;

    @Column(nullable = false, length = 50)
    private String severity;

    private Double bodyTemperature;
    private Integer durationDays;
    private String waterSource;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reported_by_user_id", nullable = false)
    private User reportedBy;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "case_symptoms",
        joinColumns = @JoinColumn(name = "health_case_id"),
        inverseJoinColumns = @JoinColumn(name = "symptom_id")
    )
    private Set<Symptom> symptoms = new HashSet<>();

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public HealthCase() {}

    public HealthCase(Long id, String caseNumber, Integer age, String gender, State state, District district, Mandal mandal, Village village, LocalDate reportingDate, Disease suspectedDisease, Disease confirmedDisease, String severity, Double bodyTemperature, Integer durationDays, String waterSource, String notes, User reportedBy, Set<Symptom> symptoms) {
        this.id = id;
        this.caseNumber = caseNumber;
        this.age = age;
        this.gender = gender;
        this.state = state;
        this.district = district;
        this.mandal = mandal;
        this.village = village;
        this.reportingDate = reportingDate;
        this.suspectedDisease = suspectedDisease;
        this.confirmedDisease = confirmedDisease;
        this.severity = severity;
        this.bodyTemperature = bodyTemperature;
        this.durationDays = durationDays;
        this.waterSource = waterSource;
        this.notes = notes;
        this.reportedBy = reportedBy;
        this.symptoms = symptoms != null ? symptoms : new HashSet<>();
    }

    public static HealthCaseBuilder builder() { return new HealthCaseBuilder(); }

    public static class HealthCaseBuilder {
        private Long id;
        private String caseNumber;
        private Integer age;
        private String gender;
        private State state;
        private District district;
        private Mandal mandal;
        private Village village;
        private LocalDate reportingDate;
        private Disease suspectedDisease;
        private Disease confirmedDisease;
        private String severity;
        private Double bodyTemperature;
        private Integer durationDays;
        private String waterSource;
        private String notes;
        private User reportedBy;
        private Set<Symptom> symptoms = new HashSet<>();

        public HealthCaseBuilder id(Long id) { this.id = id; return this; }
        public HealthCaseBuilder caseNumber(String caseNumber) { this.caseNumber = caseNumber; return this; }
        public HealthCaseBuilder age(Integer age) { this.age = age; return this; }
        public HealthCaseBuilder gender(String gender) { this.gender = gender; return this; }
        public HealthCaseBuilder state(State state) { this.state = state; return this; }
        public HealthCaseBuilder district(District district) { this.district = district; return this; }
        public HealthCaseBuilder mandal(Mandal mandal) { this.mandal = mandal; return this; }
        public HealthCaseBuilder village(Village village) { this.village = village; return this; }
        public HealthCaseBuilder reportingDate(LocalDate reportingDate) { this.reportingDate = reportingDate; return this; }
        public HealthCaseBuilder suspectedDisease(Disease suspectedDisease) { this.suspectedDisease = suspectedDisease; return this; }
        public HealthCaseBuilder confirmedDisease(Disease confirmedDisease) { this.confirmedDisease = confirmedDisease; return this; }
        public HealthCaseBuilder severity(String severity) { this.severity = severity; return this; }
        public HealthCaseBuilder bodyTemperature(Double bodyTemperature) { this.bodyTemperature = bodyTemperature; return this; }
        public HealthCaseBuilder durationDays(Integer durationDays) { this.durationDays = durationDays; return this; }
        public HealthCaseBuilder waterSource(String waterSource) { this.waterSource = waterSource; return this; }
        public HealthCaseBuilder notes(String notes) { this.notes = notes; return this; }
        public HealthCaseBuilder reportedBy(User reportedBy) { this.reportedBy = reportedBy; return this; }
        public HealthCaseBuilder symptoms(Set<Symptom> symptoms) { this.symptoms = symptoms; return this; }
        public HealthCase build() { return new HealthCase(id, caseNumber, age, gender, state, district, mandal, village, reportingDate, suspectedDisease, confirmedDisease, severity, bodyTemperature, durationDays, waterSource, notes, reportedBy, symptoms); }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCaseNumber() { return caseNumber; }
    public void setCaseNumber(String caseNumber) { this.caseNumber = caseNumber; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public State getState() { return state; }
    public void setState(State state) { this.state = state; }
    public District getDistrict() { return district; }
    public void setDistrict(District district) { this.district = district; }
    public Mandal getMandal() { return mandal; }
    public void setMandal(Mandal mandal) { this.mandal = mandal; }
    public Village getVillage() { return village; }
    public void setVillage(Village village) { this.village = village; }
    public LocalDate getReportingDate() { return reportingDate; }
    public void setReportingDate(LocalDate reportingDate) { this.reportingDate = reportingDate; }
    public Disease getSuspectedDisease() { return suspectedDisease; }
    public void setSuspectedDisease(Disease suspectedDisease) { this.suspectedDisease = suspectedDisease; }
    public Disease getConfirmedDisease() { return confirmedDisease; }
    public void setConfirmedDisease(Disease confirmedDisease) { this.confirmedDisease = confirmedDisease; }
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
    public User getReportedBy() { return reportedBy; }
    public void setReportedBy(User reportedBy) { this.reportedBy = reportedBy; }
    public Set<Symptom> getSymptoms() { return symptoms; }
    public void setSymptoms(Set<Symptom> symptoms) { this.symptoms = symptoms; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
