import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() listId!: number;
  @Input() title!: String;
  deleted: boolean = false;
  makeDeleted(){
    this.deleted = true;
  }

}
