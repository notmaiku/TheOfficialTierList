import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, IdToken } from '@auth0/auth0-angular';
import { stringify } from 'querystring';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  constructor() {}


}
