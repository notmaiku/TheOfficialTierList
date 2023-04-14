import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent {
  @Input() submitStatus: String = '#C7C7C7';
  @Output() onClickedSubmit: EventEmitter<any> = new EventEmitter();
  clicked(){
    this.onClickedSubmit.emit();
  }
}
