package com.medisphere.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medisphere.kafka.VitalsProducer;
import com.medisphere.model.Vital;
import com.medisphere.repository.VitalRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vitals")
public class VitalController {

    private final VitalRepository vitalRepository;
    private final VitalsProducer vitalsProducer;
    private final ObjectMapper objectMapper;

    public VitalController(
            VitalRepository vitalRepository,
            VitalsProducer vitalsProducer,
            ObjectMapper objectMapper) {

        this.vitalRepository = vitalRepository;
        this.vitalsProducer = vitalsProducer;
        this.objectMapper = objectMapper;
    }

    // Add a new vital through Kafka
    @PostMapping
    public String sendVitals(@RequestBody Vital vital) {

        try {
            // Convert Vital object to JSON
            String vitalData = objectMapper.writeValueAsString(vital);

            // Send the vital using the actual patient ID
            vitalsProducer.sendVital(vital.getPatientId(), vitalData);

            return "Vitals sent to Kafka successfully";

        } catch (Exception e) {
            return "Failed to send vitals: " + e.getMessage();
        }
    }

    // Get all vitals for a particular patient
    @GetMapping("/{patientId}")
    public List<Vital> getVitalsByPatient(
            @PathVariable String patientId) {

        return vitalRepository.findByPatientId(patientId);
    }
}