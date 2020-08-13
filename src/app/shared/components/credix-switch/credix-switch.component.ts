import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-switch',
  templateUrl: './credix-switch.component.html',
  styleUrls: ['./credix-switch.component.scss']
})
export class CredixSwitchComponent implements OnInit {
  @Input() onLabel: Switch;
  @Input() offLabel: Switch;
  @Input() disabled = false;
  @Output() selectionEvent: EventEmitter<Switch> = new EventEmitter<Switch>();
  option = 'off';
  active: Switch;

  constructor() {
    this.active = this.offLabel;
  }

  ngOnInit(): void {
  }

  isOptionSelected(option: 'off' | 'on') {
    this.option = option;
    this.active = option === 'off' ? this.offLabel : this.onLabel;
    this.selectionEvent.emit(this.active);
  }

}

interface Switch {
  id: number;
  name: string;
}
