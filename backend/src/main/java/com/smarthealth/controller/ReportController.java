package com.smarthealth.controller;

import com.smarthealth.dto.ReportDTOs.*;
import com.smarthealth.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@Tag(name = "Reports & Exports", description = "Public Health Reports and CSV Data Exports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/health")
    @Operation(summary = "Get Health Surveillance Report")
    public ResponseEntity<HealthReportResponse> getHealthReport() {
        return ResponseEntity.ok(reportService.generateHealthReport());
    }

    @GetMapping("/water")
    @Operation(summary = "Get Water Quality Assessment Report")
    public ResponseEntity<WaterReportResponse> getWaterReport() {
        return ResponseEntity.ok(reportService.generateWaterReport());
    }

    @GetMapping(value = "/health/csv", produces = "text/csv")
    @Operation(summary = "Export Health Cases as CSV file")
    public ResponseEntity<String> exportHealthCasesCSV() {
        String csvData = reportService.exportHealthCasesCSV();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=health_cases_report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvData);
    }

    @GetMapping(value = "/water/csv", produces = "text/csv")
    @Operation(summary = "Export Water Quality Records as CSV file")
    public ResponseEntity<String> exportWaterQualityCSV() {
        String csvData = reportService.exportWaterQualityCSV();
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=water_quality_report.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csvData);
    }
}
