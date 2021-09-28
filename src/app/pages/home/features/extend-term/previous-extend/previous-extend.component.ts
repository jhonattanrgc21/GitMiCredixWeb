import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/core/services/modal.service';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';

@Component({
  selector: 'app-previous-extend',
  templateUrl: './previous-extend.component.html',
  styleUrls: ['./previous-extend.component.scss']
})
export class PreviousExtendComponent implements OnInit {

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

  amountSliderStep = 1;
  amountSliderMin = 0;
  amountSliderMax = 1;
  termSliderStep = 1;
  termSliderMin = 3;
  termSliderMax = 12;
  termSliderDisplayMin = 1;
  termSliderDisplayMax = 12;
  termSliderDisplayValue = 0;

  paymentQuotaSummary: PaymentQuota = null;

  @ViewChild('summaryTemplate') summaryTemplate: TemplateRef<any>;

  constructor(
    private modalService: ModalService,
    private route: Router,
  ) { }
  
//   export interface PaymentQuota {
//     feeAmount: string,
//     commissionPercentage: string,
//     feePercentage: number,
//     IVA: string,
//     quotaTo: number,
//     amountPerQuota: string,
//     quotaFrom: number,
//     financedPlan: number,
//     commissionAmount: string,
// };

  ngOnInit(): void {
    this.paymentQuotaSummary = {
      feeAmount: '2000',
      commissionPercentage: '2',
      feePercentage: 2,
      IVA: '12',
      quotaTo: 1,
      amountPerQuota: '2000',
      quotaFrom: 1,
      financedPlan: 1,
      commissionAmount: '200',
    }

    // this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality => {
    //   if ( functionality.length > 0 ) {
    //     this.getTags(functionality.find(fun => fun.description === 'Servicios')?.tags)
    //   }
    // });
    this.getQuotas();
  }

  getQuotas() {
    // this.publicSevice.getCuotaCalculator(this.amount)
    //   .pipe(finalize(() => this.selectPaymentQuotaSummary()))
    //     .subscribe(
    //       response => {
    //         if ( response ) {
    //           this.quotas = response.sort((a, b) => a.quotaTo - b.quotaTo);
    //           this.termSliderDisplayMin = this.quotas[0].quotaTo;
    //           this.termSliderMin = 1;
    //           this.termSliderDisplayMax = this.quotas[this.quotas.length - 1].quotaTo;
    //           this.termSliderMax = this.quotas.length;
    //           this.termSliderDisplayValue = this.termSliderDisplayMin;
    //         }
    //       }
    //     );
  }

  getQuota(sliderValue) {
    // this.termSliderDisplayValue = this.quotas[sliderValue - 1].quota;
    // this.termControl.setValue(this.termSliderDisplayValue);
    // this.selectPersonalCreditSummary();
  }

  selectPaymentQuotaSummary() {
    // this.paymentQuotaSummary = this.quotas.find(value => value.quotaTo === this.termSliderDisplayValue);
    // //this.ivaAmount = Number((ConvertStringAmountToNumber(this.personalCreditSummary.commission) * 0.13).toFixed(2));
    // this.publicSevice.paymentQuotaSummary = Object.assign({}, this.paymentQuotaSummary);
  }

  openSummary() {
    this.modalService.open({
      template: this.summaryTemplate,
      title: 'Resumen general',
    },
    {width: 380, height: 443, disableClose: true, panelClass: 'summary-panel'}
    )
  }

  extendTerm() {

  }
}
