import { DatePipe } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TagsService } from 'src/app/core/services/tags.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-date-range-popup',
  templateUrl: './date-range-popup.component.html',
  styleUrls: ['./date-range-popup.component.scss'],
  providers: [DatePipe]
})
export class DateRangePopupComponent implements OnInit {
  newDateRangeForm: FormGroup;
  today = new Date();
  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;

  constructor(private tagsService: TagsService, public dialogRef: MatDialogRef<DateRangePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public datePipe: DatePipe) {
    this.newDateRangeForm = new FormGroup({
      initDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));

    if (this.data.data?.dateRange) {
      this.newDateRangeForm.controls.initDate.setValue(this.data.data.dateRange.initDate);
      this.newDateRangeForm.controls.endDate.setValue(this.data.data.dateRange.endDate);
    }
  }

  validarDate(inicio, finalq) {
    let isInvalid = false;
    if(inicio) inicio = new Date(inicio);
    if(finalq) finalq = new Date(finalq)

    if(inicio && finalq){
      inicio = new Date(inicio);
      finalq = new Date(finalq);
      isInvalid = finalq <= inicio;
    }
    return isInvalid;
}

  getTags(tags: Tag[]) {
    this.tag1 = tags.find(tag => tag.description === 'programarcuotas.stepper2.popup.tag1')?.value;
    this.tag2 = tags.find(tag => tag.description === 'programarcuotas.stepper2.popup.tag2')?.value;
    this.tag3 = tags.find(tag => tag.description === 'programarcuotas.stepper2.popup.tag3')?.value;
    this.tag4 = tags.find(tag => tag.description === 'programarcuotas.stepper2.popup.tag4')?.value;
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
