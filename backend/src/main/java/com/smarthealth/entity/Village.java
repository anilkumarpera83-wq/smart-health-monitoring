package com.smarthealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "villages", uniqueConstraints = {@UniqueConstraint(columnNames = {"mandal_id", "name"})})
public class Village {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mandal_id", nullable = false)
    private Mandal mandal;

    @Column(nullable = false, length = 100)
    private String name;

    private Integer population = 1000;
    private Double latitude;
    private Double longitude;

    public Village() {}

    public Village(Long id, Mandal mandal, String name, Integer population, Double latitude, Double longitude) {
        this.id = id;
        this.mandal = mandal;
        this.name = name;
        this.population = population != null ? population : 1000;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public static VillageBuilder builder() { return new VillageBuilder(); }

    public static class VillageBuilder {
        private Long id;
        private Mandal mandal;
        private String name;
        private Integer population = 1000;
        private Double latitude;
        private Double longitude;

        public VillageBuilder id(Long id) { this.id = id; return this; }
        public VillageBuilder mandal(Mandal mandal) { this.mandal = mandal; return this; }
        public VillageBuilder name(String name) { this.name = name; return this; }
        public VillageBuilder population(Integer population) { this.population = population; return this; }
        public VillageBuilder latitude(Double latitude) { this.latitude = latitude; return this; }
        public VillageBuilder longitude(Double longitude) { this.longitude = longitude; return this; }
        public Village build() { return new Village(id, mandal, name, population, latitude, longitude); }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Mandal getMandal() { return mandal; }
    public void setMandal(Mandal mandal) { this.mandal = mandal; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getPopulation() { return population; }
    public void setPopulation(Integer population) { this.population = population; }
    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }
    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }
}
