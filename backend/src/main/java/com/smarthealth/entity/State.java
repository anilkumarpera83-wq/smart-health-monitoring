package com.smarthealth.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "states")
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(nullable = false, unique = true, length = 10)
    private String code;

    public State() {}

    public State(Long id, String name, String code) {
        this.id = id;
        this.name = name;
        this.code = code;
    }

    public static StateBuilder builder() { return new StateBuilder(); }

    public static class StateBuilder {
        private Long id;
        private String name;
        private String code;

        public StateBuilder id(Long id) { this.id = id; return this; }
        public StateBuilder name(String name) { this.name = name; return this; }
        public StateBuilder code(String code) { this.code = code; return this; }
        public State build() { return new State(id, name, code); }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}
