import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-date-range-popup',
  templateUrl: './date-range-popup.component.html',
  styleUrls: ['./date-range-popup.component.scss'],
  providers: [DatePipe]
})
export class DateRangePopupComponent implements OnInit {
  newDateRangeForm: FormGroup;
  today = new Date();

  constructor(public dialogRef: MatDialogRef<DateRangePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public datePipe: DatePipe) {
    this.newDateRangeForm = new FormGroup({
      initDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null)
    });
  }

  ngOnInit(): void {

    if (this.data.data?.dateRange) {
      this.newDateRangeForm.controls.initDate.setValue(this.data.data.dateRange.initDate);
      this.newDateRangeForm.controls.endDate.setValue(this.data.data.dateRange.endDate);
    }
  }

  submit() {
    if (this.newDateRangeForm.valid) {
      this.dialogRef.close({
        initDate: this.newDateRangeForm.controls.initDate.value,
        endDate: this.newDateRangeForm.controls.endDate.value,
      } as any);
    }
  }
}
