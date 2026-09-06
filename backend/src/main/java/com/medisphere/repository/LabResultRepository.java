package com.medisphere.repository;

import com.medisphere.model.LabResult;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LabResultRepository
        extends MongoRepository<LabResult, String> {

    List<LabResult> findByPatientId(String patientId);
}