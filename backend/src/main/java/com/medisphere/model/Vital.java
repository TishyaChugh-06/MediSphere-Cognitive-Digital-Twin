package com.medisphere.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vitals")
public class Vital {

    @Id
    private String id;

    private String patientId;
    private int heartRate;
    private int spo2;

    public Vital() {
    }

    public Vital(String patientId, int heartRate, int spo2) {
        this.patientId = patientId;
        this.heartRate = heartRate;
        this.spo2 = spo2;
    }

    public String getId() {
        return id;
    }

    public String getPatientId() {
        return patientId;
    }

    public int getHeartRate() {
        return heartRate;
    }

    public int getSpo2() {
        return spo2;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setPatientId(String patientId) {
        this.patientId = patientId;
    }

    public void setHeartRate(int heartRate) {
        this.heartRate = heartRate;
    }

    public void setSpo2(int spo2) {
        this.spo2 = spo2;
    }
}