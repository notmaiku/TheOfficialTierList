import { Injectable } from '@angular/core';
import { User } from '../User';
import { BehaviorSubject, Observable,  of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  emptyUser: User = {
    loggedIn: false,
    userId: '',
    picture: '',
    name: '',
  };
  userLocal: User;
  private source = new BehaviorSubject<User>(this.emptyUser);
  private _delete = new BehaviorSubject<Number>(0);
  castDelete = this._delete.asObservable();
  data$ = this.source.asObservable();
  loggedIn = true;
  constructor() {
    this.userLocal = JSON.parse(
      localStorage.getItem('user_local') || JSON.stringify(this.emptyUser)
    );
    if (this.userLocal) this.source.next(this.userLocal);
  }
  getUserInfo(): Observable<User> {
    return this.data$;
  }
  getLoggedIn(): Observable<Boolean> {
    return of((Boolean(this.userLocal.loggedIn)));
  }
  next(user: User) {
    if (!user) this.source.next(this.userLocal);
    if (user) this.source.next(user);
  }
  delTrigger(listId: Number){
    this._delete.next(listId);
  }
}
