package com.smarthealth.service;

import com.smarthealth.dto.AlertDTOs.*;
import com.smarthealth.entity.Alert;
import com.smarthealth.entity.User;
import com.smarthealth.exception.ResourceNotFoundException;
import com.smarthealth.repository.AlertRepository;
import com.smarthealth.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class AlertService {

    private final AlertRepository alertRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;

    public AlertService(AlertRepository alertRepository, UserRepository userRepository, AuditLogService auditLogService) {
        this.alertRepository = alertRepository;
        this.userRepository = userRepository;
        this.auditLogService = auditLogService;
    }

    public Page<AlertResponse> getAllAlerts(Pageable pageable) {
        return alertRepository.findAll(pageable).map(this::mapToResponse);
    }

    public AlertResponse getAlertById(Long id) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert not found with id " + id));
        return mapToResponse(alert);
    }

    @Transactional
    public AlertResponse updateAlertStatus(Long id, UpdateAlertStatusRequest request) {
        Alert alert = alertRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alert not found with id " + id));

        if (request.getStatus() != null) {
            alert.setStatus(request.getStatus().toUpperCase());
            if ("RESOLVED".equalsIgnoreCase(request.getStatus())) {
                alert.setResolvedAt(LocalDateTime.now());
            }
        }

        if (request.getAssignedOfficerId() != null) {
            User officer = userRepository.findById(request.getAssignedOfficerId()).orElse(null);
            alert.setAssignedOfficer(officer);
        }

        Alert updated = alertRepository.save(alert);

        auditLogService.logAction(null, null, "UPDATE_ALERT_STATUS", "Alert", updated.getId(), "Alert status updated to " + updated.getStatus(), null);

        return mapToResponse(updated);
    }

    public AlertResponse mapToResponse(Alert alert) {
        return AlertResponse.builder()
                .id(alert.getId())
                .alertCode(alert.getAlertCode())
                .alertType(alert.getAlertType())
                .districtName(alert.getDistrict() != null ? alert.getDistrict().getName() : null)
                .mandalName(alert.getMandal() != null ? alert.getMandal().getName() : null)
                .villageName(alert.getVillage() != null ? alert.getVillage().getName() : null)
                .diseaseName(alert.getDisease() != null ? alert.getDisease().getName() : "General Water-Borne")
                .riskLevel(alert.getRiskLevel())
                .riskScore(alert.getRiskScore())
                .message(alert.getMessage())
                .status(alert.getStatus())
                .assignedOfficerName(alert.getAssignedOfficer() != null ? alert.getAssignedOfficer().getFullName() : null)
                .createdAt(alert.getCreatedAt())
                .resolvedAt(alert.getResolvedAt())
                .build();
    }
}
