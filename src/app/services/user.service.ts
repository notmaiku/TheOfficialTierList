import { Injectable, signal } from '@angular/core';
import { User } from '../User';
import { BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private source = new BehaviorSubject<User>({
    loggedIn: false,
    userId: '',
    picture: '',
    name: '',
  });
  data$ = this.source.asObservable();
  loggedIn = true;
  dd: any;
  #user = signal<User>();
  constructor() {
    if (localStorage.getItem('loggedin'))
      this.source.next({
        loggedIn: Boolean(localStorage.getItem('loggedin')),
        userId: String(localStorage.getItem('uid')),
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
        loggedIn: Boolean(localStorage.getItem('loggedin')),
        userId: String(localStorage.getItem('uid')),
        name: String(localStorage.getItem('username')),
        picture: String(localStorage.getItem('picture')),
      });
    if (user) this.source.next(user);
  }
}
