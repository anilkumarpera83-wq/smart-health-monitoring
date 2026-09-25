package com.smarthealth.repository;

import com.smarthealth.entity.Mandal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface MandalRepository extends JpaRepository<Mandal, Long> {
    List<Mandal> findByDistrictIdOrderByNameAsc(Long districtId);
    Optional<Mandal> findByDistrictIdAndName(Long districtId, String name);
}
