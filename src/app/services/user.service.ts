import { Injectable } from '@angular/core';
import { User } from '../User';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private source = new BehaviorSubject<User>({
    loggedin: false,
    userid: '',
    picture: '',
    name: '',
  });
  data$ = this.source.asObservable();
  loggedIn = true;

  dd: any;
  constructor() {
    if (localStorage.getItem('loggedin'))
      this.source.next({
        loggedin: Boolean(localStorage.getItem('loggedin')),
        userid: String(localStorage.getItem('uid')),
        name: String(localStorage.getItem('username')),
        picture: String(localStorage.getItem('picture')),
      });
  }
  getUserInfo(): Observable<User> {
    return this.data$;
  }
  getLoggedIn(): Observable<Boolean> {
    return of(Boolean(localStorage.getItem('loggedin'))) || of(this.loggedIn);
  }
  next(user: User) {
    if (!user)
      this.source.next({
        loggedin: Boolean(localStorage.getItem('loggedin')),
        userid: String(localStorage.getItem('uid')),
        name: String(localStorage.getItem('username')),
        picture: String(localStorage.getItem('picture')),
      });
    if (user) this.source.next(user);
  }
}
