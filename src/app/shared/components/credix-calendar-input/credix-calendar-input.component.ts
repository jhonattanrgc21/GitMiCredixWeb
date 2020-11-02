import {Component, forwardRef, HostListener, Injector, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-calendar-input',
  templateUrl: './credix-calendar-input.component.html',
  styleUrls: ['./credix-calendar-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CredixCalendarInputComponent),
      multi: true
    }
  ]
})
export class CredixCalendarInputComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() label: string;
  @Input() focusLabel: string;
  @Input() readonly = false;
  control = new FormControl(null);
  viewLabel: string;
  ngControl;

  constructor(public injector: Injector) {
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
    this.control.valueChanges.subscribe(value => this.propagateChange(value));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.label) {
      this.viewLabel = this.label;
    }
  }

  @HostListener('focusin') onFocusIn() {
    this.viewLabel = this.focusLabel || this.label;
  }

  @HostListener('focusout') onFocusOut() {
    this.viewLabel = this.control.value && this.focusLabel ? this.focusLabel : this.label;
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
