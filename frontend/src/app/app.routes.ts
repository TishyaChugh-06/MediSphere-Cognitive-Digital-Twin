import { Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientDetailsComponent } from './pages/patient-details/patient-details.component';
import { LoginComponent } from './pages/login/login.component';
import { DigitalTwinComponent } from './pages/digital-twin/digital-twin.component';
import { FhirResourcesComponent } from './pages/fhir-resources/fhir-resources.component';

import { authGuard } from './services/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  {
    path: 'patients',
    component: PatientDetailsComponent,
    canActivate: [authGuard]
  },

  {
    path: 'patient/:id',
    component: PatientDetailsComponent,
    canActivate: [authGuard]
  },

  {
    path: 'digital-twin',
    component: DigitalTwinComponent,
    canActivate: [authGuard]
  },

  {
    path: 'fhir-resources',
    component: FhirResourcesComponent,
    canActivate: [authGuard]
  },

  {
    path: '**',
    redirectTo: ''
  }

];