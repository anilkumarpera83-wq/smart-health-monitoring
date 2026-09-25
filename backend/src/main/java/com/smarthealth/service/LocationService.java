package com.smarthealth.service;

import com.smarthealth.dto.LocationDTOs.*;
import com.smarthealth.entity.District;
import com.smarthealth.entity.Mandal;
import com.smarthealth.entity.State;
import com.smarthealth.entity.Village;
import com.smarthealth.exception.ResourceNotFoundException;
import com.smarthealth.repository.DistrictRepository;
import com.smarthealth.repository.MandalRepository;
import com.smarthealth.repository.StateRepository;
import com.smarthealth.repository.VillageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationService {

    private final StateRepository stateRepository;
    private final DistrictRepository districtRepository;
    private final MandalRepository mandalRepository;
    private final VillageRepository villageRepository;

    public LocationService(StateRepository stateRepository, DistrictRepository districtRepository, MandalRepository mandalRepository, VillageRepository villageRepository) {
        this.stateRepository = stateRepository;
        this.districtRepository = districtRepository;
        this.mandalRepository = mandalRepository;
        this.villageRepository = villageRepository;
    }

    public List<StateDTO> getAllStates() {
        return stateRepository.findAll().stream()
                .map(s -> StateDTO.builder().id(s.getId()).name(s.getName()).code(s.getCode()).build())
                .collect(Collectors.toList());
    }

    public List<DistrictDTO> getDistrictsByState(Long stateId) {
        return districtRepository.findByStateIdOrderByNameAsc(stateId).stream()
                .map(d -> DistrictDTO.builder().id(d.getId()).stateId(d.getState().getId()).name(d.getName()).code(d.getCode()).build())
                .collect(Collectors.toList());
    }

    public List<MandalDTO> getMandalsByDistrict(Long districtId) {
        return mandalRepository.findByDistrictIdOrderByNameAsc(districtId).stream()
                .map(m -> MandalDTO.builder().id(m.getId()).districtId(m.getDistrict().getId()).name(m.getName()).build())
                .collect(Collectors.toList());
    }

    public List<VillageDTO> getVillagesByMandal(Long mandalId) {
        return villageRepository.findByMandalIdOrderByNameAsc(mandalId).stream()
                .map(v -> VillageDTO.builder()
                        .id(v.getId())
                        .mandalId(v.getMandal().getId())
                        .name(v.getName())
                        .population(v.getPopulation())
                        .latitude(v.getLatitude())
                        .longitude(v.getLongitude())
                        .build())
                .collect(Collectors.toList());
    }

    public State getStateEntity(Long id) {
        return stateRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("State not found with id " + id));
    }

    public District getDistrictEntity(Long id) {
        return districtRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("District not found with id " + id));
    }

    public Mandal getMandalEntity(Long id) {
        return mandalRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Mandal not found with id " + id));
    }

    public Village getVillageEntity(Long id) {
        return villageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Village not found with id " + id));
    }
}
