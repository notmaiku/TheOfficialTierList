import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-button',
  template: `
    <a (click)="auth.loginWithRedirect()" type="submit" class="btn">
      Login
    </a>
  `,
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent {
    authenticated = false;
  userName?: string;
  constructor(public auth: AuthService, public user: UserService) {}


  login(){
    this.auth.loginWithRedirect()
  }
}
