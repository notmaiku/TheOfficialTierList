import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { List } from 'src/app/List';
import { User } from 'src/app/User';
import { ListService } from 'src/app/services/list.service';
import { TierService } from 'src/app/services/tier.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnDestroy {
  isAuthenticated = false;
  lists!: List[];
  userData: User = JSON.parse(localStorage.getItem('user_local') || '');
  userId: string = this.userData.userId.split('|')[1];
  private userSub: Subscription;
  private listSub!: Subscription;
  private tierSub!: Subscription;
  private delSub!: Subscription;
  user$ = this.user.data$.pipe();
  list$ = this.listS.getLists(false, this.unwrap(this.userId)).pipe();
  title!: String;
  constructor(
    private user: UserService,
    private listS: ListService,
    private tierS: TierService
  ) {
    this.userSub = this.listS
      .getLists(false, this.unwrap(this.userId))
      .subscribe((data) => {
        this.lists = data;
      });
    this.delSub = this.user.castDelete.subscribe((listId) => {
      this.listSub = this.listS.deleteLists(listId).subscribe();
      this.tierSub = this.tierS.deleteTiers(String(listId)).subscribe();
    });
  }
  unwrap(val: any): any {
    return val ? val : 'undefined';
  }
  ngOnDestroy(): void {
    if (this.tierSub) this.userSub.unsubscribe();
    if (this.listSub) this.listSub.unsubscribe();
    if (this.delSub) this.delSub.unsubscribe();
  }
}
