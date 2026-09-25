package com.smarthealth.repository;

import com.smarthealth.entity.District;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DistrictRepository extends JpaRepository<District, Long> {
    List<District> findByStateIdOrderByNameAsc(Long stateId);
    Optional<District> findByStateIdAndName(Long stateId, String name);
    Optional<District> findByName(String name);
}
