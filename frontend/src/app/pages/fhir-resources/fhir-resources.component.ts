import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-fhir-resources',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './fhir-resources.component.html',
  styleUrl: './fhir-resources.component.css'
})
export class FhirResourcesComponent {

  private patientService = inject(PatientService);

  protected readonly fhirPatient =
    signal<any | null>(null);

  protected readonly loading = signal(true);

  constructor() {
    this.loadFhirPatient();
  }

  private loadFhirPatient(): void {

    this.patientService.getFhirPatient('P001').subscribe({

      next: (patient) => {
        this.fhirPatient.set(patient);
        this.loading.set(false);
      },

      error: (error) => {
        console.error(
          'Failed to load FHIR Patient:',
          error
        );

        this.loading.set(false);
      }

    });
  }
}