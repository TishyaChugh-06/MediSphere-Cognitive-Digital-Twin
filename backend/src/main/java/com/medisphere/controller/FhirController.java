package com.medisphere.controller;

import ca.uhn.fhir.context.FhirContext;
import com.medisphere.fhir.FhirPatientService;

import com.medisphere.service.PatientService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fhir")
public class FhirController {

    private final FhirPatientService fhirPatientService;
    private final PatientService patientService;
    private final FhirContext fhirContext;

    public FhirController(PatientService patientService) {
        this.patientService = patientService;
        this.fhirPatientService = new FhirPatientService();
        this.fhirContext = FhirContext.forR4();
    }

    @GetMapping(
            value = "/patient/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> getPatient(
            @PathVariable String id) {

        return patientService.getPatientById(id)
                .map(patient -> {

                    org.hl7.fhir.r4.model.Patient fhirPatient =
                            fhirPatientService.toFhirPatient(patient);

                    String json = fhirContext
                            .newJsonParser()
                            .encodeResourceToString(fhirPatient);

                    return ResponseEntity.ok(json);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}