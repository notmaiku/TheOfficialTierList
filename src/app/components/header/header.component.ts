import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Subscription } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  title = 'The Official Tier List';
  showAddTier: boolean = false;
  subscription!: Subscription;
  ngOnInit(): void { }
  constructor(private uiService: UiService, public auth: AuthService){
    this.subscription = this.uiService
    .onToggle()
    .subscribe((v)=>(this.showAddTier = v));
  }
  

  toggleAddTier(){
    this.uiService.toggleAddTier();
  }
}

