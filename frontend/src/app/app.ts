import { Component, signal } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  future?: boolean;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly navItems: NavItem[] = [
    {
      label: 'Overview',
      path: '/'
    },
    {
      label: 'Patients',
      path: '/patient/P001'
    },
    {
      label: 'Digital Twin',
      path: '/'
    },
    {
      label: 'FHIR Resources',
      path: '/'
    },
    {
      label: 'Predictions',
      path: '',
      future: true
    },
    {
      label: 'Alerts',
      path: '',
      future: true
    },
    {
      label: 'Care Plans',
      path: '',
      future: true
    }
  ];

  protected readonly fhirLive =
    signal(true);

  protected syncEhr(): void {
    console.log(
      'Sync EHR clicked — backend not connected yet.'
    );
  }
}