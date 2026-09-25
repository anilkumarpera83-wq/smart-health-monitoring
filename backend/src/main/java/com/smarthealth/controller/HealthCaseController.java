package com.smarthealth.controller;

import com.smarthealth.dto.HealthCaseDTOs.*;
import com.smarthealth.service.HealthCaseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/health-cases")
@Tag(name = "Health Cases", description = "Disease Surveillance and Patient Case Management")
public class HealthCaseController {

    private final HealthCaseService healthCaseService;

    public HealthCaseController(HealthCaseService healthCaseService) {
        this.healthCaseService = healthCaseService;
    }

    @PostMapping
    @Operation(summary = "Report a new health case")
    public ResponseEntity<HealthCaseResponse> createCase(@Valid @RequestBody CreateHealthCaseRequest request, Authentication authentication) {
        return ResponseEntity.ok(healthCaseService.createHealthCase(request, authentication.getName()));
    }

    @GetMapping
    @Operation(summary = "Get paginated health cases")
    public ResponseEntity<Page<HealthCaseResponse>> getAllCases(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(healthCaseService.getAllCases(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get health case details by ID")
    public ResponseEntity<HealthCaseResponse> getCaseById(@PathVariable Long id) {
        return ResponseEntity.ok(healthCaseService.getCaseById(id));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update case information (e.g. confirmed disease or severity)")
    public ResponseEntity<HealthCaseResponse> updateCase(@PathVariable Long id, @RequestBody CreateHealthCaseRequest request) {
        return ResponseEntity.ok(healthCaseService.updateHealthCase(id, request));
    }
}
