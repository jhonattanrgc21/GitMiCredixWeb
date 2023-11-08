import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { DateRangePopupComponent } from './date-range-popup/date-range-popup.component';
import { Tag } from 'src/app/shared/models/tag';
import {ExtendTermRuleQuota} from '../../../../../shared/models/extend-term-rule-quota';
import { ScheduleQuotasService } from '../schedule-quotas.service';


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


  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: string;
  tag6: string;
  tag7: string;
  tag8: string;
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

// Sliders values
  colonesSlider = {
    quotaSliderDisplayMax: 3,
    quotaSliderDisplayMin: 1,
    quotaSliderMax: 3,
    quotaSliderMin: 1,
    quotaSliderStep: 1,
    quotaSliderDisplayValue: 1
  }
  dollarsSlider = {
    quotaSliderDisplayMax: 3,
    quotaSliderDisplayMin: 1,
    quotaSliderMax: 3,
    quotaSliderMin: 1,
    quotaSliderStep: 1,
    quotaSliderDisplayValue: 1
  }
  colonesQuotas: ExtendTermRuleQuota[];
  colonesSelected: ExtendTermRuleQuota;
  colonesCommission: string;
  colonesFee: string;

  dollarsQuotas: ExtendTermRuleQuota[];
  dollarsSelected: ExtendTermRuleQuota;
  dollarsCommission: string;
  dollarsFee: string;

  error: boolean = false;

  constructor(private scheduleQuotasService: ScheduleQuotasService,
    private modalService: ModalService,
    private tagsService: TagsService) {
    this.colonesForm =  new FormGroup({
      minimumAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
      maximumAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
      quotas: new FormControl(null, Validators.required),
      commissions: new FormControl(null, Validators.required),
      interest: new FormControl(null, Validators.required),
      initDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null),
    })

    this.dollarsForm =  new FormGroup({
      minimumAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
      maximumAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
      quotas: new FormControl(null, Validators.required),
      commissions: new FormControl(null, Validators.required),
      interest: new FormControl(null, Validators.required),
      initDate: new FormControl(null, Validators.required),
      endDate: new FormControl(null),
    })

    this.addValidationToForm(this.colonesForm, this.isColones);
    this.addValidationToForm(this.dollarsForm, this.isDollars);
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
    this.getRuleQuotas();
  }

  isAmountsValid(form: FormGroup): boolean{
    return !form.get('minimumAmount').hasError('required') && !form.get('minimumAmount').hasError('min') && !form.get('maximumAmount').hasError('required') &&  !form.get('maximumAmount').hasError('min')
  }

  addValidationToForm(form: FormGroup, isActive: boolean){
    if(isActive){
      form.get('minimumAmount').setValidators( [Validators.required, Validators.min(1)]);
      form.get('maximumAmount').setValidators([Validators.required, Validators.min(1)]);
      form.get('quotas').setValidators(Validators.required);
      form.get('commissions').setValidators(Validators.required);
      form.get('interest').setValidators(Validators.required);
      form.get('initDate').setValidators(Validators.required);
    }
    else{
      form.get('minimumAmount').clearValidators();
      form.get('maximumAmount').clearValidators();
      form.get('quotas').clearValidators();
      form.get('commissions').clearValidators();
      form.get('interest').clearValidators();
      form.get('initDate').clearValidators();
    }
  }

  openDateRangeModal(form: FormGroup,  dateRange: any) {
    this.modalService.open({
      component: DateRangePopupComponent,
      hideCloseButton: false,
      title: this.tag6 || 'Definir fechas',
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

  getRuleQuotas(){
    this.scheduleQuotasService.getRuleQuotaList()
    .subscribe(res => {
      if (res) {
        this.error = false;
        this.colonesQuotas = res?.colones;
        this.dollarsQuotas = res?.dolares;
        this.initSlider()
      } else {
        this.error = true;
      }
    });
  }

  initSlider() {


      this.colonesSlider.quotaSliderStep = 1;
      this.colonesSlider.quotaSliderDisplayMin = this.colonesQuotas[0].quotaTo;
      this.colonesSlider.quotaSliderMin = 1;
      this.colonesSlider.quotaSliderDisplayMax = this.colonesQuotas[this.colonesQuotas.length - 1].quotaTo;
      this.colonesSlider.quotaSliderMax = this.colonesQuotas.length;
      this.colonesSlider.quotaSliderDisplayValue = this.colonesSlider.quotaSliderDisplayMin;

      this.getQuota(1,188)



      this.dollarsSlider.quotaSliderStep = 1;
      this.dollarsSlider.quotaSliderDisplayMin = this.dollarsQuotas[0].quotaTo;
      this.dollarsSlider.quotaSliderMin = 1;
      this.dollarsSlider.quotaSliderDisplayMax = this.dollarsQuotas[this.dollarsQuotas.length - 1].quotaTo;
      this.dollarsSlider.quotaSliderMax = this.dollarsQuotas.length;
      this.dollarsSlider.quotaSliderDisplayValue = this.dollarsSlider.quotaSliderDisplayMin;

      this.getQuota(1,840)


  }


  getQuota(sliderValue, currency: number){
    if(currency == 188){
      this.colonesSlider.quotaSliderDisplayValue = this.colonesQuotas[sliderValue - 1].quotaTo;
      this.colonesSelected = this.colonesQuotas[sliderValue - 1];
      this.colonesFee = this.formatNumber(this.colonesSelected.feePercentage);
      this.colonesCommission = this.formatNumber(this.colonesSelected.commissionRate)
      this.colonesForm.get("quotas").setValue(this.colonesSelected.quotaTo)
      this.colonesForm.get("commissions").setValue(this.colonesCommission)
      this.colonesForm.get("interest").setValue(this.colonesFee)
    }

    if(currency == 840){
      this.dollarsSlider.quotaSliderDisplayValue = this.dollarsQuotas[sliderValue - 1].quotaTo;
      this.dollarsSelected = this.dollarsQuotas[sliderValue - 1];
      this.dollarsFee = this.formatNumber(this.dollarsSelected.feePercentage);
      this.dollarsCommission = this.formatNumber(this.dollarsSelected.commissionRate)
      this.dollarsForm.get("quotas").setValue(this.dollarsSelected.quotaTo)
      this.dollarsForm.get("commissions").setValue(this.dollarsCommission)
      this.dollarsForm.get("interest").setValue(this.dollarsFee)
    }


  }

  formatNumber(value: string): string {
    value = value.replace(/,/g, '.');
    const number = parseFloat(value);
    const result = number === 0.0 ? number.toFixed(0) : number.toString();
    return result.replace('.', ',');
  }

  getTags(tags: Tag[]) {
    this.tag1 = tags.find(tag => tag.description === 'programarcuotas.stepper2.tag1')?.value;
    this.tag2 = tags.find(tag => tag.description === 'programarcuotas.stepper2.tag2')?.value;
    this.tag3 = tags.find(tag => tag.description === 'programarcuotas.stepper2.tag3')?.value;
    this.tag4 = tags.find(tag => tag.description === 'programarcuotas.stepper2.tag4')?.value;
    this.tag5 = tags.find(tag => tag.description === 'programarcuotas.stepper2.tag5')?.value;
    this.tag6 = tags.find(tag => tag.description === 'programarcuotas.stepper2.tag6')?.value;
    this.tag7 = tags.find(tag => tag.description === 'programarcuotas.stepper2.tag7')?.value;
    this.tag8 = tags.find(tag => tag.description === 'programarcuotas.stepper2.tag8')?.value;
  }
}
