import {AfterViewInit, Component, ContentChildren, forwardRef, Injector, Input, OnInit, QueryList} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {MatOption} from '@angular/material/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-select',
  templateUrl: './credix-select.component.html',
  styleUrls: ['./credix-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CredixSelectComponent),
      multi: true
    }
  ]
})
export class CredixSelectComponent implements OnInit, AfterViewInit, ControlValueAccessor {
  @Input() label: string;
  @Input() panelClass = '';
  @Input() disabled = false;
  @ContentChildren(MatOption) queryOptions: QueryList<MatOption>;
  options: any[];
  ngControl;

  constructor(public injector: Injector) {
  }

  // tslint:disable-next-line:variable-name
  private _value: any;

  get value() {
    return this._value;
  }

  set value(value) {
    if (value != null) {
      this._value = value;
      this.propagateChange(this._value);
    }
  }

  ngAfterViewInit(): void {
    this.setOptions();

    this.queryOptions.changes.subscribe(() => {
      this.setOptions();
    });
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  setOptions() {
    setTimeout(() => this.options = this.queryOptions.toArray().map(option => ({value: option.value, viewValue: option.viewValue})),
      0);
  }

  onSelect(event) {
    this.value = event.value;
  }

  onTouch() {
    this.propagateTouch();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  propagateChange = (_: any) => {
  };

  propagateTouch = () => {
  };
}
