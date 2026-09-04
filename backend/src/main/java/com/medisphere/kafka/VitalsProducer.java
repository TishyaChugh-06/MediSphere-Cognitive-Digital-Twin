package com.medisphere.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class VitalsProducer {

    private static final String TOPIC = "patient-vitals";

    private final KafkaTemplate<String, String> kafkaTemplate;

    public VitalsProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendVital(String patientId, String vitalData) {

        kafkaTemplate.send(
                TOPIC,
                patientId,
                vitalData
        );
    }
}