package com.smarthealth.repository;

import com.smarthealth.entity.Village;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface VillageRepository extends JpaRepository<Village, Long> {
    List<Village> findByMandalIdOrderByNameAsc(Long mandalId);
    Optional<Village> findByMandalIdAndName(Long mandalId, String name);
}
