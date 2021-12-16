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
import { DatePipe } from '@angular/common';
import { GlobalApiService } from 'src/app/core/services/global-api.service';

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
    favorite: new FormControl(null),
    amount: new FormControl(null, [Validators.required])
  });
  requestForm: FormGroup = new FormGroup({
    term: new FormControl(null, [Validators.required])
  });
  confirmCodeFormGroup: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });
  buttonFormGroup: FormGroup = null;

  currencySymbol = '₡';
  saveAsFavorite = false;
  stepperIndex = 0;
  hasReceipts = true;
  status: 'info' | 'success' | 'error' = 'info';
  pendingReceipts: PendingReceipts;
  receiptValues: {
    serviceValue: string;
    receiptPeriod: number;
    expirationDate: string;
    billNumber: string;
    totalAmount?: string | number;
    selfCode?: string
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
  keyType: string = '';

  @ViewChild('newServiceStepper') stepper: CdkStepper;

  constructor(private publicServicesService: PublicServicesService,
              private publicServicesApiService: PublicServicesApiService,
              private router: Router,
              private datePipe: DatePipe,
              private modalService: ModalService,
              private credixCodeErrorService: CredixCodeErrorService,
              private globalApi: GlobalApiService,) {
  }

  ngOnInit(): void {
    this.buttonFormGroup = this.contractFormGroup;
    this.publicServicesService.paymentType = 'Servicio';
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

  next() {
    if ( this.stepperIndex === 1 ) {
      this.buttonFormGroup = this.confirmCodeFormGroup;
      this.continue();
    } else {
      this.buttonFormGroup = this.confirmFormGroup;      
      this.keyType = this.keys.find(key => key.keyType === this.contractFormGroup.controls.keysControl.value).description;      
      this.checkPendingReceipts();
    }
  }

  checkPendingReceipts() {
    this.publicServicesService.checkPendingReceipts(
      this.publicServiceId,
      this.contractFormGroup.controls.contractControl.value,
      this.contractFormGroup.controls.keysControl.value)
      .pipe(finalize(() => {
          const period = ConvertStringDateToDate(this.pendingReceipts.receipts[0].receiptPeriod);
          this.month = `${getMontByMonthNumber(period.getMonth())} ${period.getFullYear()}`;
          this.expirationDate = ConvertStringDateToDate(this.pendingReceipts.receipts[0].expirationDate);
          this.receiptValues = {
            serviceValue: this.pendingReceipts.receipts[0].serviceValue,
            receiptPeriod: +this.pendingReceipts.receipts[0].receiptPeriod,
            expirationDate: this.pendingReceipts.receipts[0].expirationDate,
            billNumber: this.pendingReceipts.receipts[0].billNumber,
            totalAmount: this.pendingReceipts.receipts[0]?.totalAmount,
            selfCode: this.pendingReceipts.receipts[0].selfCode
          };
        this.continue();
      })).subscribe(pendingReceipts => {
        console.log("pendingReceipts: ", pendingReceipts);

      if ( pendingReceipts?.receipts ) {

        console.log("entro");
        this.pendingReceipts = pendingReceipts;
        this.hasReceipts = this.pendingReceipts?.receipts !== null && this.pendingReceipts?.receipts.length > 0;
        this.message = this.pendingReceipts.responseDescription;
        this.currencySymbol = this.pendingReceipts.currencyCode === 'COL' ? '₡' : '$';
      } else {
        this.message = pendingReceipts.message;
        this.status = pendingReceipts.type;
        this.hasReceipts = false;
      }
    });
  }

  // popupAllPendingReceipt(receipts: Receipt[], currencySymbol: string, validateAntiquity: string) {
  //   this.modalService.open({
  //     component: PopupAllReceiptsComponent,
  //     title: 'Elija un recibo',
  //     hideCloseButton: false,
  //     data: {
  //       receipts,
  //       currencySymbol,
  //       validateAntiquity,
  //       companyName: this.publicServicesService.company
  //     }
  //   }, {width: 380, height: 673, disableClose: false, panelClass: 'all-receipts-popup'}).afterClosed()
  //     .subscribe(values => {
  //       if (values) {
  //         const period = ConvertStringDateToDate(values.receiptPeriod);
  //         this.month = `${getMontByMonthNumber(period.getMonth())} ${period.getFullYear()}`;
  //         this.expirationDate = ConvertStringDateToDate(values.expirationDate);
  //         this.receiptValues = {
  //           serviceValue: values.serviceValue,
  //           billNumber: values.billNumber,
  //           expirationDate: values.expirationDate,
  //           receiptPeriod: values.receiptPeriod,
  //           totalAmount: values.totalAmount
  //         };
  //         this.continue();
  //       }
  //     });
  // }
 
  payService() {
    this.publicServicesService.payPublicService(
      this.pendingReceipts.clientName,
      this.publicServiceId,
      this.receiptValues.serviceValue,
      this.pendingReceipts.currencyCode,
      this.confirmFormGroup.controls.amount.value,
      +this.receiptValues.receiptPeriod,
      +this.contractFormGroup.controls.keysControl.value,
      this.receiptValues.expirationDate,
      this.receiptValues.billNumber,
      this.confirmCodeFormGroup.controls.credixCode.value,
      this.receiptValues.selfCode,
      this.publicServicesService.paymentQuotaSummary.quotaTo,
      )
      .pipe(finalize(() => {
        if (this.confirmCodeFormGroup.controls.credixCode.valid) {
          this.router.navigate(['/home/public-services/success']);
        }
      }))
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
          amount: this.formatAmountWithDecimalString(this.confirmFormGroup.controls.amount?.value),
          contract: this.contractFormGroup.controls.contractControl.value,
          type: 'Servicio',
          quota: this.requestForm.controls.term.value,
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
          amount: this.formatAmountWithDecimalString(this.confirmFormGroup.controls.amount?.value),
          paymentConcepts: response.paymentConcepts,
          informativeConcepts: response.informativeConcepts,
          currencySymbol: this.currencySymbol
        };
      });
  }

  formatAmountWithDecimalString(value: string) {
    if ((value.indexOf(',') === -1) && (value.indexOf('.') > -1)) {
      return value.replace('.', ',');
    }
    return value;
  }

  saveFavorite() {
    this.publicServicesService.savePublicServiceFavorite(
      this.publicServiceId,
      this.contractFormGroup.controls.contractControl.value,
      this.confirmFormGroup.controls.favorite.value,
      this.contractFormGroup.controls.keysControl.value,
      this.confirmCodeFormGroup.controls.credixCode.value,
      this.publicServicesService.paymentQuotaSummary.quotaTo).subscribe();
  }

  back() { 
    if ( this.stepperIndex === 1 ) {
      this.buttonFormGroup = this.contractFormGroup;
    } else if ( this.stepperIndex === 2 ) {
      this.buttonFormGroup = this.confirmFormGroup;
    }

    this.stepperIndex === 0 ? this.router.navigate(['/home/public-services']) : this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex;
  }

  continue() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
  }

  setErrorCredixCode() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.confirmCodeFormGroup.controls.credixCode.setErrors({invalid: true});
      this.confirmCodeFormGroup.updateValueAndValidity();
    });
  }
}
