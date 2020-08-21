import {
  AfterViewInit,
  Component,
  ContentChildren,
  forwardRef,
  HostListener,
  Injector,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges
} from '@angular/core';
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
export class CredixSelectComponent implements OnInit, AfterViewInit, OnChanges, ControlValueAccessor {
  @Input() label: string;
  @Input() focusLabel: string;
  @Input() panelClass = '';
  @Input() disabled = false;
  @ContentChildren(MatOption) queryOptions: QueryList<MatOption>;
  options: any[];
  viewLabel: string;
  ngControl;
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

  constructor(public injector: Injector) {
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl);
  }

  ngAfterViewInit(): void {
    this.setOptions();

    this.queryOptions.changes.subscribe(() => {
      this.setOptions();
    });
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
    this.viewLabel = this.value != null && this.focusLabel ? this.focusLabel : this.label;
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
