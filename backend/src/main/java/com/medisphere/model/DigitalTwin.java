package com.medisphere.model;

import java.util.List;

public class DigitalTwin {

    private String patientId;
    private Patient patient;
    private List<Vital> vitals;
    private List<LabResult> labResults;

    private String twinStatus;
    private String healthStatus;

    public DigitalTwin() {
    }

    public DigitalTwin(
            String patientId,
            Patient patient,
            List<Vital> vitals,
            List<LabResult> labResults,
            String twinStatus,
            String healthStatus) {

        this.patientId = patientId;
        this.patient = patient;
        this.vitals = vitals;
        this.labResults = labResults;
        this.twinStatus = twinStatus;
        this.healthStatus = healthStatus;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public List<Vital> getVitals() {
        return vitals;
    }

    public void setVitals(List<Vital> vitals) {
        this.vitals = vitals;
    }

    public List<LabResult> getLabResults() {
        return labResults;
    }

    public void setLabResults(List<LabResult> labResults) {
        this.labResults = labResults;
    }

    public String getTwinStatus() {
        return twinStatus;
    }

    public void setTwinStatus(String twinStatus) {
        this.twinStatus = twinStatus;
    }

    public String getHealthStatus() {
        return healthStatus;
    }

    public void setHealthStatus(String healthStatus) {
        this.healthStatus = healthStatus;
    }
}