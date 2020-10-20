import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {PendingReceipts} from '../../../../../../shared/models/pending-receipts';
import {finalize} from 'rxjs/operators';
import {PublicServicesService} from '../../public-services.service';
import {PublicServicesApiService} from '../../../../../../core/services/public-services-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../../../core/services/modal.service';
import {Keys} from '../../../../../../shared/models/keys';
import {CdkStepper} from '@angular/cdk/stepper';
import {CredixCodeErrorService} from '../../../../../../core/services/credix-code-error.service';
import {TagsService} from '../../../../../../core/services/tags.service';
import {Tag} from '../../../../../../shared/models/tag';

@Component({
  selector: 'app-new-recharge',
  templateUrl: './new-recharge.component.html',
  styleUrls: ['./new-recharge.component.scss']
})
export class NewRechargeComponent implements OnInit {
  phoneNumber: FormControl = new FormControl(null,
    [Validators.required, Validators.minLength(8), Validators.maxLength(8)]);
  rechargeFormGroup: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required]),
    credixCode: new FormControl(null, [Validators.required]),
    favorite: new FormControl(null),
  });
  amounts: { amount: string, id: number }[] = [
    {id: 1, amount: '1.000,00'},
    {id: 1, amount: '2.000,00'},
    {id: 1, amount: '5.000,00'},
    {id: 1, amount: '10.000,00'},
    {id: 1, amount: 'Otro'}
  ];
  stepOneTitleTag: string;
  stepTwoTitleTag: string;
  stepTwoTags: {
    subtitle1Tag: string;
    subtitle2Tag: string;
    pendingTag: string;
    contractTag: string;
    tipeTag: string;
    saveToFavoriteTag: string;
    anotherTag: string;
    tag1: string;
    tag2: string;
    tag3: string;
    tag4: string;
  };
  resultTags: {
    tag1: string;
    tag2: string;
    tag3: string;
    link1: string;
    link2: string;
  };
  stepperIndex = 0;
  saveAsFavorite = false;
  done = false;
  hasReceipts = true;
  pendingReceipts: PendingReceipts;
  publicServiceName: string;
  publicServiceId: number;
  name: string;
  message: string;
  status: 'success' | 'error';
  keys: Keys[];
  today = new Date();
  @ViewChild('newRechargeStepper') stepper: CdkStepper;

  constructor(private publicServicesService: PublicServicesService,
              private publicServicesApiService: PublicServicesApiService,
              private modalService: ModalService,
              private credixCodeErrorService: CredixCodeErrorService,
              private tagsService: TagsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getMinAmounts();
    this.getPublicService();
    this.setErrorCredixCode();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Servicios').tags)
    );
  }

  getPublicService() {
    this.publicServiceId = this.publicServicesService.publicService.publicServiceId;
    this.keys = this.publicServicesService.publicService.keys;
    this.publicServiceName = this.publicServicesService.publicService.publicServiceName;
  }

  getMinAmounts() {
    this.publicServicesService.getMinAmounts().subscribe(amounts => this.amounts = [...amounts, {id: 10, amount: 'Otro'}]);
  }

  openModal() {
    this.modalService.confirmationPopup('¿Desea realizar esta recarga?').subscribe(confirmation => {
      if (confirmation) {
        this.recharge();
      }
    });
  }

  recharge() {
    const receipt = this.pendingReceipts.receipts;
    this.publicServicesService.payPublicService(
      this.publicServiceId,
      +receipt.serviceValue,
      this.pendingReceipts.currencyCode,
      this.rechargeFormGroup.controls.amount.value,
      +receipt.receiptPeriod,
      this.keys[0].keyType,
      receipt.expirationDate,
      receipt.billNumber,
      this.rechargeFormGroup.controls.credixCode.value)
      .pipe(finalize(() => this.router.navigate(['/home/public-services/success'])))
      .subscribe(response => {
        if (response.type === 'success' && this.saveAsFavorite) {
          this.saveFavorite();
        }

        this.publicServicesService.result = {status: response.type, message: response.descriptionOne, title: this.publicServiceName};

        this.publicServicesService.payment = {
          currencySymbol: '₡',
          amount: this.rechargeFormGroup.controls.amount?.value,
          contract: this.phoneNumber.value,
          type: 'Recarga'
        };

        this.publicServicesService.voucher = {
          institution: [{companyCode: response.companyCode, companyName: response.companyName}],
          agreement: [{contractCode: response.contractCode, contractName: response.contractName}],
          agencyCode: response.agencyCode,
          cashier: 'Credix',
          currencyCode: this.pendingReceipts.currencyCode,
          channelType: this.pendingReceipts.channelType,
          clientName: this.pendingReceipts.clientName,
          billNumber: this.pendingReceipts.receipts.billNumber,
          invoiceNumber: this.pendingReceipts.receipts.receipt,
          paymentStatus: 'Aplicado',
          movementDate: this.pendingReceipts.date,
          expirationDate: this.pendingReceipts.receipts.expirationDate,
          period: this.pendingReceipts.receipts.receiptPeriod,
          reference: response.reference,
          valorType: 'EFECTIVO',
          amount: response.amountPaid,
          paymentConcepts: response.paymentConcepts,
          informativeConcepts: response.informativeConcepts,
          currencySymbol: '₡'
        };
      });
  }

  saveFavorite() {
    this.publicServicesService.savePublicServiceFavorite(
      this.publicServiceId,
      this.rechargeFormGroup.controls.phoneNumber.value,
      this.rechargeFormGroup.controls.favorite.value,
      this.keys[0].keyType,
      this.rechargeFormGroup.controls.credixCode.value).subscribe();
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
    this.publicServicesService.checkPendingReceipts(this.publicServiceId, this.phoneNumber.value, this.keys[0].keyType)
      .subscribe(pendingReceipts => {
        if (pendingReceipts?.receipts) {
          this.pendingReceipts = pendingReceipts;
          this.continue();
        } else {
          this.hasReceipts = false;
        }
      });
  }

  setErrorCredixCode() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.rechargeFormGroup.controls.credixCode.setErrors({invalid: true});
      this.rechargeFormGroup.updateValueAndValidity();
    });
  }

  getTags(tags: Tag[]) {
    this.stepOneTitleTag = tags.find(tag => tag.description === 'servicios.stepper1')?.value;
    this.stepTwoTitleTag = tags.find(tag => tag.description === 'servicios.stepper2')?.value;
  }
}
