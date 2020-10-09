import {Component, forwardRef, Injector, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-code-input',
  templateUrl: './credix-code-input.component.html',
  styleUrls: ['./credix-code-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CredixCodeInputComponent),
      multi: true
    }
  ]
})
export class CredixCodeInputComponent implements OnInit, ControlValueAccessor {
  control: FormControl = new FormControl();
  ngControl;

  constructor(public injector: Injector) {
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    this.control.valueChanges.subscribe(value => this.propagateChange(value));
  }

  onTouch() {
    this.propagateTouch();
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  propagateChange = (_: any) => {
  };

  propagateTouch = () => {
  };

}
