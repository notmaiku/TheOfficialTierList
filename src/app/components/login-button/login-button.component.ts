import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  template: `
    <button (click)="auth.loginWithRedirect()" type="submit" class="btn">
      Login
    </button>
  `,
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent {
  constructor(public auth: AuthService) {}
}
