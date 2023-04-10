import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { AuthService, User } from '@auth0/auth0-angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  title = 'The Official Tier List';
  showAddTier: boolean = false;
  subscription!: Subscription;
  userStream$ = this.user.getUserInfo();
  userPipe$ = this.userStream$.pipe() 
  data: any;
  ngOnInit(): void { 
  }
  constructor(private uiService: UiService, public auth: AuthService, public user: UserService){
    this.subscription = this.uiService
    .onToggle()
    .subscribe((v)=>(this.showAddTier = v));
    user.getUserInfo().subscribe(d => {
      this.data = d
    })
  }
  
  // getUserInfo(){
  //   this.userP = String(localStorage.getItem('picture'));
  //   this.userI = String(localStorage.getItem('uid'));
  //   this.userN = String(localStorage.getItem('username'));
  //   if(localStorage.getItem('uid')) return true;
  //   return false;
  // }

  toggleAddTier(){
    this.uiService.toggleAddTier();
  }
}

