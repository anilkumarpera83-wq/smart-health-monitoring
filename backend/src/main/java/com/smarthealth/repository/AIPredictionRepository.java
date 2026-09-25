package com.smarthealth.repository;

import com.smarthealth.entity.AIPrediction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AIPredictionRepository extends JpaRepository<AIPrediction, Long> {
    Page<AIPrediction> findByDistrictId(Long districtId, Pageable pageable);
    List<AIPrediction> findTop10ByOrderByCreatedAtDesc();
}
