import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
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
  
  toggleAddTier(){
    this.uiService.toggleAddTier();
  }
}

