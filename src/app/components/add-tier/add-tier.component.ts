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
  text: string;;
  day: string;
  reminder: boolean = false;
  showAddTier?: boolean;
  subscription?: Subscription;

  constructor(private uiService: UiService){
    this.text = '';
    this.day = '';
    this.subscription = this.uiService
    .onToggle()
    .subscribe((v)=>(this.showAddTier = v));
  }
  
  ngOnInit(): void{}

  onSubmit(){
    if(!this.text) {
      alert("Please add a tier") 
      return
    }

    const newTier = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    };

    this.onAddTier.emit(newTier);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}

