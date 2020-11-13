import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ModalService} from '../../../core/services/modal.service';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-date-picker',
  templateUrl: './credix-date-picker.component.html',
  styleUrls: ['./credix-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CredixDatePickerComponent),
      multi: true
    }
  ]
})
export class CredixDatePickerComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() startDate: Date = new Date(1900, 1, 1);
  @Input() endDate: Date = new Date(2999, 1, 1);
  modal: MatDialogRef<any>;
  isOpen = false;
  control = new FormControl(null);

  constructor(private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(value => this.propagateChange(value));
  }

  openCalendar() {
    this.modalService.openCalendarPopup(this.startDate, this.endDate).subscribe(modal => {
      if (modal) {
        this.control.setValue(modal.date);
        this.isOpen = false;
      }
    });
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
