import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent {
  @Input() listId!: Number;
  @Input() float!: string;
  
  constructor(private userS: UserService){}
  clicked(){
    this.userS.delTrigger(this.listId);
  }
}
