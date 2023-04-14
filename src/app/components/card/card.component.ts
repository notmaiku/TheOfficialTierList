import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() listId!: Number;
  @Input() title!: String;
  deleted: boolean = false;
  makeDeleted(){
    this.deleted = true;
  }
  
}