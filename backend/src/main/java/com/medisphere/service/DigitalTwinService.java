package com.medisphere.service;

import com.medisphere.model.DigitalTwin;
import com.medisphere.model.Patient;
import com.medisphere.model.Vital;
import com.medisphere.model.LabResult;
import com.medisphere.repository.VitalRepository;
import com.medisphere.repository.LabResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DigitalTwinService {

    private final PatientService patientService;
    private final VitalRepository vitalRepository;
    private final LabResultRepository labResultRepository;

    public DigitalTwinService(
            PatientService patientService,
            VitalRepository vitalRepository,
            LabResultRepository labResultRepository) {

        this.patientService = patientService;
        this.vitalRepository = vitalRepository;
        this.labResultRepository = labResultRepository;
    }

    public Optional<DigitalTwin> getDigitalTwin(String patientId) {

        // Get patient from MongoDB
        Optional<Patient> patient =
                patientService.getPatientById(patientId);

        if (patient.isEmpty()) {
            return Optional.empty();
        }

        // Get vitals from MongoDB
        List<Vital> vitals =
                vitalRepository.findByPatientId(patientId);

        // Get laboratory results from MongoDB
        List<LabResult> labResults =
                labResultRepository.findByPatientId(patientId);

        // Create Digital Twin
        DigitalTwin twin = new DigitalTwin();

        twin.setPatientId(patientId);
        twin.setPatient(patient.get());
        twin.setVitals(vitals);
        twin.setLabResults(labResults);

        // Twin status
        twin.setTwinStatus("Active");

        // Health status
        if (vitals.isEmpty() && labResults.isEmpty()) {

            twin.setHealthStatus("No monitoring data");

        } else {

            twin.setHealthStatus("Monitoring");
        }

        return Optional.of(twin);
    }
}