import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-button',
  templateUrl: './credix-button.component.html',
  styleUrls: ['./credix-button.component.scss']
})
export class CredixButtonComponent implements OnInit {
  @Input() type: 'primary' | 'secondary' = 'primary';
  @Input() disabled = false;
  @Input() text = '';
  @Input() route = '';
  @Output() buttonClick = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

}
