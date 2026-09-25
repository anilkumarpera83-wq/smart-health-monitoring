package com.smarthealth.repository;

import com.smarthealth.entity.WaterQualityRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface WaterQualityRecordRepository extends JpaRepository<WaterQualityRecord, Long> {
    Page<WaterQualityRecord> findByDistrictId(Long districtId, Pageable pageable);
    Page<WaterQualityRecord> findByVillageId(Long villageId, Pageable pageable);

    Optional<WaterQualityRecord> findTopByVillageIdOrderByCollectionDateDesc(Long villageId);

    @Query("SELECT COUNT(w) FROM WaterQualityRecord w WHERE w.riskLevel IN ('HIGH', 'CRITICAL')")
    long countHighRiskWaterRecords();

    @Query("SELECT w.waterSource, COUNT(w) FROM WaterQualityRecord w GROUP BY w.waterSource")
    List<Object[]> countByWaterSourceGroup();
}
