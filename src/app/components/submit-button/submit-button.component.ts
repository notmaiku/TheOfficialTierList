import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent {
  @Output() onClickedSubmit: EventEmitter<any> = new EventEmitter();

  clicked(){
    this.onClickedSubmit.emit();
  }
}
