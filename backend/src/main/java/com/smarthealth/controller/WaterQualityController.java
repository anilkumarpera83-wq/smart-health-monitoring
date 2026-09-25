package com.smarthealth.controller;

import com.smarthealth.dto.WaterQualityDTOs.*;
import com.smarthealth.service.WaterQualityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/water-quality")
@Tag(name = "Water Quality Monitoring", description = "Water Quality Samples and Contamination Risk Assessment")
public class WaterQualityController {

    private final WaterQualityService waterQualityService;

    public WaterQualityController(WaterQualityService waterQualityService) {
        this.waterQualityService = waterQualityService;
    }

    @PostMapping
    @Operation(summary = "Submit a new water quality observation sample")
    public ResponseEntity<WaterQualityResponse> submitRecord(@Valid @RequestBody CreateWaterQualityRequest request, Authentication authentication) {
        return ResponseEntity.ok(waterQualityService.submitWaterQualityRecord(request, authentication.getName()));
    }

    @GetMapping
    @Operation(summary = "Get paginated water quality records")
    public ResponseEntity<Page<WaterQualityResponse>> getAllRecords(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(waterQualityService.getAllRecords(PageRequest.of(page, size)));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get water quality record by ID")
    public ResponseEntity<WaterQualityResponse> getRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(waterQualityService.getRecordById(id));
    }
}
