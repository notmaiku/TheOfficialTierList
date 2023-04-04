import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-logout-button',
  template: '<button type="submit" class="btn"(click)="logout()">Log out</button>',
  styleUrls: ['./logout-button.component.css']
})
export class LogoutButtonComponent {
  constructor(@Inject(DOCUMENT) private doc: Document, public auth: AuthService) {}
  logout(): void {
    // Call this to redirect the user to the login page
    this.auth.logout({ 
      logoutParams: { 
        returnTo: this.doc.location.origin 
      }
    });
  }
}