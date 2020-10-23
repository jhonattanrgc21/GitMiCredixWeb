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
        this.message = this.pendingReceipts.responseDescription;
        if (this.pendingReceipts?.receipts) {
          const period = ConvertStringDateToDate(this.pendingReceipts.receipts.receiptPeriod);
          this.month = `${getMontByMonthNumber(period.getMonth())} ${period.getFullYear()}`;
          this.expirationDate = ConvertStringDateToDate(this.pendingReceipts.receipts.expirationDate);
          this.currencySymbol = this.pendingReceipts.currencyCode === 'COL' ? '₡' : '$';
          this.continue();
        } else {
          this.hasReceipts = false;
        }
      })).subscribe(pendingReceipts => this.pendingReceipts = pendingReceipts);
  }

  payService() {
    this.publicServicesService.payPublicService(
      this.pendingReceipts.clientName,
      this.publicServiceId,
      +this.pendingReceipts.receipts.serviceValue,
      this.pendingReceipts.currencyCode,
      this.confirmFormGroup.controls.amount.value,
      +this.pendingReceipts.receipts.receiptPeriod,
      +this.contractFormGroup.controls.keysControl.value,
      this.pendingReceipts.receipts.expirationDate,
      this.pendingReceipts.receipts.billNumber,
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
          billNumber: this.pendingReceipts.receipts.billNumber,
          authorizationNumber: response.authorizationNumber,
          channelType: this.pendingReceipts.channelType,
          paymentStatus: 'Aplicado',
          movementDate: this.pendingReceipts.date,
          expirationDate: this.pendingReceipts.receipts.expirationDate,
          period: this.pendingReceipts.receipts.receiptPeriod,
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
