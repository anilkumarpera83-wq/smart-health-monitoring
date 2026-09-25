package com.smarthealth.service;

import com.smarthealth.dto.HealthCaseDTOs.HealthCaseResponse;
import com.smarthealth.dto.ReportDTOs.*;
import com.smarthealth.dto.WaterQualityDTOs.WaterQualityResponse;
import com.smarthealth.repository.HealthCaseRepository;
import com.smarthealth.repository.WaterQualityRecordRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportService {

    private final HealthCaseRepository healthCaseRepository;
    private final WaterQualityRecordRepository waterQualityRecordRepository;
    private final HealthCaseService healthCaseService;
    private final WaterQualityService waterQualityService;

    public ReportService(HealthCaseRepository healthCaseRepository, WaterQualityRecordRepository waterQualityRecordRepository, HealthCaseService healthCaseService, WaterQualityService waterQualityService) {
        this.healthCaseRepository = healthCaseRepository;
        this.waterQualityRecordRepository = waterQualityRecordRepository;
        this.healthCaseService = healthCaseService;
        this.waterQualityService = waterQualityService;
    }

    public HealthReportResponse generateHealthReport() {
        List<HealthCaseResponse> cases = healthCaseRepository.findAll(Pageable.unpaged())
                .stream().map(healthCaseService::mapToResponse).collect(Collectors.toList());

        long highSeverity = cases.stream()
                .filter(c -> "HIGH".equalsIgnoreCase(c.getSeverity()) || "CRITICAL".equalsIgnoreCase(c.getSeverity()))
                .count();

        return HealthReportResponse.builder()
                .reportTitle("Public Health Disease Surveillance Report")
                .generatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .totalCasesCount((long) cases.size())
                .totalHighSeverityCases(highSeverity)
                .topDisease(cases.isEmpty() ? "None" : cases.get(0).getSuspectedDiseaseName())
                .cases(cases)
                .build();
    }

    public WaterReportResponse generateWaterReport() {
        List<WaterQualityResponse> records = waterQualityRecordRepository.findAll(Pageable.unpaged())
                .stream().map(waterQualityService::mapToResponse).collect(Collectors.toList());

        long contaminated = records.stream()
                .filter(w -> "HIGH".equalsIgnoreCase(w.getRiskLevel()) || "CRITICAL".equalsIgnoreCase(w.getRiskLevel()))
                .count();

        return WaterReportResponse.builder()
                .reportTitle("Water Quality & Contamination Assessment Report")
                .generatedDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .totalSamplesCount((long) records.size())
                .contaminatedSamplesCount(contaminated)
                .records(records)
                .build();
    }

    public String exportHealthCasesCSV() {
        StringBuilder csv = new StringBuilder();
        csv.append("Case Number,Age,Gender,District,Mandal,Village,Reporting Date,Suspected Disease,Confirmed Disease,Severity,Water Source\n");

        List<HealthCaseResponse> cases = healthCaseRepository.findAll(Pageable.unpaged())
                .stream().map(healthCaseService::mapToResponse).collect(Collectors.toList());

        for (HealthCaseResponse c : cases) {
            csv.append(String.format("\"%s\",%d,\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"\n",
                    c.getCaseNumber(), c.getAge(), c.getGender(),
                    c.getDistrictName(), c.getMandalName(), c.getVillageName(),
                    c.getReportingDate(), c.getSuspectedDiseaseName(),
                    c.getConfirmedDiseaseName() != null ? c.getConfirmedDiseaseName() : "",
                    c.getSeverity(), c.getWaterSource() != null ? c.getWaterSource() : ""));
        }
        return csv.toString();
    }

    public String exportWaterQualityCSV() {
        StringBuilder csv = new StringBuilder();
        csv.append("Sample Code,District,Mandal,Village,Water Source,Collection Date,pH,Turbidity (NTU),E. Coli,Overall Quality,Risk Level\n");

        List<WaterQualityResponse> records = waterQualityRecordRepository.findAll(Pageable.unpaged())
                .stream().map(waterQualityService::mapToResponse).collect(Collectors.toList());

        for (WaterQualityResponse w : records) {
            csv.append(String.format("\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",%.2f,%.2f,\"%s\",\"%s\",\"%s\"\n",
                    w.getSampleCode(), w.getDistrictName(), w.getMandalName(), w.getVillageName(),
                    w.getWaterSource(), w.getCollectionDate(), w.getPh(), w.getTurbidity(),
                    w.getEColiStatus(), w.getOverallQuality(), w.getRiskLevel()));
        }
        return csv.toString();
    }
}
