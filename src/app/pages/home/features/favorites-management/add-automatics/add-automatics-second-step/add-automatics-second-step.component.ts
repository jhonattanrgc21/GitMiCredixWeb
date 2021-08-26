import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { CredixCodeErrorService } from 'src/app/core/services/credix-code-error.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { TagsService } from 'src/app/core/services/tags.service';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';
import { PublicServicesService } from '../../../public-services/public-services.service';
import { FavoritesManagementService } from '../../favorites-management.service';

@Component({
  selector: 'app-add-automatics-second-step',
  templateUrl: './add-automatics-second-step.component.html',
  styleUrls: ['./add-automatics-second-step.component.scss']
})
export class AddAutomaticsSecondStepComponent implements OnInit, OnChanges {
  

  @Input() termControl: FormControl = new FormControl(null);
  @Input() confirmCodeFormGroup: FormGroup = new FormGroup({
    codeCredix: new FormControl(null, [Validators.required]),
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
  termSliderDisplayValue = 7;

  constructor(
    private modalService: ModalService,
    private credixCodeErrorService: CredixCodeErrorService,
    private favoriteMagamentService: FavoritesManagementService,
    private tagsService: TagsService,) {
  }

  ngOnInit(): void {
    /*this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality => {
      if ( functionality.length > 0 ) {
        this.getTags(functionality.find(fun => fun.description === 'Servicios')?.tags)
      }
    });*/
    this.getQuotas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ( ( changes.isActive && this.isActive ) ) {
      this.getQuotas();
    }
  }

  getQuotas() {
    this.favoriteMagamentService.getCuotaCalculator( this.amount )
      .pipe(finalize(() => this.selectPaymentQuotaSummary()))
        .subscribe(
          response => {
            if ( response ) {
              this.quotas = response.sort((a, b) => a.quotaTo - b.quotaTo);
              this.termSliderDisplayMin = this.quotas[0].quotaTo;
              this.termSliderMin = 1;
              this.termSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
              this.termSliderMax = this.quotas.length;
              this.termSliderDisplayValue = this.termSliderDisplayMin;
              this.termControl.setValue( this.termSliderDisplayValue );
            }
          },
        );
  }

  selectPaymentQuotaSummary() {
    this.paymentQuotaSummary = this.quotas.find(value => value.quotaTo === this.termSliderDisplayValue);
    //this.ivaAmount = Number((ConvertStringAmountToNumber(this.personalCreditSummary.commission) * 0.13).toFixed(2));
    //this.publicSevice.paymentQuotaSummary = Object.assign({}, this.paymentQuotaSummary);
  }

  getQuota(sliderValue) {
    this.termSliderDisplayValue = this.quotas[sliderValue - 1].quotaTo;
    this.termControl.setValue( this.termSliderDisplayValue );
    this.selectPaymentQuotaSummary();
  }

  /*getTags(tags: Tag[]) {
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
  }*/

}
