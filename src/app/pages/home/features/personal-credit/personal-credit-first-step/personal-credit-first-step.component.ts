import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ModalService} from '../../../../../core/services/modal.service';
import {PersonalCreditService} from '../personal-credit.service';
import {PersonalCreditSummary} from '../../../../../shared/models/personal-credit-summary';
import {ConvertStringAmountToNumber} from '../../../../../shared/utils';
import {finalize} from 'rxjs/operators';
import {Quota} from '../../../../../shared/models/quota';
import {CustomerApiService} from '../../../../../core/services/customer-api.service';

const MIN_AMOUNT = 100000;
const CENTER_AMOUNT = 300000;
const MAX_AMOUNT = 1000000;
const FIRST_STEP = 10000;
const SECOND_STEP = 50000;
const THIRD_STEP = 100000;

@Component({
  selector: 'app-personal-credit-first-step',
  templateUrl: './personal-credit-first-step.component.html',
  styleUrls: ['./personal-credit-first-step.component.scss']
})
export class PersonalCreditFirstStepComponent implements OnInit, OnChanges {
  @Input() amountControl: FormControl = new FormControl(MIN_AMOUNT);
  @Input() termControl: FormControl = new FormControl(null);
  @Input() cardLimit = 0;
  @ViewChild('summaryTemplate') summaryTemplate: TemplateRef<any>;
  personalCreditSummary: PersonalCreditSummary;
  personalCreditsSummaries: PersonalCreditSummary[];
  ivaAmount = 0;
  quotas: Quota[] = [];
  amountSliderStep = 1;
  amountSliderMin = 0;
  amountSliderMax = 1;
  termSliderStep = 1;
  termSliderMin = 3;
  termSliderMax = 12;
  termSliderDisplayMin = 1;
  termSliderDisplayMax = 12;
  termSliderDisplayValue = 0;

  constructor(private modalService: ModalService,
              private personalCreditService: PersonalCreditService,
              private customerApiServices: CustomerApiService) {
  }

  ngOnInit(): void {
    this.getQuotas();
    this.personalCreditService.amount = MIN_AMOUNT;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cardLimit) {
      if (this.cardLimit >= MIN_AMOUNT && this.cardLimit < CENTER_AMOUNT) {
        this.amountSliderMax = Math.trunc(this.cardLimit / FIRST_STEP);
      } else if (this.cardLimit >= CENTER_AMOUNT && this.cardLimit < MAX_AMOUNT) {
        this.amountSliderMax = 20 + Math.trunc((this.cardLimit - CENTER_AMOUNT) / SECOND_STEP);
      } else {
        this.amountSliderMax = 20 + 14 + Math.trunc((this.cardLimit - MAX_AMOUNT) / THIRD_STEP);
      }
    }
  }

  getPersonalCreditsSummaries() {
    this.personalCreditService.getPersonalCreditsSummaries(this.amountControl.value, 2)
      .pipe(finalize(() => this.selectPersonalCreditSummary()))
      .subscribe(response => this.personalCreditsSummaries = response);
  }

  selectPersonalCreditSummary() {
    this.personalCreditSummary = this.personalCreditsSummaries.find(value => value.term === this.termControl.value);
    this.ivaAmount = Number((ConvertStringAmountToNumber(this.personalCreditSummary.commission) * 0.13).toFixed(2));
    this.personalCreditService.personalCreditSummary = this.personalCreditSummary;
  }

  getQuotas() {
    this.customerApiServices.getQuotas(1)
      .pipe(finalize(() => this.getPersonalCreditsSummaries()))
      .subscribe(response => {
        this.quotas = response.sort((a, b) => a.quota - b.quota);
        this.termSliderDisplayMin = this.quotas[0].quota;
        this.termSliderMin = 1;
        this.termSliderDisplayMax = this.quotas[this.quotas.length - 1].quota;
        this.termSliderMax = this.quotas.length;
        this.termSliderDisplayValue = this.termSliderDisplayMin;
        this.termControl.setValue(this.termSliderDisplayValue);
      });
  }

  getAmount(sliderValue) {
    let amount: number;

    if (sliderValue <= 20) {
      amount = MIN_AMOUNT + (sliderValue * FIRST_STEP);
    } else if (sliderValue > 20 && sliderValue <= 34) {
      amount = CENTER_AMOUNT + (SECOND_STEP * (sliderValue - 20));
    } else {
      amount = MAX_AMOUNT + (THIRD_STEP * (sliderValue - 34));
    }

    this.amountControl.setValue(amount);
    this.personalCreditService.amount = amount;
    this.getPersonalCreditsSummaries();
  }

  getQuota(sliderValue) {
    this.termSliderDisplayValue = this.quotas[sliderValue - 1].quota;
    this.termControl.setValue(this.termSliderDisplayValue);
    this.selectPersonalCreditSummary();
  }

  openSummary() {
    this.modalService.open({template: this.summaryTemplate, title: 'Resumen general'},
      {width: 380, height: 467, disableClose: true, panelClass: 'summary-panel'});
  }
}
