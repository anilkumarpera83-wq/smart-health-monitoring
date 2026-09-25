package com.smarthealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "mandals", uniqueConstraints = {@UniqueConstraint(columnNames = {"district_id", "name"})})
public class Mandal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "district_id", nullable = false)
    private District district;

    @Column(nullable = false, length = 100)
    private String name;

    public Mandal() {}

    public Mandal(Long id, District district, String name) {
        this.id = id;
        this.district = district;
        this.name = name;
    }

    public static MandalBuilder builder() { return new MandalBuilder(); }

    public static class MandalBuilder {
        private Long id;
        private District district;
        private String name;

        public MandalBuilder id(Long id) { this.id = id; return this; }
        public MandalBuilder district(District district) { this.district = district; return this; }
        public MandalBuilder name(String name) { this.name = name; return this; }
        public Mandal build() { return new Mandal(id, district, name); }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public District getDistrict() { return district; }
    public void setDistrict(District district) { this.district = district; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
