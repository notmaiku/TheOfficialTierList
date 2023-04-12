import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService, AuthState } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { List } from 'src/app/List';
import { ListService } from 'src/app/services/list.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnDestroy {
  isAuthenticated = false;
  private subscription: Subscription;
  lists!: List[];
  userId: string | null = this.unwrap(localStorage.getItem('uid')?.split("|")[1]);
  private userSub?: Subscription;
  user$ = this.user.data$.pipe();
  list$ = this.list.getLists(false, this.unwrap(this.userId)).pipe();
  title!: String;

  constructor(private authService: AuthService, public user: UserService, private list: ListService) {
    this.subscription = this.list.getLists(false, this.unwrap(this.userId)).subscribe(
      (data) => {this.lists = data}
    );
  }

  ngOnInit(): void {
    
  }

  unwrap(val: any): any {
    return val ? val : 'undefined';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}