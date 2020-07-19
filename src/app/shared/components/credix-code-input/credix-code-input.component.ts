import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-code-input',
  templateUrl: './credix-code-input.component.html',
  styleUrls: ['./credix-code-input.component.scss']
})
export class CredixCodeInputComponent implements OnInit, OnChanges {
  @Input() codeFormControl: FormControl;
  @Input() length = 6;
  @Input() errorMessage = 'Mensaje de error aquí';
  @Output() codeFormControlChange: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.codeFormControl) {
      this.codeFormControl.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    }
  }

}
