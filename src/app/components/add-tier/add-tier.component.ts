import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Tier } from 'src/app/Tier';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-tier',
  templateUrl: './add-tier.component.html',
  styleUrls: ['./add-tier.component.css']
})
export class AddTierComponent implements OnInit{
  @Output() onAddTier: EventEmitter<Tier> = new EventEmitter;
  text: string;
  tier: string;
  showNewTier?: boolean;
  subscription?: Subscription;

  constructor(private uiService: UiService){
    this.text = '';
    this.tier = '';
    this.subscription = this.uiService
    .onToggle()
    .subscribe((v)=>(this.onAddTier = v));
  }
  
  ngOnInit(): void{}

  onSubmit(){
    if(!this.text) {
      alert("Please add a tier") 
      return
    }

    const newTier = {
      text: this.text,
      tier: this.tier,
    };

    this.onAddTier.emit(newTier);

    this.text = '';
    this.tier = '';
  }
}

