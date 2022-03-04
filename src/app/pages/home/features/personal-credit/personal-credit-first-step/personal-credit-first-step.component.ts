import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ModalService} from '../../../../../core/services/modal.service';
import {PersonalCreditService} from '../personal-credit.service';
import {PersonalCreditSummary} from '../../../../../shared/models/personal-credit-summary';
import {ConvertStringAmountToNumber} from '../../../../../shared/utils';
import {finalize} from 'rxjs/operators';
import {Quota} from '../../../../../shared/models/quota';
import {CustomerApiService} from '../../../../../core/services/customer-api.service';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

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
  quoteTag: string;
  termTag: string;
  amountTag: string;
  subtitleAmountTag: string;
  monthTag: string;
  popupAmountTag: string;
  popupTitleTag: string;
  popupIvaTag: string;
  popupSecureTag: string;
  popupInterestTag: string;
  popupCommissionTag: string;
  popupDisclaimerTag: string;
  popupTotalTag: string;
  @ViewChild('summaryTemplate') summaryTemplate: TemplateRef<any>;
  personalCreditSummary: PersonalCreditSummary;
  personalCreditsSummaries: PersonalCreditSummary[];
  ivaAmount = 0;
  quotas: Quota[] = [];
  amountSliderStep = 1;
  amountSliderMin = 0;
  amountSliderMax = 0;
  termSliderStep = 1;
  termSliderMin = 3;
  termSliderMax = 12;
  termSliderDisplayMin = 1;
  termSliderDisplayMax = 12;
  termSliderDisplayValue = 0;

  constructor(private modalService: ModalService,
              private personalCreditService: PersonalCreditService,
              private tagsService: TagsService,
              private customerApiServices: CustomerApiService) {
  }

  ngOnInit(): void {
    this.getQuotas();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Crédito personal').tags)
    );
    this.personalCreditService.amount = MIN_AMOUNT;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cardLimit) {
      if (this.cardLimit >= MIN_AMOUNT && this.cardLimit < CENTER_AMOUNT) {
          this.amountSliderMax = Math.trunc((this.cardLimit - MIN_AMOUNT) / FIRST_STEP) +1 ;
          if(this.cardLimit == MIN_AMOUNT){
            this.amountSliderMax--;
            console.log('aqui');
            console.log(this.amountSliderMax );
          }
      } else if (this.cardLimit >= CENTER_AMOUNT && this.cardLimit < MAX_AMOUNT) {
        this.amountSliderMax = 20 + Math.trunc((this.cardLimit - CENTER_AMOUNT) / SECOND_STEP) +1 ;
        if(this.cardLimit == CENTER_AMOUNT){
          this.amountSliderMax--;
        }
      } else {
        this.amountSliderMax = 34 + Math.trunc((this.cardLimit - MAX_AMOUNT) / THIRD_STEP) + 1;
        if(this.cardLimit == MAX_AMOUNT){
          this.amountSliderMax--;
        }
      }
    }
  }

  getPersonalCreditsSummaries() {
    this.personalCreditService.getPersonalCreditsSummaries(this.amountControl.value, 2)
      .pipe(finalize(() => this.selectPersonalCreditSummary()))
      .subscribe(response => this.personalCreditsSummaries = response);
  }

  selectPersonalCreditSummary() {
    console.log("personalCreditSummary: ", this.personalCreditSummary);
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
    if(sliderValue === this.amountSliderMax){
      amount = this.cardLimit;
    }else if (sliderValue <= 19) {
      amount = MIN_AMOUNT + (sliderValue * FIRST_STEP);
    } else if (sliderValue >= 20 && sliderValue < 34) {
      amount = CENTER_AMOUNT + (SECOND_STEP * (sliderValue - 20));
    } else if (sliderValue >= 34) {
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
    this.modalService.open({
        template: this.summaryTemplate, title: this.popupTitleTag
        || 'Resumen general'
      },
      {width: 380, height: 467, disableClose: true, panelClass: 'summary-panel'});
  }

  getTags(tags: Tag[]) {
    this.amountTag = tags.find(tag => tag.description === 'credito.stepper1.tag.monto')?.value;
    this.subtitleAmountTag = tags.find(tag => tag.description === 'credito.stepper1.subtitle.monto')?.value;
    this.monthTag = tags.find(tag => tag.description === 'credito.stepper1.tag.meses')?.value;
    this.quoteTag = tags.find(tag => tag.description === 'credito.tag.cuotas')?.value;
    this.termTag = tags.find(tag => tag.description === 'credito.stepper1.subtitle.plazo')?.value;
    this.amountTag = tags.find(tag => tag.description === 'credito.stepper1.tag.monto')?.value;
    this.subtitleAmountTag = tags.find(tag => tag.description === 'credito.stepper1.subtitle.monto')?.value;
    this.monthTag = tags.find(tag => tag.description === 'credito.stepper1.tag.meses')?.value;
    this.quoteTag = tags.find(tag => tag.description === 'credito.tag.cuotas')?.value;
    this.popupAmountTag = tags.find(tag => tag.description === 'credito.popup.tag.monto')?.value;
    this.popupTitleTag = tags.find(tag => tag.description === 'credito.popup.title')?.value;
    this.popupIvaTag = tags.find(tag => tag.description === 'credito.popup.tagIVA')?.value;
    this.popupSecureTag = tags.find(tag => tag.description === 'credito.popup.tag.seguro')?.value;
    this.popupInterestTag = tags.find(tag => tag.description === 'credito.popup.tag.interes')?.value;
    this.popupCommissionTag = tags.find(tag => tag.description === 'credito.popup.tag.comision')?.value;
    this.popupDisclaimerTag = tags.find(tag => tag.description === 'credito.popup.tag.disclaimer')?.value;
    this.popupTotalTag = tags.find(tag => tag.description === 'credito.popup.tag.total')?.value;
  }
}
