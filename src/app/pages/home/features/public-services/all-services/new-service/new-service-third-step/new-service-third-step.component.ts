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
  selector: 'app-new-service-third-step',
  templateUrl: './new-service-third-step.component.html',
  styleUrls: ['./new-service-third-step.component.scss']
})
export class NewServiceThirdStepComponent implements OnInit, OnChanges {

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

  constructor(
    private modalService: ModalService,
    private credixCodeErrorService: CredixCodeErrorService,
    private publicSevice: PublicServicesService,
    private tagsService: TagsService,) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality => {
      if ( functionality.length > 0 ) {
        this.getTags(functionality.find(fun => fun.description === 'Servicios')?.tags)
      }
    });
    this.getQuotas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( changes.isActive && this.isActive ) {
      this.getQuotas();
    }
  }

  getQuotas() {
    this.publicSevice.getCuotaCalculator(this.amount)
      .pipe(finalize(() => this.selectPaymentQuotaSummary()))
        .subscribe(
          response => {
            if ( response ) {
              console.log( response );
              this.quotas = response.sort((a, b) => a.quotaTo - b.quotaTo);
              this.termSliderDisplayMin = this.quotas[0].quotaTo;
              this.termSliderMin = 1;
              this.termSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
              this.termSliderMax = this.quotas.length;
              this.termSliderDisplayValue = this.termSliderDisplayMin;
            }
          }
        );
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
