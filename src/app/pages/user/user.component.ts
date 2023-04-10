import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, AuthState } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  isAuthenticated = false;
  userId: string | null = localStorage.getItem('uid');
  private userSub?: Subscription;
  user$ = this.user.data$.pipe();

  constructor(private authService: AuthService, public user: UserService) {}

  ngOnInit(): void {}
}
