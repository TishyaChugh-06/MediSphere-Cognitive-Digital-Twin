import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Patient } from '../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/patients';

  private baseUrl = 'http://localhost:8080/api';

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.apiUrl);
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(
      `${this.apiUrl}/${id}`
    );
  }

  getFhirPatient(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/fhir/patient/${id}`
    );
  }

  getVitalsByPatient(id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/vitals/${id}`
    );
  }

  getDigitalTwin(id: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/digital-twin/${id}`
    );
  }

  getLabsByPatient(id: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/labs/${id}`
    );
  }
}