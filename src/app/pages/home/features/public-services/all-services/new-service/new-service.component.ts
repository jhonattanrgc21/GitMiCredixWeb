import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {PublicServicesApiService} from '../../../../../../core/services/public-services-api.service';
import {PublicServicesService} from '../../public-services.service';
import {ConvertStringDateToDate, getMontByMonthNumber} from '../../../../../../shared/utils';
import {PendingReceipts} from '../../../../../../shared/models/pending-receipts';
import {ModalService} from '../../../../../../core/services/modal.service';
import {Keys} from '../../../../../../shared/models/keys';
import {CredixCodeErrorService} from '../../../../../../core/services/credix-code-error.service';
import {finalize} from 'rxjs/operators';
import {PopupAllReceiptsComponent} from '../popup-all-receipts/popup-all-receipts.component';
import {Receipt} from '../../../../../../shared/models/receipt';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent implements OnInit {
  contractFormGroup = new FormGroup({
    contractControl: new FormControl(null, [Validators.required]),
    keysControl: new FormControl(null, [Validators.required])
  });
  confirmFormGroup: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required]),
    favorite: new FormControl(null),
    amount: new FormControl(null, [Validators.required])
  });
  currencySymbol = '₡';
  saveAsFavorite = false;
  stepperIndex = 0;
  hasReceipts = true;
  pendingReceipts: PendingReceipts;
  receiptValues: {
    serviceValue: number;
    receiptPeriod: number;
    expirationDate: string;
    billNumber: string;
    totalAmount?: string | number;
  };
  publicServiceId: number;
  name: string;
  month: string;
  expirationDate: Date;
  keys: Keys[];
  message: string;
  quantityOfKeys: number;
  publicServiceName: string;
  paymentType = '';
  @ViewChild('newServiceStepper') stepper: CdkStepper;

  constructor(private publicServicesService: PublicServicesService,
              private publicServicesApiService: PublicServicesApiService,
              private router: Router,
              private modalService: ModalService,
              private credixCodeErrorService: CredixCodeErrorService) {
  }

  ngOnInit(): void {
    this.setErrorCredixCode();
    this.getPublicService();
  }

  getPublicService() {
    if (this.publicServicesService.publicService) {
      this.publicServiceId = this.publicServicesService.publicService.publicServiceId;
      this.keys = this.publicServicesService.publicService.keys;
      this.quantityOfKeys = this.publicServicesService.publicService.quantityOfKeys;
      this.paymentType = this.publicServicesService.publicService.paymentType;
      this.publicServiceName = this.publicServicesService.publicService.publicServiceName;
    } else {
      this.router.navigate(['/home/public-services']);
    }
  }

  openModal() {
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(confirmation => {
      if (confirmation) {
        this.payService();
      }
    });
  }

  checkPendingReceipts() {
    this.publicServicesService.checkPendingReceipts(
      this.publicServiceId,
      this.contractFormGroup.controls.contractControl.value,
      this.contractFormGroup.controls.keysControl.value)
      .pipe(finalize(() => {
        if (this.pendingReceipts?.receipts.length > 1) {
          this.popupAllPendingReceipt(
            this.pendingReceipts.receipts,
            this.currencySymbol,
            this.publicServicesService.publicService.validateAntiquity);
        } else if (this.pendingReceipts?.receipts.length === 1) {
          const period = ConvertStringDateToDate(this.pendingReceipts.receipts[0].receiptPeriod);
          this.month = `${getMontByMonthNumber(period.getMonth())} ${period.getFullYear()}`;
          this.expirationDate = ConvertStringDateToDate(this.pendingReceipts.receipts[0].expirationDate);
          this.receiptValues = {
            serviceValue: +this.pendingReceipts.receipts[0].serviceValue,
            receiptPeriod: +this.pendingReceipts.receipts[0].receiptPeriod,
            expirationDate: this.pendingReceipts.receipts[0].expirationDate,
            billNumber: this.pendingReceipts.receipts[0].billNumber,
            totalAmount: (typeof this.pendingReceipts.receipts[0]?.totalAmount === 'string') ?
              this.pendingReceipts.receipts[0]?.totalAmount.replace('.', '') :
              this.pendingReceipts.receipts[0]?.totalAmount
          };
          this.continue();
        }
      })).subscribe(pendingReceipts => {
      this.pendingReceipts = pendingReceipts;
      this.hasReceipts = this.pendingReceipts?.receipts !== null && this.pendingReceipts?.receipts.length > 0;
      this.message = this.pendingReceipts.responseDescription;
      this.currencySymbol = this.pendingReceipts.currencyCode === 'COL' ? '₡' : '$';
    });
  }

  popupAllPendingReceipt(receipts: Receipt[], currencySymbol: string, validateAntiquity: string) {
    this.modalService.open({
      component: PopupAllReceiptsComponent,
      title: 'Elija un recibo',
      hideCloseButton: false,
      data: {
        receipts,
        currencySymbol,
        validateAntiquity
      }
    }, {width: 380, height: 673, disableClose: false, panelClass: 'all-receipts-popup'}).afterClosed()
      .subscribe(values => {
        if (values) {
          const period = ConvertStringDateToDate(values.receiptPeriod);
          this.month = `${getMontByMonthNumber(period.getMonth())} ${period.getFullYear()}`;
          this.expirationDate = ConvertStringDateToDate(values.expirationDate);
          this.receiptValues = {
            serviceValue: values.serviceValue,
            billNumber: values.billNumber,
            expirationDate: values.expirationDate,
            receiptPeriod: values.receiptPeriod,
            totalAmount: (typeof values.totalAmount === 'string') ?
              values.totalAmount.replace('.', '') :
              values.totalAmount
          };
          this.continue();
        }
      });
  }

  payService() {
    this.publicServicesService.payPublicService(
      this.pendingReceipts.clientName,
      this.publicServiceId,
      +this.receiptValues.serviceValue,
      this.pendingReceipts.currencyCode,
      this.confirmFormGroup.controls.amount.value,
      +this.receiptValues.receiptPeriod,
      +this.contractFormGroup.controls.keysControl.value,
      this.receiptValues.expirationDate,
      this.receiptValues.billNumber,
      this.confirmFormGroup.controls.credixCode.value)
      .pipe(finalize(() => this.router.navigate(['/home/public-services/success'])))
      .subscribe(response => {
        if (response.type === 'success' && this.saveAsFavorite) {
          this.saveFavorite();
        }

        this.publicServicesService.result = {
          status: response.type,
          message: response.descriptionOne || response.message,
          title: this.publicServiceName
        };

        this.publicServicesService.payment = {
          currencySymbol: this.currencySymbol,
          amount: this.confirmFormGroup.controls.amount?.value,
          contract: this.contractFormGroup.controls.contractControl.value,
          type: 'Servicio'
        };

        this.publicServicesService.voucher = {
          institution: [{companyCode: response.companyCode, companyName: response.companyName}],
          agreement: [{contractCode: response.contractCode, contractName: response.contractName}],
          agencyCode: response.agencyCode,
          cashier: 'Credix',
          currencyCode: this.pendingReceipts.currencyCode,
          clientName: this.pendingReceipts.clientName,
          billNumber: this.receiptValues.billNumber,
          transactionNumber: response.transactionNumber,
          channelType: this.pendingReceipts.channelType,
          paymentStatus: 'Aplicado',
          movementDate: this.pendingReceipts.date,
          expirationDate: this.receiptValues.expirationDate,
          period: this.receiptValues.receiptPeriod.toString(),
          reference: response.reference,
          valorType: 'EFECTIVO',
          amount: this.confirmFormGroup.controls.amount?.value,
          paymentConcepts: response.paymentConcepts,
          informativeConcepts: response.informativeConcepts,
          currencySymbol: this.currencySymbol
        };
      });
  }

  saveFavorite() {
    this.publicServicesService.savePublicServiceFavorite(
      this.publicServiceId,
      this.contractFormGroup.controls.contractControl.value,
      this.confirmFormGroup.controls.favorite.value,
      this.contractFormGroup.controls.keysControl.value,
      this.confirmFormGroup.controls.credixCode.value).subscribe();
  }

  back() {
    this.stepperIndex === 0 ? this.router.navigate(['/home/public-services']) : this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex;
  }

  continue() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
  }

  setErrorCredixCode() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.confirmFormGroup.controls.credixCode.setErrors({invalid: true});
      this.confirmFormGroup.updateValueAndValidity();
    });
  }
}
