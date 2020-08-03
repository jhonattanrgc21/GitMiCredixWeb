import {Component,EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-checkbox-button',
  templateUrl: './credix-checkbox-button.component.html',
  styleUrls: ['./credix-checkbox-button.component.scss']
})
export class CredixCheckboxButtonComponent implements OnInit {
  @Input() label = 'Etiqueta';
  @Input() checked: boolean;
  @Input() value;
  @Input() disable: boolean;
  @Output() isChecked = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  isCheckedValue(event, eventType: boolean){
    this.checked = eventType ? event : event.checked;
    this.isChecked.emit(this.checked);
  }
}
