package com.smarthealth.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "diseases")
public class Disease {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    private String category = "Water-Borne";

    @Column(columnDefinition = "TEXT")
    private String description;

    private String severity = "MEDIUM";

    private LocalDateTime createdAt;

    public Disease() {}

    public Disease(Long id, String name, String category, String description, String severity) {
        this.id = id;
        this.name = name;
        this.category = category != null ? category : "Water-Borne";
        this.description = description;
        this.severity = severity != null ? severity : "MEDIUM";
    }

    public static DiseaseBuilder builder() { return new DiseaseBuilder(); }

    public static class DiseaseBuilder {
        private Long id;
        private String name;
        private String category = "Water-Borne";
        private String description;
        private String severity = "MEDIUM";

        public DiseaseBuilder id(Long id) { this.id = id; return this; }
        public DiseaseBuilder name(String name) { this.name = name; return this; }
        public DiseaseBuilder category(String category) { this.category = category; return this; }
        public DiseaseBuilder description(String description) { this.description = description; return this; }
        public DiseaseBuilder severity(String severity) { this.severity = severity; return this; }
        public Disease build() { return new Disease(id, name, category, description, severity); }
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
