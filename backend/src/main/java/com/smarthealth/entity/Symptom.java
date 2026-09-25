package com.smarthealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "symptoms")
public class Symptom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    public Symptom() {}

    public Symptom(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public static SymptomBuilder builder() { return new SymptomBuilder(); }

    public static class SymptomBuilder {
        private Long id;
        private String name;
        private String description;

        public SymptomBuilder id(Long id) { this.id = id; return this; }
        public SymptomBuilder name(String name) { this.name = name; return this; }
        public SymptomBuilder description(String description) { this.description = description; return this; }
        public Symptom build() { return new Symptom(id, name, description); }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
