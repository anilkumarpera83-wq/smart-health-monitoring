package com.smarthealth.controller;

import com.smarthealth.dto.LocationDTOs.*;
import com.smarthealth.service.LocationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Location Hierarchy", description = "State, District, Mandal, and Village hierarchy endpoints")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/states")
    @Operation(summary = "Get all supported states")
    public ResponseEntity<List<StateDTO>> getStates() {
        return ResponseEntity.ok(locationService.getAllStates());
    }

    @GetMapping("/districts")
    @Operation(summary = "Get districts for state (defaults to Telangana, id=1)")
    public ResponseEntity<List<DistrictDTO>> getDistricts(@RequestParam(defaultValue = "1") Long stateId) {
        return ResponseEntity.ok(locationService.getDistrictsByState(stateId));
    }

    @GetMapping("/districts/{districtId}/mandals")
    @Operation(summary = "Get mandals for selected district")
    public ResponseEntity<List<MandalDTO>> getMandals(@PathVariable Long districtId) {
        return ResponseEntity.ok(locationService.getMandalsByDistrict(districtId));
    }

    @GetMapping("/mandals/{mandalId}/villages")
    @Operation(summary = "Get villages for selected mandal")
    public ResponseEntity<List<VillageDTO>> getVillages(@PathVariable Long mandalId) {
        return ResponseEntity.ok(locationService.getVillagesByMandal(mandalId));
    }
}
