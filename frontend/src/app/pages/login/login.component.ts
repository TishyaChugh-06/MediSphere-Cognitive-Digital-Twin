import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  protected readonly username =
    signal('');

  protected readonly password =
    signal('');

  protected readonly errorMessage =
    signal('');

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  protected login(): void {

    this.errorMessage.set('');

    if (
      !this.username().trim() ||
      !this.password().trim()
    ) {

      this.errorMessage.set(
        'Please enter username and password.'
      );

      return;
    }

    this.authService.login();

    this.router.navigate(['/']);
  }
}