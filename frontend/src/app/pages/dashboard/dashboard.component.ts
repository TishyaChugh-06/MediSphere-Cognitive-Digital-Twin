import { Component, computed, inject, signal } from '@angular/core';

import {
  Patient,
  VitalSign,
  LabResult,
  FhirResourceStatus,
  ValidationCheck,
  UserRole
} from '../../models/patient';

import { PatientService } from '../../services/patient.service';

interface KpiCard {
  label: string;
  value: string;
  helper: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  private patientService = inject(PatientService);

  protected readonly role = signal<UserRole>('clinician');

  protected readonly patient = signal<Patient | null>(null);

  protected readonly fhirPatient = signal<any | null>(null);

  protected readonly consentCaptured = true;

  // Real vitals loaded from MongoDB
  protected readonly vitals = signal<VitalSign[]>([]);

  protected readonly labResults: LabResult[] = [
    {
      test: 'HbA1c',
      value: '5.6',
      unit: '%',
      referenceRange: '4.0 - 5.6'
    },
    {
      test: 'eGFR',
      value: '92',
      unit: 'mL/min/1.73m²',
      referenceRange: '≥ 90'
    },
    {
      test: 'LDL Cholesterol',
      value: '110',
      unit: 'mg/dL',
      referenceRange: '< 130'
    },
    {
      test: 'Glucose (Fasting)',
      value: '94',
      unit: 'mg/dL',
      referenceRange: '70 - 99'
    }
  ];

  protected readonly fhirStatuses =
    computed<FhirResourceStatus[]>(() => [
      {
        resourceType: 'Patient',
        status: this.fhirPatient() ? 'Loaded' : 'Pending',
        detail: this.fhirPatient()
          ? 'FHIR R4 Patient resource retrieved from backend'
          : 'Loading FHIR Patient resource'
      },
      {
        resourceType: 'MongoDB Persistence',
        status: this.patient() ? 'Loaded' : 'Pending',
        detail: this.patient()
          ? 'Patient record persisted and retrieved from MongoDB'
          : 'Loading patient record from MongoDB'
      },
      {
        resourceType: 'SMART on FHIR Auth',
        status: 'Planned',
        detail: 'Launch/auth flow not yet implemented'
      }
    ]);

  protected readonly kpis: KpiCard[] = [
    {
      label: 'Patients Onboarded',
      value: '1',
      helper: 'Demo patient loaded'
    },
    {
      label: 'FHIR Resources',
      value: '1',
      helper: 'Patient resource (R4)'
    }
  ];

  constructor() {
    this.loadPatient();
    this.loadFhirPatient();
    this.loadVitals();
  }

  private loadPatient(): void {
    this.patientService.getPatientById('P001').subscribe({
      next: (patient) => {
        this.patient.set(patient);
      },
      error: (error) => {
        console.error('Failed to load patient:', error);
      }
    });
  }

  private loadFhirPatient(): void {
    this.patientService.getFhirPatient('P001').subscribe({
      next: (fhirPatient) => {
        this.fhirPatient.set(fhirPatient);
      },
      error: (error) => {
        console.error('Failed to load FHIR patient:', error);
      }
    });
  }

  private loadVitals(): void {
    this.patientService.getVitalsByPatient('P001').subscribe({
      next: (vitals) => {

        const latestVital = vitals[vitals.length - 1];

        if (!latestVital) {
          return;
        }

        this.vitals.set([
          {
            label: 'Heart Rate',
            value: String(latestVital.heartRate),
            unit: 'bpm',
            status: 'normal'
          },
          {
            label: 'SpO2',
            value: String(latestVital.spo2),
            unit: '%',
            status: 'normal'
          }
        ]);
      },

      error: (error) => {
        console.error('Failed to load vitals:', error);
      }
    });
  }

  protected readonly twinCompleteness = computed(() => {

    const patient = this.patient();

    if (!patient) {
      return 0;
    }

    const fields = [
      patient.id,
      patient.name,
      patient.age,
      patient.gender,
      patient.bloodGroup
    ];

    const filled = fields.filter(
      field =>
        field !== undefined &&
        field !== null &&
        field !== ''
    ).length;

    return Math.round(
      (filled / fields.length) * 100
    );
  });

  protected readonly validationChecks =
    computed<ValidationCheck[]>(() => {

      const hr = Number(
        this.vitals().find(
          vital => vital.label === 'Heart Rate'
        )?.value ?? 0
      );

      const spo2 = Number(
        this.vitals().find(
          vital => vital.label === 'SpO2'
        )?.value ?? 0
      );

      const vitalsOk =
        hr >= 40 &&
        hr <= 160 &&
        spo2 >= 90;

      const completeness =
        this.twinCompleteness();

      return [
        {
          label: 'FHIR Resource Validation',
          status: this.fhirPatient()
            ? 'pass'
            : 'watch',
          detail: this.fhirPatient()
            ? 'Patient resource retrieved successfully as FHIR R4'
            : 'FHIR Patient resource is loading'
        },
        {
          label: 'Patient Consent',
          status: this.consentCaptured
            ? 'pass'
            : 'fail',
          detail: this.consentCaptured
            ? 'Consent captured for the demo record'
            : 'Consent not captured'
        },
        {
          label: 'Twin Data Completeness',
          status:
            completeness >= 95
              ? 'pass'
              : 'watch',
          detail:
            `${completeness}% of core fields populated`
        },
        {
          label: 'Vitals Range Check',
          status:
            vitalsOk
              ? 'pass'
              : 'watch',
          detail:
            vitalsOk
              ? 'Heart rate and SpO2 within expected bounds'
              : 'One or more vitals outside expected bounds'
        },
        {
          label: 'RBAC Role Check',
          status: 'pass',
          detail:
            `Viewing as ${
              this.role() === 'clinician'
                ? 'Clinician'
                : 'Patient'
            }`
        }
      ];
    });

  protected setRole(role: UserRole): void {
    this.role.set(role);
  }
}