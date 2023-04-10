import { Component, OnDestroy } from '@angular/core';
import { User } from '@auth0/auth0-spa-js';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent implements OnDestroy {
  userData!: User;
  private subscription: Subscription;
  constructor(public user: UserService) {
    this.subscription = this.user.data$.subscribe(
      (data) => (this.userData = data)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  validateAndSubmit(){
    
  }
}
