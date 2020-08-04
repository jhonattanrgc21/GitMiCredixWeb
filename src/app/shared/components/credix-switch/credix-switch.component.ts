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

  constructor() {
  }

  ngOnInit(): void {
  }

  isOptionSelected(option: 'off' | 'on') {
    this.option = option;
    this.selectionEvent.emit(option === 'off' ? this.offLabel : this.onLabel);
  }

}

interface Switch {
  id: number;
  name: string;
}
