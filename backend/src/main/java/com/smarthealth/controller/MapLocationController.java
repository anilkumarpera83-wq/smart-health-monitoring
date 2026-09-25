package com.smarthealth.controller;

import com.smarthealth.dto.MapLocationDTO;
import com.smarthealth.service.MapLocationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/map-locations")
@Tag(name = "Google Maps Location Surveillance", description = "Endpoints for fetching health center, water testing, and disease risk map markers")
public class MapLocationController {

    private final MapLocationService mapLocationService;

    public MapLocationController(MapLocationService mapLocationService) {
        this.mapLocationService = mapLocationService;
    }

    @GetMapping
    @Operation(summary = "Get all map location markers with coordinates, status, and filtering")
    public ResponseEntity<List<MapLocationDTO>> getMapLocations(
            @RequestParam(required = false) Long districtId,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(mapLocationService.getMapLocations(districtId, type, status, search));
    }
}
