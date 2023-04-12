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
  title: string;
  tier: string;
  column: number;
  user_id: string;
  list_id: string;
  showNewTier?: boolean;
  subscription?: Subscription;

  constructor(private uiService: UiService){
    this.title = '';
    this.tier = '';
    this.column = 0; 
    this.user_id = '';
    this.list_id = '';
    this.subscription = this.uiService
    .onToggle()
    .subscribe((v)=>(this.onAddTier = v));
  }
  
  ngOnInit(): void{}

  onSubmit(){
    if(!this.title) {
      alert("Please add a tier") 
      return
    }

    const newTier = {
      title: this.title,
      tier: this.tier,
      column: this.column,
      user_id: this.user_id,
      list_id: this.list_id
    };

    this.onAddTier.emit(newTier);

    this.title = '';
    this.tier = '';
  }
}

