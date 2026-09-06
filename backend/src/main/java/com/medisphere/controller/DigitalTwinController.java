package com.medisphere.controller;

import com.medisphere.model.DigitalTwin;
import com.medisphere.service.DigitalTwinService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/digital-twin")
public class DigitalTwinController {

    private final DigitalTwinService digitalTwinService;

    public DigitalTwinController(
            DigitalTwinService digitalTwinService) {

        this.digitalTwinService = digitalTwinService;
    }

    @GetMapping("/{patientId}")
    public ResponseEntity<DigitalTwin> getDigitalTwin(
            @PathVariable String patientId) {

        return digitalTwinService
                .getDigitalTwin(patientId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}