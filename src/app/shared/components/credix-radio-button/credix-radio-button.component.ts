import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-radio-button',
  templateUrl: './credix-radio-button.component.html',
  styleUrls: ['./credix-radio-button.component.scss']
})
export class CredixRadioButtonComponent implements OnInit {
  @Input() label = 'Etiqueta';
  @Input() value: any;
  @Input() name: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Output() emitRadioButton = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {

    console.log("value: ", this.value, this.checked);
  }

  isCheckedValue(event) {
    this.emitRadioButton.emit({value: event.value, checked: event.source.checked});
  }
}
