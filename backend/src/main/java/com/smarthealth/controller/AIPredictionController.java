package com.smarthealth.controller;

import com.smarthealth.dto.AIPredictionDTOs.*;
import com.smarthealth.service.MLIntegrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@Tag(name = "AI Prediction Service", description = "AI/ML Outbreak Risk Predictions and Analysis Engine")
public class AIPredictionController {

    private final MLIntegrationService mlIntegrationService;

    public AIPredictionController(MLIntegrationService mlIntegrationService) {
        this.mlIntegrationService = mlIntegrationService;
    }

    @PostMapping("/predict")
    @Operation(summary = "Request AI Outbreak Risk Prediction from Python FastAPI Service")
    public ResponseEntity<AIPredictionResponse> predict(@RequestBody AIPredictionRequest request) {
        return ResponseEntity.ok(mlIntegrationService.predictAndSave(request));
    }

    @GetMapping("/predictions")
    @Operation(summary = "Get historical AI prediction records")
    public ResponseEntity<Page<AIPredictionResponse>> getHistory(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(mlIntegrationService.getPredictionHistory(PageRequest.of(page, size)));
    }
}
