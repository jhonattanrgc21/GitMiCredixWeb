import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PublicServiceFavoriteByUser} from '../../../../../shared/models/public-service-favorite-by-user';
import {PublicServicesService} from '../public-services.service';
import {PendingReceipts} from '../../../../../shared/models/pending-receipts';
import {ConvertStringAmountToNumber, getMontByMonthNumber} from '../../../../../shared/utils';
import {ModalService} from '../../../../../core/services/modal.service';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-favorite-services',
  templateUrl: './favorite-services.component.html',
  styleUrls: ['./favorite-services.component.scss', '../public-services.component.scss']
})
export class FavoriteServicesComponent implements OnInit, OnDestroy {
  confirmFormGroup: FormGroup = new FormGroup({
    favorite: new FormControl(null),
    amount: new FormControl(null, [Validators.required])
  });
  currencySymbol = '₡';
  publicFavoriteService: PublicServiceFavoriteByUser[] = [];
  pendingReceipt: PendingReceipts;
  selectedPublicService: PublicServiceFavoriteByUser;
  newAmount: boolean;
  month: string;
  showMessage = false;
  hasReceipts = false;
  amountOfPay: string;
  message: string;
  status: 'info' | 'error';
  title: string;
  expirationDate: Date;
  tableHeaders = [
    {label: 'Servicios', width: '283px'},
    {label: 'Datos de la factura', width: 'auto'}
  ];
  isRecharge: boolean;
  tabChanged: boolean;
  empty = false;
  amount = '0.00';
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

  constructor(private publicServicesService: PublicServicesService,
              private router: Router,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    if ( this.publicServicesService.tabIndex === 'Favoritos' ) {
      this.getFavoritePublicServiceDetail();
      this.getIsTabChanged();
    } else {
      this.router.navigate(['/home/public-services']);
    }
  }

  getIsTabChanged() {
    this.publicServicesService.tabChanged.subscribe(() => this.tabChanged = true);
  }

  publicServiceChange(favorite: PublicServiceFavoriteByUser) {
    this.selectedPublicService = favorite;
    this.isRecharge = this.selectedPublicService.publicServiceCategory === 'Recargas';
    this.publicServicesService.publicServiceIdByFavorite = favorite.publicServiceId;
    this.publicServicesService.phoneNumberByFavorite = favorite.serviceReference;
    this.publicServicesService.keyTypeByFavorite = [{
      description: favorite.publicServiceAccessKeyDescription,
      keyType: favorite.publicServiceAccessKeyType
    }];
    this.showMessage = false;
    this.hasReceipts = false;
    this.getFavoriteServiceDetail();
  }

  getFavoriteServiceDetail() {
    this.publicServicesService.checkPendingReceipts(
      this.selectedPublicService.publicServiceId,
      +this.selectedPublicService.serviceReference,
      this.selectedPublicService.publicServiceAccessKeyType)
      .subscribe((response) => {
        this.pendingReceipt = response;
        this.hasReceipts = this.pendingReceipt?.receipts !== null && this.pendingReceipt?.receipts.length > 0;
        this.status = this.pendingReceipt ? 'info' : 'error';
        this.message = this.status === 'error' ? 'Oops...' : this.pendingReceipt?.responseDescription;
        this.showMessage = this.status === 'error' || (this.pendingReceipt !== null && !this.hasReceipts);

        if (this.pendingReceipt && this.pendingReceipt.receipts !== null) {
          const months: Date = new Date(this.pendingReceipt.date);
          this.month = getMontByMonthNumber(months.getMonth());
          this.expirationDate = new Date(this.pendingReceipt.receipts[0].expirationDate);
          this.amountOfPay = this.pendingReceipt.receipts[0].totalAmount;
          this.getQuotas(this.amountOfPay);
        }
      });
  }

  getFavoritePublicServiceDetail() {
    this.publicServicesService.getPublicServicesFavoritesByUser().subscribe(publicServices => {
      this.empty = publicServices.length === 0;
      this.publicFavoriteService = publicServices;
    });
  }

  openConfirmationModal() {
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(confirmation => {
      if (confirmation) {
        if (this.isRecharge) {
          this.publicServicesService.pendingReceipt = this.pendingReceipt;
          this.router.navigate(['/home/public-services/recharge']);
        } else {
          this.payService();
        }
      }
    });
  }

  onSelectRadioButtons(event) {
    this.newAmount = event.value === 1;
    if (!this.newAmount) {
      this.confirmFormGroup.controls.amount.setValue(ConvertStringAmountToNumber(this.amount).toString());
    } else {
      this.confirmFormGroup.controls.amount.markAsUntouched();
      this.confirmFormGroup.controls.amount.setValue(null, {onlySelf: false, emitEvent: false});
    }
  }

  payService() {
    if (this.pendingReceipt?.receipts !== null) {
      const amount = ConvertStringAmountToNumber(this.pendingReceipt.receipts[0].totalAmount).toString();

      // const amount = ConvertStringAmountToNumber(this.pendingReceipt.receipts[0].totalAmount).toString();
      // this.publicServicesService.payPublicService(
      //   this.pendingReceipt.clientName,
      //   this.selectedPublicService.publicServiceId,
      //   this.pendingReceipt.receipts[0].serviceValue,
      //   this.pendingReceipt.currencyCode,
      //   amount,
      //   +this.pendingReceipt.receipts[0].receiptPeriod,
      //   this.selectedPublicService.publicServiceAccessKeyType,
      //   this.pendingReceipt.receipts[0].expirationDate,
      //   this.pendingReceipt.receipts[0].billNumber,
      //   this.pendingReceipt.receipts[0].selfCode
      //   +this.paymentQuotaSummary.quotaTo,)
      

      this.publicServicesService.payPublicService(
        this.pendingReceipt.clientName,
        this.selectedPublicService.publicServiceId,
        this.pendingReceipt.receipts[0].serviceValue,
        this.pendingReceipt.currencyCode,
        amount,
        +this.pendingReceipt.receipts[0].receiptPeriod,
        +this.selectedPublicService.publicServiceAccessKeyType,
        this.pendingReceipt.receipts[0].expirationDate,
        this.pendingReceipt.receipts[0].billNumber,
        undefined,
        this.pendingReceipt.receipts[0].selfCode
        +this.paymentQuotaSummary.quotaTo,)
        .pipe(finalize(() => this.router.navigate(['/home/public-services/success'])))
        .subscribe((response) => {
          this.publicServicesService.result = {
            status: response.type,
            message: response.descriptionOne || response.message,
            title: 'Servicios'
          };

          this.publicServicesService.payment = {
            currencySymbol: this.pendingReceipt.currencyCode === 'COL' ? '₡' : '$',
            amount: this.amountOfPay,
            contract: this.selectedPublicService.serviceReference,
            type: this.selectedPublicService.publicServiceCategory === 'Recargas' ? 'Recarga' : 'Servicio',
            quota: this.paymentQuotaSummary.quotaTo,
          };

          this.publicServicesService.voucher = {
            institution: [{companyCode: response.companyCode, companyName: response.companyName}],
            agreement: [{contractCode: response.contractCode, contractName: response.contractName}],
            agencyCode: response.agencyCode,
            cashier: 'Credix',
            currencyCode: this.pendingReceipt.currencyCode,
            clientName: this.pendingReceipt.clientName,
            billNumber: this.pendingReceipt.receipts[0].billNumber,
            transactionNumber: response.transactionNumber,
            channelType: this.pendingReceipt.channelType,
            paymentStatus: 'Aplicado',
            movementDate: this.pendingReceipt.date,
            expirationDate: this.pendingReceipt.receipts[0].expirationDate,
            period: this.pendingReceipt.receipts[0].receiptPeriod,
            reference: response.reference,
            valorType: 'EFECTIVO',
            amount: response.amountPaid,
            paymentConcepts: response.paymentConcepts,
            informativeConcepts: response.informativeConcepts,
            currencySymbol: this.pendingReceipt.currencyCode === 'COL' ? '₡' : '$'
          };
        });
    }
  }

  getQuotas(amount) {
    this.publicServicesService.getCuotaCalculator(amount)
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
    this.publicServicesService.paymentQuotaSummary = Object.assign({}, this.paymentQuotaSummary);
  }


  getQuota(sliderValue) {
    this.termSliderDisplayValue = this.quotas[sliderValue - 1].quotaTo;
    //this.termControl.setValue( this.termSliderDisplayValue );
    this.selectPaymentQuotaSummary();
  }

  openSummary() {
    this.modalService.open({
        template: this.summaryTemplate, title: 'Resumen general'
      },
      {width: 380, height: 443, disableClose: true, panelClass: 'summary-panel'});
  }

  ngOnDestroy(): void {
    this.publicServicesService.unsubscribe();
  }
}
