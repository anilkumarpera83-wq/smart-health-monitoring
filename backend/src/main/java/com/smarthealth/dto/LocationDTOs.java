package com.smarthealth.dto;

public class LocationDTOs {

    public static class StateDTO {
        private Long id;
        private String name;
        private String code;

        public StateDTO() {}
        public StateDTO(Long id, String name, String code) { this.id = id; this.name = name; this.code = code; }

        public static StateDTOBuilder builder() { return new StateDTOBuilder(); }

        public static class StateDTOBuilder {
            private Long id; private String name; private String code;
            public StateDTOBuilder id(Long id) { this.id = id; return this; }
            public StateDTOBuilder name(String name) { this.name = name; return this; }
            public StateDTOBuilder code(String code) { this.code = code; return this; }
            public StateDTO build() { return new StateDTO(id, name, code); }
        }

        public Long getId() { return id; }
        public String getName() { return name; }
        public String getCode() { return code; }
    }

    public static class DistrictDTO {
        private Long id;
        private Long stateId;
        private String name;
        private String code;

        public DistrictDTO() {}
        public DistrictDTO(Long id, Long stateId, String name, String code) { this.id = id; this.stateId = stateId; this.name = name; this.code = code; }

        public static DistrictDTOBuilder builder() { return new DistrictDTOBuilder(); }

        public static class DistrictDTOBuilder {
            private Long id; private Long stateId; private String name; private String code;
            public DistrictDTOBuilder id(Long id) { this.id = id; return this; }
            public DistrictDTOBuilder stateId(Long stateId) { this.stateId = stateId; return this; }
            public DistrictDTOBuilder name(String name) { this.name = name; return this; }
            public DistrictDTOBuilder code(String code) { this.code = code; return this; }
            public DistrictDTO build() { return new DistrictDTO(id, stateId, name, code); }
        }

        public Long getId() { return id; }
        public Long getStateId() { return stateId; }
        public String getName() { return name; }
        public String getCode() { return code; }
    }

    public static class MandalDTO {
        private Long id;
        private Long districtId;
        private String name;

        public MandalDTO() {}
        public MandalDTO(Long id, Long districtId, String name) { this.id = id; this.districtId = districtId; this.name = name; }

        public static MandalDTOBuilder builder() { return new MandalDTOBuilder(); }

        public static class MandalDTOBuilder {
            private Long id; private Long districtId; private String name;
            public MandalDTOBuilder id(Long id) { this.id = id; return this; }
            public MandalDTOBuilder districtId(Long districtId) { this.districtId = districtId; return this; }
            public MandalDTOBuilder name(String name) { this.name = name; return this; }
            public MandalDTO build() { return new MandalDTO(id, districtId, name); }
        }

        public Long getId() { return id; }
        public Long getDistrictId() { return districtId; }
        public String getName() { return name; }
    }

    public static class VillageDTO {
        private Long id;
        private Long mandalId;
        private String name;
        private Integer population;
        private Double latitude;
        private Double longitude;

        public VillageDTO() {}
        public VillageDTO(Long id, Long mandalId, String name, Integer population, Double latitude, Double longitude) {
            this.id = id; this.mandalId = mandalId; this.name = name; this.population = population; this.latitude = latitude; this.longitude = longitude;
        }

        public static VillageDTOBuilder builder() { return new VillageDTOBuilder(); }

        public static class VillageDTOBuilder {
            private Long id; private Long mandalId; private String name; private Integer population; private Double latitude; private Double longitude;
            public VillageDTOBuilder id(Long id) { this.id = id; return this; }
            public VillageDTOBuilder mandalId(Long mandalId) { this.mandalId = mandalId; return this; }
            public VillageDTOBuilder name(String name) { this.name = name; return this; }
            public VillageDTOBuilder population(Integer population) { this.population = population; return this; }
            public VillageDTOBuilder latitude(Double latitude) { this.latitude = latitude; return this; }
            public VillageDTOBuilder longitude(Double longitude) { this.longitude = longitude; return this; }
            public VillageDTO build() { return new VillageDTO(id, mandalId, name, population, latitude, longitude); }
        }

        public Long getId() { return id; }
        public Long getMandalId() { return mandalId; }
        public String getName() { return name; }
        public Integer getPopulation() { return population; }
        public Double getLatitude() { return latitude; }
        public Double getLongitude() { return longitude; }
    }
}
