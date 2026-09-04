import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Patient } from '../../models/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {

  private patientService = inject(PatientService);
  private route = inject(ActivatedRoute);

  protected readonly patient = signal<Patient | null>(null);

  protected readonly kpis = [
    {
      label: 'Patients Onboarded',
      value: '1',
      info: 'Demo Patient'
    },
    {
      label: 'FHIR Resources',
      value: '1',
      info: 'Patient Resource'
    },
    {
      label: 'Digital Twin',
      value: 'Active',
      info: 'Foundation Ready'
    }
  ];

  protected readonly vitals = [
    {
      label: 'Heart Rate',
      value: '76',
      unit: 'bpm',
      icon: '❤️'
    },
    {
      label: 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      icon: '🩸'
    },
    {
      label: 'SpO₂',
      value: '98',
      unit: '%',
      icon: '🫁'
    }
  ];

  protected readonly labResults = [
    {
      test: 'HbA1c',
      value: '7.2%',
      code: 'LOINC 4548-4'
    },
    {
      test: 'eGFR',
      value: '65',
      code: 'Sample Result'
    },
    {
      test: 'LDL',
      value: '120',
      code: 'mg/dL'
    },
    {
      test: 'Glucose',
      value: '142',
      code: 'mg/dL'
    }
  ];

  protected readonly fhirStatuses = [
    {
      resourceType: 'Patient',
      status: 'Loaded'
    },
    {
      resourceType: 'FHIR R4',
      status: 'Foundation Ready'
    },
    {
      resourceType: 'MongoDB',
      status: 'Integrated'
    }
  ];

  constructor() {
    const id =
      this.route.snapshot.paramMap.get('id') ?? 'P001';

    this.loadPatient(id);
  }

  private loadPatient(id: string): void {
    this.patientService.getPatientById(id).subscribe({
      next: (patient) => {
        this.patient.set(patient);
      },
      error: (error) => {
        console.error('Failed to load patient:', error);
      }
    });
  }
}