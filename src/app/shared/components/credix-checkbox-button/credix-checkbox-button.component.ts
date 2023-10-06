import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-checkbox-button',
  templateUrl: './credix-checkbox-button.component.html',
  styleUrls: ['./credix-checkbox-button.component.scss']
})
export class CredixCheckboxButtonComponent implements OnInit {
  @Input() label = '';
  @Input() checked: boolean;
  @Input() value;
  @Input() disable: boolean;
  @Output() emitCheckBox = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  isCheckedValue(event) {
    this.checked = event.checked;
    console.log(event.checked);
    this.emitCheckBox.emit({checked: event.checked, value: event.source.value});
  }
}
