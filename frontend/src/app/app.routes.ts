import { Routes } from '@angular/router';

import { DashboardComponent }
  from './pages/dashboard/dashboard.component';

import { PatientDetailsComponent }
  from './pages/patient-details/patient-details.component';

export const routes: Routes = [

  {
    path: '',
    component: DashboardComponent
  },

  {
    path: 'patient/:id',
    component: PatientDetailsComponent
  },

  {
    path: '**',
    redirectTo: ''
  }

];