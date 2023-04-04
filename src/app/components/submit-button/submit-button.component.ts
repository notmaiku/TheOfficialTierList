import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent {
  @Output() onClickedSubmit: EventEmitter<any> = new EventEmitter();
  @Input() submitStatus: String = '#C7C7C7';

  clicked(){
    this.onClickedSubmit.emit();
  }
}
