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

  protected readonly vitals = signal<any[]>([]);

  protected readonly labResults = signal<any[]>([]);

  protected readonly fhirPatient = signal<any | null>(null);

  protected readonly digitalTwin = signal<any | null>(null);

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
    this.loadVitals(id);
    this.loadLabs(id);
    this.loadFhirPatient(id);
    this.loadDigitalTwin(id);
  }

  private loadPatient(id: string): void {

    this.patientService.getPatientById(id).subscribe({

      next: (patient) => {
        this.patient.set(patient);
      },

      error: (error) => {
        console.error(
          'Failed to load patient:',
          error
        );
      }

    });
  }

  private loadVitals(id: string): void {

    this.patientService.getVitalsByPatient(id).subscribe({

      next: (vitals) => {
        this.vitals.set(vitals);
      },

      error: (error) => {
        console.error(
          'Failed to load vitals:',
          error
        );
      }

    });
  }

  private loadLabs(id: string): void {

    this.patientService.getLabsByPatient(id).subscribe({

      next: (labs) => {
        this.labResults.set(labs);
      },

      error: (error) => {
        console.error(
          'Failed to load laboratory results:',
          error
        );
      }

    });
  }

  private loadFhirPatient(id: string): void {

    this.patientService.getFhirPatient(id).subscribe({

      next: (fhirPatient) => {
        this.fhirPatient.set(fhirPatient);
      },

      error: (error) => {
        console.error(
          'Failed to load FHIR patient:',
          error
        );
      }

    });
  }

  private loadDigitalTwin(id: string): void {

    this.patientService.getDigitalTwin(id).subscribe({

      next: (twin) => {
        this.digitalTwin.set(twin);
      },

      error: (error) => {
        console.error(
          'Failed to load Digital Twin:',
          error
        );
      }

    });
  }
}