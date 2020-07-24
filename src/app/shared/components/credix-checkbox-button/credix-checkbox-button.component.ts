import {Component, Input, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
