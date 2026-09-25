package com.smarthealth.service;

import com.smarthealth.dto.WaterQualityDTOs.*;
import com.smarthealth.entity.*;
import com.smarthealth.exception.ResourceNotFoundException;
import com.smarthealth.repository.UserRepository;
import com.smarthealth.repository.WaterQualityRecordRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class WaterQualityService {

    private final WaterQualityRecordRepository waterQualityRecordRepository;
    private final UserRepository userRepository;
    private final LocationService locationService;
    private final OutbreakDetectionService outbreakDetectionService;
    private final AuditLogService auditLogService;

    public WaterQualityService(WaterQualityRecordRepository waterQualityRecordRepository, UserRepository userRepository, LocationService locationService, OutbreakDetectionService outbreakDetectionService, AuditLogService auditLogService) {
        this.waterQualityRecordRepository = waterQualityRecordRepository;
        this.userRepository = userRepository;
        this.locationService = locationService;
        this.outbreakDetectionService = outbreakDetectionService;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public WaterQualityResponse submitWaterQualityRecord(CreateWaterQualityRequest request, String submitterEmail) {
        User submitter = userRepository.findByEmail(submitterEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Submitter user not found"));

        District district = locationService.getDistrictEntity(request.getDistrictId());
        Mandal mandal = locationService.getMandalEntity(request.getMandalId());
        Village village = locationService.getVillageEntity(request.getVillageId());
        State state = district.getState();

        Double ph = request.getPh();
        Double turbidity = request.getTurbidity();
        Boolean bacterial = request.getBacterialContamination() != null ? request.getBacterialContamination() : false;
        String eColi = request.getEColiStatus() != null ? request.getEColiStatus().toUpperCase() : "ABSENT";

        String overallQuality = "SAFE";
        String riskLevel = "LOW";

        if ("HIGH".equals(eColi) || (ph < 5.5 || ph > 9.0) || turbidity > 10.0) {
            overallQuality = "SEVERE";
            riskLevel = "CRITICAL";
        } else if ("PRESENT".equals(eColi) || (ph < 6.5 || ph > 8.5) || turbidity > 5.0 || Boolean.TRUE.equals(bacterial)) {
            overallQuality = "POOR";
            riskLevel = "HIGH";
        } else if (turbidity > 3.0 || (ph < 6.8 || ph > 8.2)) {
            overallQuality = "MODERATE";
            riskLevel = "MEDIUM";
        }

        String sampleCode = "WQ-" + System.currentTimeMillis();

        WaterQualityRecord record = WaterQualityRecord.builder()
                .sampleCode(sampleCode)
                .state(state)
                .district(district)
                .mandal(mandal)
                .village(village)
                .waterSource(request.getWaterSource())
                .collectionDate(request.getCollectionDate() != null ? request.getCollectionDate() : LocalDate.now())
                .ph(ph)
                .turbidity(turbidity)
                .temperature(request.getTemperature())
                .tds(request.getTds())
                .bacterialContamination(bacterial)
                .eColiStatus(eColi)
                .overallQuality(overallQuality)
                .riskLevel(riskLevel)
                .notes(request.getNotes())
                .submittedBy(submitter)
                .build();

        WaterQualityRecord savedRecord = waterQualityRecordRepository.save(record);

        auditLogService.logAction(submitter.getId(), submitter.getEmail(), "SUBMIT_WATER_QUALITY", "WaterQualityRecord", savedRecord.getId(), "Submitted water record " + sampleCode + " (Risk: " + riskLevel + ")", null);

        outbreakDetectionService.checkAndTriggerWaterContaminationAlert(savedRecord);

        return mapToResponse(savedRecord);
    }

    public Page<WaterQualityResponse> getAllRecords(Pageable pageable) {
        return waterQualityRecordRepository.findAll(pageable).map(this::mapToResponse);
    }

    public WaterQualityResponse getRecordById(Long id) {
        WaterQualityRecord wq = waterQualityRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Water quality record not found with id " + id));
        return mapToResponse(wq);
    }

    public WaterQualityResponse mapToResponse(WaterQualityRecord wq) {
        return WaterQualityResponse.builder()
                .id(wq.getId())
                .sampleCode(wq.getSampleCode())
                .stateName(wq.getState() != null ? wq.getState().getName() : null)
                .districtName(wq.getDistrict() != null ? wq.getDistrict().getName() : null)
                .mandalName(wq.getMandal() != null ? wq.getMandal().getName() : null)
                .villageName(wq.getVillage() != null ? wq.getVillage().getName() : null)
                .waterSource(wq.getWaterSource())
                .collectionDate(wq.getCollectionDate())
                .ph(wq.getPh())
                .turbidity(wq.getTurbidity())
                .temperature(wq.getTemperature())
                .tds(wq.getTds())
                .bacterialContamination(wq.getBacterialContamination())
                .eColiStatus(wq.getEColiStatus())
                .overallQuality(wq.getOverallQuality())
                .riskLevel(wq.getRiskLevel())
                .notes(wq.getNotes())
                .submittedByName(wq.getSubmittedBy() != null ? wq.getSubmittedBy().getFullName() : null)
                .createdAt(wq.getCreatedAt())
                .build();
    }
}
