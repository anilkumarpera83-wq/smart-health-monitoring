package com.smarthealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "districts", uniqueConstraints = {@UniqueConstraint(columnNames = {"state_id", "name"})})
public class District {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "state_id", nullable = false)
    private State state;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 20)
    private String code;

    public District() {}

    public District(Long id, State state, String name, String code) {
        this.id = id;
        this.state = state;
        this.name = name;
        this.code = code;
    }

    public static DistrictBuilder builder() { return new DistrictBuilder(); }

    public static class DistrictBuilder {
        private Long id;
        private State state;
        private String name;
        private String code;

        public DistrictBuilder id(Long id) { this.id = id; return this; }
        public DistrictBuilder state(State state) { this.state = state; return this; }
        public DistrictBuilder name(String name) { this.name = name; return this; }
        public DistrictBuilder code(String code) { this.code = code; return this; }
        public District build() { return new District(id, state, name, code); }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public State getState() { return state; }
    public void setState(State state) { this.state = state; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}
