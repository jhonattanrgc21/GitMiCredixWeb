import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-code-input',
  templateUrl: './credix-code-input.component.html',
  styleUrls: ['./credix-code-input.component.scss']
})
export class CredixCodeInputComponent implements OnInit {
  @Input() codeFormControl: FormControl;
  @Input() length = 6;
  @Input() errorMessage = 'Mensaje de error aquí';
  @Output() codeFormControlChange: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
