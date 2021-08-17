import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CredixCodeErrorService } from 'src/app/core/services/credix-code-error.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';
import { Quota } from 'src/app/shared/models/quota';
import { Tag } from 'src/app/shared/models/tag';
import {Keys} from '../../../../../../../shared/models/keys';
import { PublicServicesService } from '../../../public-services.service';


const MIN_AMOUNT = 100000;
const CENTER_AMOUNT = 300000;
const MAX_AMOUNT = 1000000;
const FIRST_STEP = 10000;
const SECOND_STEP = 50000;
const THIRD_STEP = 100000;

@Component({
  selector: 'app-new-recharge-third-step',
  templateUrl: './new-recharge-third-step.component.html',
  styleUrls: ['./new-recharge-third-step.component.scss']
})
export class NewRechargeThirdStepComponent implements OnInit {

  @ViewChild('summaryTemplate') summaryTemplate: TemplateRef<any>;
  @Input() termControl: FormControl = new FormControl(null);
  @Input() confirmCodeFormGroup: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required]),
  });
  @Input() amount: string;
  @Input() isActive = false;
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

  label = 'contrato';
  quotas: PaymentQuota[] = [];
  paymentQuotaSummary: PaymentQuota = null;
  amountSliderStep = 1;
  amountSliderMin = 0;
  amountSliderMax = 1;
  termSliderStep = 1;
  termSliderMin = 1;
  termSliderMax = 12;
  termSliderDisplayMin = 1;
  termSliderDisplayMax = 12;
  termSliderDisplayValue = 0;
  data: any;

  constructor(
    private modalService: ModalService,
    private credixCodeErrorService: CredixCodeErrorService,
    private publicSevice: PublicServicesService,
    private tagsService: TagsService,) {
  }

  ngOnInit(): void {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.confirmCodeFormGroup.controls.credixCode.setErrors({invalid: true});
      this.confirmCodeFormGroup.updateValueAndValidity();
    });
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Crédito personal').tags)
    );
    this.getQuotas(); 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes.isActive && this.isActive ) {
      this.getQuotas();
    }
  }

  getQuotas() {

    console.log("amount: ", this.amount);
    console.log("paymentQuotaSummary: ", this.publicSevice.paymentQuotaSummary?.quotaTo);
    this.publicSevice.getCuotaCalculator(this.amount, this.publicSevice.publicService.publicServiceId)
      .pipe(finalize(() => this.selectPaymentQuotaSummary()))
        .subscribe(
          response => {
            if ( response ) {
              this.quotas = response.listQuota.sort((a, b) => a.quotaTo - b.quotaTo);
              this.termSliderDisplayMin = this.quotas[0].quotaTo;
              this.termSliderMin = 1;
              this.termSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
              this.termSliderMax = this.quotas.length;
              this.termSliderDisplayValue = this.termSliderDisplayMin;
            }
          }
        );
    this.data = {
      "purchaseAmount": "200012",
      "listQuota": [
        {
          "feeAmount": "80,00",
          "commissionPercentage": 10,
          "feePercentage": 4,
          "iva": "10,40",
          "quotaTo": 3,
          "amountPerQuota": "666,71",
          "quotaFrom": 1,
          "financedPlan": 0,
          "commissionAmount": "200,01"
        },
        {
          "feeAmount": "160,01",
          "commissionPercentage": 0,
          "feePercentage": 8,
          "iva": "20,80",
          "quotaTo": 6,
          "amountPerQuota": "333,35",
          "quotaFrom": 1,
          "financedPlan": 0,
          "commissionAmount": "2.500,00"
        },
        {
          "feeAmount": "280,02",
          "commissionPercentage": 0,
          "feePercentage": 14,
          "iva": "36,40",
          "quotaTo": 12,
          "amountPerQuota": "166,68",
          "quotaFrom": 1,
          "financedPlan": 0,
          "commissionAmount": "0,00"
        },
        {
          "feeAmount": "400,02",
          "commissionPercentage": 12,
          "feePercentage": 20,
          "iva": "52,00",
          "quotaTo": 18,
          "amountPerQuota": "111,12",
          "quotaFrom": 1,
          "financedPlan": 0,
          "commissionAmount": "240,01"
        },
        {
          "feeAmount": "500,03",
          "commissionPercentage": 10,
          "feePercentage": 25,
          "iva": "65,00",
          "quotaTo": 24,
          "amountPerQuota": "83,34",
          "quotaFrom": 1,
          "financedPlan": 0,
          "commissionAmount": "5.000,00"
        },
        {
          "feeAmount": "0,00",
          "commissionPercentage": 0,
          "feePercentage": 0,
          "iva": "0,00",
          "quotaTo": 36,
          "amountPerQuota": "55,56",
          "quotaFrom": 1,
          "financedPlan": 0,
          "commissionAmount": "0,00"
        }
      ]
    };

    this.quotas = this.data.listQuota.sort((a, b) => a.quota - b.quota);
    this.termSliderDisplayMin = this.quotas[0].quotaTo;
    this.termSliderMin = 1;
    this.termSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
    this.termSliderMax = this.quotas.length;
    this.termSliderDisplayValue = this.termSliderDisplayMin;
    
    this.selectPaymentQuotaSummary();
    
  }

  selectPaymentQuotaSummary() {
    this.paymentQuotaSummary = this.quotas.find(value => value.quotaTo === this.termSliderDisplayValue);
    //this.ivaAmount = Number((ConvertStringAmountToNumber(this.personalCreditSummary.commission) * 0.13).toFixed(2));
    this.publicSevice.paymentQuotaSummary = Object.assign({}, this.paymentQuotaSummary);
  }

  openSummary() {
    this.modalService.open({
        template: this.summaryTemplate, title: 'Resumen general'
      },
      {width: 380, height: 467, disableClose: true, panelClass: 'summary-panel'});
  }


  getQuota(sliderValue) {
    this.termSliderDisplayValue = this.quotas[sliderValue - 1].quotaTo;
    this.termControl.setValue( this.termSliderDisplayValue );
    this.selectPaymentQuotaSummary();
  }

  getTags(tags: Tag[]) {

    console.log("tags: ", tags);
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
