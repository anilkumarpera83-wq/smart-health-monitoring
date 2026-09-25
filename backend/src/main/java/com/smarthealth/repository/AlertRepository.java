package com.smarthealth.repository;

import com.smarthealth.entity.Alert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    Page<Alert> findByDistrictId(Long districtId, Pageable pageable);
    Page<Alert> findByStatus(String status, Pageable pageable);

    @Query("SELECT COUNT(a) FROM Alert a WHERE a.status != 'RESOLVED' AND a.status != 'DISMISSED'")
    long countActiveAlerts();

    @Query("SELECT a.riskLevel, COUNT(a) FROM Alert a GROUP BY a.riskLevel")
    List<Object[]> countAlertsByRiskLevelGroup();
}
