import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tier } from 'src/app/Tier';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-tier',
  templateUrl: './add-tier.component.html',
  styleUrls: ['./add-tier.component.css']
})
export class AddTierComponent{

  constructor(private uiService: UiService){
  }
  
}

