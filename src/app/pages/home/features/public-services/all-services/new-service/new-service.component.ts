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
import {PopupReceiptComponent} from '../../popup-receipt/popup-receipt.component';
import {PopupReceipt} from '../../../../../../shared/models/popup-receipt';
import {CredixCodeErrorService} from '../../../../../../core/services/credix-code-error.service';
import {finalize} from 'rxjs/operators';

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
    amount: new FormControl(null)
  });
  currencySymbol = '₡';
  saveAsFavorite = false;
  stepperIndex = 0;
  done = false;
  hasReceipts = true;
  pendingReceipts: PendingReceipts;
  publicServiceId: number;
  name: string;
  month: string;
  expirationDate: Date;
  message: string;
  keys: Keys[];
  quantityOfKeys: number;
  publicServiceName: string;
  receiptData: PopupReceipt;
  paymentType = '';
  status: 'success' | 'error';
  today = new Date();
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
    this.publicServiceId = this.publicServicesService.publicService.publicServiceId;
    this.keys = this.publicServicesService.publicService.keys;
    this.quantityOfKeys = this.publicServicesService.publicService.quantityOfKeys;
    this.paymentType = this.publicServicesService.publicService.paymentType;
    this.publicServiceName = this.publicServicesService.publicService.publicServiceName;
  }

  openModal() {
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(confirmation => {
      if (confirmation) {
        this.payService();
      }
    });
  }

  payService() {
    this.publicServicesService.payPublicService(
      this.publicServiceId,
      +this.pendingReceipts.receipts.serviceValue,
      this.confirmFormGroup.controls.amount.value,
      +this.pendingReceipts.receipts.receiptPeriod,
      +this.contractFormGroup.controls.keysControl.value,
      this.pendingReceipts.receipts.expirationDate,
      this.pendingReceipts.receipts.billNumber,
      this.contractFormGroup.controls.keysControl.value)
      .pipe(finalize(() => this.done = true))
      .subscribe(response => {
        this.status = response.type;
        this.message = response.descriptionOne;

        if (response.type === 'success' && this.saveAsFavorite) {
          this.saveFavorite();
        }
        this.receiptData = {
          institution: [{companyCode: response.companyCode, companyName: response.companyName}],
          agreement: [{contractCode: response.contractCode, contractName: response.contractName}],
          agencyCode: response.agencyCode,
          cashier: 'Credix',
          currencyCode: this.pendingReceipts.currencyCode,
          clientName: this.pendingReceipts.clientName,
          billNumber: this.pendingReceipts.receipts.billNumber,
          invoiceNumber: this.pendingReceipts.receipts.receipt,
          channelType: this.pendingReceipts.channelType,
          paymentStatus: 'Aplicado',
          movementDate: this.pendingReceipts.date,
          expirationDate: this.pendingReceipts.receipts.expirationDate,
          period: this.pendingReceipts.receipts.receiptPeriod,
          reference: response.reference,
          typeOfValor: 'EFECTIVO',
          amount: response.amountPaid,
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

  checkPendingReceipts() {
    this.publicServicesService.checkPendingReceipts(
      this.publicServiceId,
      this.contractFormGroup.controls.contractControl.value,
      this.contractFormGroup.controls.keysControl.value
    ).subscribe(pendingReceipts => {
      if (pendingReceipts && pendingReceipts.receipts) {
        this.pendingReceipts = pendingReceipts;
        this.month = getMontByMonthNumber(ConvertStringDateToDate(pendingReceipts.receipts.receiptPeriod).getMonth());
        this.expirationDate = ConvertStringDateToDate(pendingReceipts.receipts.expirationDate);
        this.currencySymbol = pendingReceipts.currencyCode === 'COL' ? '₡' : '$';
        this.continue();
      } else {
        this.hasReceipts = false;
      }
    });
  }

  setErrorCredixCode() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.confirmFormGroup.controls.credixCode.setErrors({invalid: true});
      this.confirmFormGroup.updateValueAndValidity();
    });
  }

  openBillingModal() {
    this.modalService.open({title: 'Comprobante', data: this.receiptData, component: PopupReceiptComponent},
      {height: 673, width: 380, disableClose: true, panelClass: 'new-service-receipt'});
  }
}
