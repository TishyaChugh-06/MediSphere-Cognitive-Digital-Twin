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

  getAllPatients(): Observable<Patient[]> {
  return this.http.get<Patient[]>(this.apiUrl);
}

getPatientById(id: string): Observable<Patient> {
  return this.http.get<Patient>(`${this.apiUrl}/${id}`);
}

getFhirPatient(id: string): Observable<any> {
  return this.http.get<any>(
    `http://localhost:8080/api/fhir/patient/${id}`
  );
}

getVitalsByPatient(id: string): Observable<any[]> {
  return this.http.get<any[]>(
    `http://localhost:8080/api/vitals/${id}`
  );
}
}