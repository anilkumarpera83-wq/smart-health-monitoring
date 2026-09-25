package com.smarthealth.repository;

import com.smarthealth.entity.HealthCase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface HealthCaseRepository extends JpaRepository<HealthCase, Long> {
    Page<HealthCase> findByDistrictId(Long districtId, Pageable pageable);
    Page<HealthCase> findByVillageId(Long villageId, Pageable pageable);

    @Query("SELECT COUNT(h) FROM HealthCase h")
    long countTotalCases();

    @Query("SELECT COUNT(h) FROM HealthCase h WHERE h.reportingDate >= :startDate")
    long countRecentCases(@Param("startDate") LocalDate startDate);

    @Query("SELECT COUNT(h) FROM HealthCase h WHERE h.village.id = :villageId AND h.reportingDate >= :startDate")
    long countRecentCasesByVillage(@Param("villageId") Long villageId, @Param("startDate") LocalDate startDate);

    @Query("SELECT h.suspectedDisease.name, COUNT(h) FROM HealthCase h GROUP BY h.suspectedDisease.name")
    List<Object[]> countCasesByDiseaseGroup();

    @Query("SELECT h.district.name, COUNT(h) FROM HealthCase h GROUP BY h.district.name")
    List<Object[]> countCasesByDistrictGroup();

    @Query("SELECT h.village.name, COUNT(h) FROM HealthCase h WHERE h.reportingDate >= :startDate GROUP BY h.village.name HAVING COUNT(h) >= :threshold")
    List<Object[]> findHighRiskVillagesByCaseCount(@Param("startDate") LocalDate startDate, @Param("threshold") long threshold);
}
