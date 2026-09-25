package com.smarthealth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class AuthDTOs {

    public static class LoginRequest {
        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        @NotBlank(message = "Password is required")
        private String password;

        public LoginRequest() {}
        public LoginRequest(String email, String password) {
            this.email = email;
            this.password = password;
        }

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        @NotBlank(message = "Full name is required")
        private String fullName;

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        private String email;

        private String phone;

        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must be at least 6 characters")
        private String password;

        @NotBlank(message = "Role is required")
        private String role;

        private Long stateId;
        private Long districtId;
        private Long mandalId;
        private Long villageId;

        public RegisterRequest() {}

        public String getFullName() { return fullName; }
        public void setFullName(String fullName) { this.fullName = fullName; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRole() { return role; }
        public void setRole(String role) { this.role = role; }
        public Long getStateId() { return stateId; }
        public void setStateId(Long stateId) { this.stateId = stateId; }
        public Long getDistrictId() { return districtId; }
        public void setDistrictId(Long districtId) { this.districtId = districtId; }
        public Long getMandalId() { return mandalId; }
        public void setMandalId(Long mandalId) { this.mandalId = mandalId; }
        public Long getVillageId() { return villageId; }
        public void setVillageId(Long villageId) { this.villageId = villageId; }
    }

    public static class JwtResponse {
        private String token;
        private String type = "Bearer";
        private Long id;
        private String fullName;
        private String email;
        private String role;
        private String districtName;
        private String mandalName;
        private String villageName;

        public JwtResponse() {}
        public JwtResponse(String token, String type, Long id, String fullName, String email, String role, String districtName, String mandalName, String villageName) {
            this.token = token;
            this.type = type != null ? type : "Bearer";
            this.id = id;
            this.fullName = fullName;
            this.email = email;
            this.role = role;
            this.districtName = districtName;
            this.mandalName = mandalName;
            this.villageName = villageName;
        }

        public static JwtResponseBuilder builder() { return new JwtResponseBuilder(); }

        public static class JwtResponseBuilder {
            private String token;
            private String type = "Bearer";
            private Long id;
            private String fullName;
            private String email;
            private String role;
            private String districtName;
            private String mandalName;
            private String villageName;

            public JwtResponseBuilder token(String token) { this.token = token; return this; }
            public JwtResponseBuilder type(String type) { this.type = type; return this; }
            public JwtResponseBuilder id(Long id) { this.id = id; return this; }
            public JwtResponseBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public JwtResponseBuilder email(String email) { this.email = email; return this; }
            public JwtResponseBuilder role(String role) { this.role = role; return this; }
            public JwtResponseBuilder districtName(String districtName) { this.districtName = districtName; return this; }
            public JwtResponseBuilder mandalName(String mandalName) { this.mandalName = mandalName; return this; }
            public JwtResponseBuilder villageName(String villageName) { this.villageName = villageName; return this; }
            public JwtResponse build() { return new JwtResponse(token, type, id, fullName, email, role, districtName, mandalName, villageName); }
        }

        public String getToken() { return token; }
        public String getType() { return type; }
        public Long getId() { return id; }
        public String getFullName() { return fullName; }
        public String getEmail() { return email; }
        public String getRole() { return role; }
        public String getDistrictName() { return districtName; }
        public String getMandalName() { return mandalName; }
        public String getVillageName() { return villageName; }
    }

    public static class UserDTO {
        private Long id;
        private String fullName;
        private String email;
        private String phone;
        private String role;
        private String stateName;
        private String districtName;
        private String mandalName;
        private String villageName;
        private Boolean active;

        public UserDTO() {}
        public UserDTO(Long id, String fullName, String email, String phone, String role, String stateName, String districtName, String mandalName, String villageName, Boolean active) {
            this.id = id;
            this.fullName = fullName;
            this.email = email;
            this.phone = phone;
            this.role = role;
            this.stateName = stateName;
            this.districtName = districtName;
            this.mandalName = mandalName;
            this.villageName = villageName;
            this.active = active;
        }

        public static UserDTOBuilder builder() { return new UserDTOBuilder(); }

        public static class UserDTOBuilder {
            private Long id;
            private String fullName;
            private String email;
            private String phone;
            private String role;
            private String stateName;
            private String districtName;
            private String mandalName;
            private String villageName;
            private Boolean active;

            public UserDTOBuilder id(Long id) { this.id = id; return this; }
            public UserDTOBuilder fullName(String fullName) { this.fullName = fullName; return this; }
            public UserDTOBuilder email(String email) { this.email = email; return this; }
            public UserDTOBuilder phone(String phone) { this.phone = phone; return this; }
            public UserDTOBuilder role(String role) { this.role = role; return this; }
            public UserDTOBuilder stateName(String stateName) { this.stateName = stateName; return this; }
            public UserDTOBuilder districtName(String districtName) { this.districtName = districtName; return this; }
            public UserDTOBuilder mandalName(String mandalName) { this.mandalName = mandalName; return this; }
            public UserDTOBuilder villageName(String villageName) { this.villageName = villageName; return this; }
            public UserDTOBuilder active(Boolean active) { this.active = active; return this; }
            public UserDTO build() { return new UserDTO(id, fullName, email, phone, role, stateName, districtName, mandalName, villageName, active); }
        }

        public Long getId() { return id; }
        public String getFullName() { return fullName; }
        public String getEmail() { return email; }
        public String getPhone() { return phone; }
        public String getRole() { return role; }
        public String getStateName() { return stateName; }
        public String getDistrictName() { return districtName; }
        public String getMandalName() { return mandalName; }
        public String getVillageName() { return villageName; }
        public Boolean getActive() { return active; }
    }
}
