import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loggedIn =
    signal(
      localStorage.getItem('medisphere_logged_in') === 'true'
    );

  isLoggedIn(): boolean {
    return this.loggedIn();
  }

  login(): void {
    localStorage.setItem(
      'medisphere_logged_in',
      'true'
    );

    this.loggedIn.set(true);
  }

  logout(): void {
    localStorage.removeItem(
      'medisphere_logged_in'
    );

    this.loggedIn.set(false);
  }
}