package com.medisphere.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "lab_results")
public class LabResult {

    @Id
    private String id;

    private String patientId;
    private String test;
    private String value;
    private String unit;
    private String referenceRange;

    public LabResult() {
    }

    public LabResult(
            String patientId,
            String test,
            String value,
            String unit,
            String referenceRange) {

        this.patientId = patientId;
        this.test = test;
        this.value = value;
        this.unit = unit;
        this.referenceRange = referenceRange;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPatientId() {
        return patientId;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getReferenceRange() {
        return referenceRange;
    }

    public void setReferenceRange(String referenceRange) {
        this.referenceRange = referenceRange;
    }
}