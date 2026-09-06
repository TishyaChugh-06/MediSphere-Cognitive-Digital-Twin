import { Component, inject, signal } from '@angular/core';

import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { AuthService } from './services/auth.service';

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

  protected readonly router =
    inject(Router);

  private readonly authService =
    inject(AuthService);

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
      path: '/digital-twin'
    },

    {
      label: 'FHIR Resources',
      path: '/fhir-resources'
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

  protected logout(): void {

    this.authService.logout();

    this.router.navigate([
      '/login'
    ]);
  }
}