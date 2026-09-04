package com.medisphere.kafka;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medisphere.model.Vital;
import com.medisphere.repository.VitalRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class VitalsConsumer {

    private final VitalRepository vitalRepository;
    private final ObjectMapper objectMapper;

    public VitalsConsumer(
            VitalRepository vitalRepository,
            ObjectMapper objectMapper) {

        this.vitalRepository = vitalRepository;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(
            topics = "patient-vitals",
            groupId = "medisphere-vitals"
    )
    public void consumeVital(String message) {

        try {
            Vital vital = objectMapper.readValue(
                    message,
                    Vital.class
            );

            vitalRepository.save(vital);

            System.out.println(
                    "Vital saved to MongoDB: "
                            + vital.getPatientId()
                            + " HR="
                            + vital.getHeartRate()
                            + " SpO2="
                            + vital.getSpo2()
            );

        } catch (Exception e) {

            System.err.println(
                    "Failed to process vital: "
                            + message
            );

            e.printStackTrace();
        }
    }
}