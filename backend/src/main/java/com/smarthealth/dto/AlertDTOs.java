package com.smarthealth.dto;

import java.time.LocalDateTime;

public class AlertDTOs {

    public static class AlertResponse {
        private Long id;
        private String alertCode;
        private String alertType;
        private String districtName;
        private String mandalName;
        private String villageName;
        private String diseaseName;
        private String riskLevel;
        private Double riskScore;
        private String message;
        private String status;
        private String assignedOfficerName;
        private LocalDateTime createdAt;
        private LocalDateTime resolvedAt;

        public AlertResponse() {}
        public AlertResponse(Long id, String alertCode, String alertType, String districtName, String mandalName, String villageName, String diseaseName, String riskLevel, Double riskScore, String message, String status, String assignedOfficerName, LocalDateTime createdAt, LocalDateTime resolvedAt) {
            this.id = id; this.alertCode = alertCode; this.alertType = alertType; this.districtName = districtName; this.mandalName = mandalName; this.villageName = villageName; this.diseaseName = diseaseName; this.riskLevel = riskLevel; this.riskScore = riskScore; this.message = message; this.status = status; this.assignedOfficerName = assignedOfficerName; this.createdAt = createdAt; this.resolvedAt = resolvedAt;
        }

        public static AlertResponseBuilder builder() { return new AlertResponseBuilder(); }

        public static class AlertResponseBuilder {
            private Long id; private String alertCode; private String alertType; private String districtName; private String mandalName; private String villageName; private String diseaseName; private String riskLevel; private Double riskScore; private String message; private String status; private String assignedOfficerName; private LocalDateTime createdAt; private LocalDateTime resolvedAt;
            public AlertResponseBuilder id(Long id) { this.id = id; return this; }
            public AlertResponseBuilder alertCode(String alertCode) { this.alertCode = alertCode; return this; }
            public AlertResponseBuilder alertType(String alertType) { this.alertType = alertType; return this; }
            public AlertResponseBuilder districtName(String districtName) { this.districtName = districtName; return this; }
            public AlertResponseBuilder mandalName(String mandalName) { this.mandalName = mandalName; return this; }
            public AlertResponseBuilder villageName(String villageName) { this.villageName = villageName; return this; }
            public AlertResponseBuilder diseaseName(String diseaseName) { this.diseaseName = diseaseName; return this; }
            public AlertResponseBuilder riskLevel(String riskLevel) { this.riskLevel = riskLevel; return this; }
            public AlertResponseBuilder riskScore(Double riskScore) { this.riskScore = riskScore; return this; }
            public AlertResponseBuilder message(String message) { this.message = message; return this; }
            public AlertResponseBuilder status(String status) { this.status = status; return this; }
            public AlertResponseBuilder assignedOfficerName(String assignedOfficerName) { this.assignedOfficerName = assignedOfficerName; return this; }
            public AlertResponseBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
            public AlertResponseBuilder resolvedAt(LocalDateTime resolvedAt) { this.resolvedAt = resolvedAt; return this; }
            public AlertResponse build() { return new AlertResponse(id, alertCode, alertType, districtName, mandalName, villageName, diseaseName, riskLevel, riskScore, message, status, assignedOfficerName, createdAt, resolvedAt); }
        }

        public Long getId() { return id; }
        public String getAlertCode() { return alertCode; }
        public String getAlertType() { return alertType; }
        public String getDistrictName() { return districtName; }
        public String getMandalName() { return mandalName; }
        public String getVillageName() { return villageName; }
        public String getDiseaseName() { return diseaseName; }
        public String getRiskLevel() { return riskLevel; }
        public Double getRiskScore() { return riskScore; }
        public String getMessage() { return message; }
        public String getStatus() { return status; }
        public String getAssignedOfficerName() { return assignedOfficerName; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public LocalDateTime getResolvedAt() { return resolvedAt; }
    }

    public static class UpdateAlertStatusRequest {
        private String status;
        private Long assignedOfficerId;

        public UpdateAlertStatusRequest() {}
        public UpdateAlertStatusRequest(String status, Long assignedOfficerId) {
            this.status = status;
            this.assignedOfficerId = assignedOfficerId;
        }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public Long getAssignedOfficerId() { return assignedOfficerId; }
        public void setAssignedOfficerId(Long assignedOfficerId) { this.assignedOfficerId = assignedOfficerId; }
    }
}
