package com.medisphere.controller;

import com.medisphere.model.LabResult;
import com.medisphere.repository.LabResultRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/labs")
public class LabResultController {

    private final LabResultRepository labResultRepository;

    public LabResultController(
            LabResultRepository labResultRepository) {

        this.labResultRepository = labResultRepository;
    }

    @GetMapping("/{patientId}")
    public List<LabResult> getLabs(
            @PathVariable String patientId) {

        return labResultRepository.findByPatientId(patientId);
    }

    @PostMapping
    public LabResult addLab(
            @RequestBody LabResult labResult) {

        return labResultRepository.save(labResult);
    }
}