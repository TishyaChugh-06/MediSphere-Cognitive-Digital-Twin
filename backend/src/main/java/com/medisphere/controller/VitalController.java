package com.medisphere.controller;

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

    public VitalController(
            VitalRepository vitalRepository,
            VitalsProducer vitalsProducer) {

        this.vitalRepository = vitalRepository;
        this.vitalsProducer = vitalsProducer;
    }

    @PostMapping
    public String sendVitals(@RequestBody String vitalData) {

        vitalsProducer.sendVital("P001", vitalData);

        return "Vitals sent to Kafka successfully";
    }

    @GetMapping("/{patientId}")
    public List<Vital> getVitalsByPatient(
            @PathVariable String patientId) {

        return vitalRepository.findByPatientId(patientId);
    }
}