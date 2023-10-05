import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { DateRangePopupComponent } from './date-range-popup/date-range-popup.component';

@Component({
  selector: 'app-schedule-quotas-second-step',
  templateUrl: './schedule-quotas-second-step.component.html',
  styleUrls: ['./schedule-quotas-second-step.component.scss']
})
export class ScheduleQuotasSecondStepComponent implements OnInit {
  @Input() colonesForm: FormGroup;
  @Input() dollarsForm: FormGroup;
  @Input() isColones: boolean;
  @Input() isDollars: boolean;


  comissionLabel: string;
  interestLabel: string;
  colonesDateRange = {
    initDate: null,
    endDate: null
  }

  dollarsDateRange =  {
    initDate: null,
    endDate: null
  }


  constructor(private httpService: HttpService,
    private modalService: ModalService,
    private tagsService: TagsService) {
    this.colonesForm =  new FormGroup({
      minimumAmount: new FormControl(null, Validators.required),
      maximumAmount: new FormControl(null, Validators.required),
      quotas: new FormControl(null, Validators.required),
      commissions: new FormControl(null, Validators.required),
      interest: new FormControl(null, Validators.required),
      initDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    })

    this.dollarsForm =  new FormGroup({
      minimumAmount: new FormControl(null, Validators.required),
      maximumAmount: new FormControl(null, Validators.required),
      quotas: new FormControl(null, Validators.required),
      commissions: new FormControl(null, Validators.required),
      interest: new FormControl(null, Validators.required),
      initDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null, Validators.required),
    })

    this.addValidationToForm(this.colonesForm, this.isColones);
    this.addValidationToForm(this.dollarsForm, this.isDollars);
  }

  ngOnInit(): void {
    this.comissionLabel = 'Comisión mensual';
    this.interestLabel = 'Interés mensual';
  }

  addValidationToForm(form: FormGroup, isActive: boolean){
    if(isActive){
      form.get('minimumAmount').setValidators(Validators.required);
      form.get('maximumAmount').setValidators(Validators.required);
      form.get('quotas').setValidators(Validators.required);
      form.get('commissions').setValidators(Validators.required);
      form.get('interest').setValidators(Validators.required);
      form.get('initDate').setValidators(Validators.required);
      form.get('endDate').setValidators(Validators.required);
    }
    else{
      form.get('minimumAmount').clearValidators();
      form.get('maximumAmount').clearValidators();
      form.get('quotas').clearValidators();
      form.get('commissions').clearValidators();
      form.get('interest').clearValidators();
      form.get('initDate').clearValidators();
      form.get('endDate').clearValidators();
    }
  }

  openDateRangeModal(form: FormGroup,  dateRange: any) {
    this.modalService.open({
      component: DateRangePopupComponent,
      hideCloseButton: false,
      title: 'Definir fechas',
      data: {dateRange}
    }, {width: 380, height: 361, disableClose: false, panelClass: 'schedule-quotas-dates-panel'})
      .afterClosed().subscribe((range: any) => {
      if (range) {
        form.get('initDate').setValue(range.initDate);
        form.get('endDate').setValue(range.endDate);
        dateRange.initDate = range.initDate;
        dateRange.endDate = range.endDate;
      }
    });
  }

}
