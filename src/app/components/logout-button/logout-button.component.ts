import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout-button',
  template: '<a type="submit"  (click)="logout()">Log out</a>',
  styleUrls: ['./logout-button.component.css'],
})
export class LogoutButtonComponent {
  constructor(
    @Inject(DOCUMENT) private doc: Document,
    public auth: AuthService,
    private user: UserService
  ) {}
  logout(): void {
    localStorage.removeItem('user_local');
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    });
  }
}
