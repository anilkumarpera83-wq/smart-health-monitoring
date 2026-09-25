package com.smarthealth.controller;

import com.smarthealth.dto.AlertDTOs.*;
import com.smarthealth.service.AlertService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/alerts")
@Tag(name = "Early Warning & Alerts", description = "Outbreak and Contamination Alerts Lifecycle Management")
public class AlertController {

    private final AlertService alertService;

    public AlertController(AlertService alertService) {
        this.alertService = alertService;
    }

    @GetMapping
    @Operation(summary = "Get paginated system alerts")
    public ResponseEntity<Page<AlertResponse>> getAllAlerts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(alertService.getAllAlerts(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get alert details by ID")
    public ResponseEntity<AlertResponse> getAlertById(@PathVariable Long id) {
        return ResponseEntity.ok(alertService.getAlertById(id));
    }

    @PutMapping("/{id}/status")
    @Operation(summary = "Update alert status (e.g. ACKNOWLEDGED, INVESTIGATING, RESOLVED, DISMISSED)")
    public ResponseEntity<AlertResponse> updateStatus(@PathVariable Long id, @RequestBody UpdateAlertStatusRequest request) {
        return ResponseEntity.ok(alertService.updateAlertStatus(id, request));
    }
}
