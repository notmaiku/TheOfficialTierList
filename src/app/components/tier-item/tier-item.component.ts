import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tier } from 'src/app/Tier';
import { faTimes} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-tier-item',
  templateUrl: './tier-item.component.html',
  styleUrls: ['./tier-item.component.css']
})
export class TierItemComponent implements OnInit{
  @Input() tier!: Tier;
  @Output() onDeleteTier: EventEmitter<Tier> = new EventEmitter;
  @Output() onToggleReminder: EventEmitter<Tier> = new EventEmitter;
  faTimes = faTimes;
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(Tier: Tier){
    this.onDeleteTier.emit(Tier);
  }
  onToggle(Tier: Tier){
    this.onToggleReminder.emit(Tier);
  }
}





