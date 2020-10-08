import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {PublicServicesService} from '../public-services.service';
import {ConvertStringAmountToNumber, ConvertStringDateToDate, getMontByMonthNumber} from '../../../../../shared/utils';
import {PendingReceipts} from '../../../../../shared/models/pending-receipts';
import {ModalService} from '../../../../../core/services/modal.service';
import {finalize} from 'rxjs/operators';
import {Keys} from '../../../../../shared/models/keys';
import {PopupReceiptComponent} from './popup-receipt/popup-receipt.component';
import {PopupReceipt} from '../../../../../shared/models/popup-receipt';

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
  title: string;
  message: string;
  keys: Keys[];
  quantityOfKeys: number;
  publicServiceName: string;
  dataToModal: PopupReceipt;
  paymentType = '';
  status: 'success' | 'error';
  today = new Date();
  @ViewChild('newServiceStepper') stepper: CdkStepper;

  constructor(private publicServicesService: PublicServicesService,
              private publicServicesApiService: PublicServicesApiService,
              private router: Router,
              private modalService: ModalService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.publicServiceId = +params.serviceId;
      this.getEnterprise(+params.categoryId, +params.enterpriseId);
      this.getPublicService(+params.enterpriseId, this.publicServiceId);
    });
  }

  getEnterprise(categoryId: number, enterpriseId: number) {
    this.publicServicesApiService.getPublicServiceEnterpriseByCategory(categoryId).subscribe(publicServiceEnterprises =>
      this.title = publicServiceEnterprises
        .find(enterprise => enterprise.publicServiceEnterpriseId === enterpriseId).publicServiceEnterpriseDescription);
  }

  getPublicService(enterpriseId: number, publicServiceId: number) {
    this.publicServicesApiService.getPublicServiceByEnterprise(enterpriseId).subscribe(publicService => {
      this.keys = publicService.find(elem => elem.publicServiceId === publicServiceId).keys;
      this.quantityOfKeys = publicService
        .find(elem => elem.publicServiceId === publicServiceId).quantityOfKeys;
      this.paymentType = publicService.find(elem => elem.publicServiceId === publicServiceId).paymentType;
      this.publicServiceName = publicService.find(elem => elem.publicServiceId === publicServiceId).publicServiceName;
    });
  }

  openModal() {
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(confirmation => {
      if (confirmation) {
        const receipt = this.pendingReceipts.receipts;
        const amount = ConvertStringAmountToNumber(this.confirmFormGroup.controls.amount.value).toString();
        this.publicServicesService.payPublicService(
          this.publicServiceId,
          +receipt.serviceValue,
          amount,
          +receipt.receiptPeriod,
          +this.contractFormGroup.controls.keysControl.value,
          receipt.expirationDate,
          receipt.billNumber,
          this.contractFormGroup.controls.keysControl.value)
          .pipe(finalize(() => this.done = true))
          .subscribe(response => {
            this.status = response.type;
            this.message = response.responseDescription || response.message;
            if (response.type === 'success' && this.saveAsFavorite) {
              this.saveFavorite();
            }
            this.dataToModal = {
              institution: [{companyCode: response.companyCode, companyName: response.companyName}],
              agreement: [{contractCode: response.contractCode, contractName: response.contractName}],
              agencyCode: response.agencyCode,
              cashier: 'Credix',
              currencyCode: this.pendingReceipts.currencyCode,
              clientName: this.pendingReceipts.clientName,
              billNumber: this.pendingReceipts.receipts.billNumber,
              invoiceNumber: this.pendingReceipts.receipts.receipt,
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
    });
  }

  saveFavorite() {
    this.publicServicesService.savePublicServiceFavorite(
      this.publicServiceId,
      this.contractFormGroup.controls.contractControl.value,
      this.confirmFormGroup.controls.favorite.value,
      this.confirmFormGroup.controls.credixCode.value).subscribe(result => {
      if (result.status && result.status === 406) {
        this.confirmFormGroup.controls.credixCode.setErrors({invalid: true});
        this.confirmFormGroup.updateValueAndValidity();
      }
    });
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
    this.publicServicesService.checkPendingReceipts(this.publicServiceId,
      this.contractFormGroup.controls.contractControl.value,
      this.contractFormGroup.controls.keysControl.value
    ).subscribe(pendingReceipts => {
      if (pendingReceipts.receipts) {
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

  openBillingModal() {
    this.modalService.open({
      title: 'Comprobante',
      data: this.dataToModal,
      component: PopupReceiptComponent,
    }, {height: 673, width: 380, disableClose: false});
  }
}
