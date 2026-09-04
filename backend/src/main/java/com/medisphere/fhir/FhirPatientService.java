package com.medisphere.fhir;

import com.medisphere.model.Patient;
import org.hl7.fhir.r4.model.ContactPoint;
import org.hl7.fhir.r4.model.Enumerations;

public class FhirPatientService {

    public org.hl7.fhir.r4.model.Patient toFhirPatient(Patient source) {

        org.hl7.fhir.r4.model.Patient patient =
                new org.hl7.fhir.r4.model.Patient();

        // FHIR Patient ID
        patient.setId(source.getId());

        // Name
        String[] nameParts = source.getName().split(" ", 2);

        patient.addName()
                .setFamily(nameParts.length > 1 ? nameParts[1] : "")
                .addGiven(nameParts[0]);

        // Gender
        if ("Male".equalsIgnoreCase(source.getGender())) {

            patient.setGender(
                    Enumerations.AdministrativeGender.MALE
            );

        } else if ("Female".equalsIgnoreCase(source.getGender())) {

            patient.setGender(
                    Enumerations.AdministrativeGender.FEMALE
            );
        }

        // Birth date
        if (source.getBirthDate() != null &&
                !source.getBirthDate().isBlank()) {

            patient.setBirthDate(
                    java.sql.Date.valueOf(source.getBirthDate())
            );
        }

        // Phone
        if (source.getPhone() != null &&
                !source.getPhone().isBlank()) {

            patient.addTelecom()
                    .setSystem(
                            ContactPoint.ContactPointSystem.PHONE
                    )
                    .setValue(source.getPhone());
        }

        return patient;
    }
}