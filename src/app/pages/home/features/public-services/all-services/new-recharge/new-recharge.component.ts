import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
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
export class NewRechargeComponent implements OnInit, AfterViewInit {
  phoneNumberFormGroup: FormGroup = new FormGroup({
    phoneNumber: new FormControl(null,
      [Validators.required, Validators.minLength(8), Validators.maxLength(8)])
  });
  rechargeFormGroup: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required]),
    favorite: new FormControl(null),
  });
  requestForm: FormGroup = new FormGroup({
    term: new FormControl(null, [Validators.required])
  });
  confirmCodeFormGroup: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required]),
  });
  buttonFormGroup: FormGroup = null;

  amounts: { amount: string, id: number }[] = [
    // {id: 1, amount: '1.000,00'},
    // {id: 2, amount: '2.000,00'},
    // {id: 3, amount: '5.000,00'},
    // {id: 4, amount: '10.000,00'},
    // {id: 5, amount: 'Otro'}
  ];
  stepOneTitleTag: string;
  stepTwoTitleTag: string;
  stepperIndex = 0;
  saveAsFavorite = false;
  hasReceipts = true;
  pendingReceipts: PendingReceipts;
  publicServiceName: string;
  publicServiceId: number;
  name: string;
  message: string;
  keys: Keys[];
  @ViewChild('newRechargeStepper') stepper: CdkStepper;

  constructor(private publicServicesService: PublicServicesService,
              private publicServicesApiService: PublicServicesApiService,
              private modalService: ModalService,
              private credixCodeErrorService: CredixCodeErrorService,
              private tagsService: TagsService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // this.getMinAmounts();
    this.buttonFormGroup = this.phoneNumberFormGroup;

    this.setErrorCredixCode();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Servicios').tags)
    );
  }

  ngAfterViewInit(): void {
    if (this.publicServicesService.pendingReceipt) {
      this.getPublicServiceByFavorite();
    } else {
      this.getPublicService();
    }
    this.cdr.detectChanges();
  }

  getPublicService() {
    if ( this.publicServicesService.publicService ) {
      this.publicServiceId = this.publicServicesService.publicService.publicServiceId;
      this.keys = this.publicServicesService.publicService.keys;
      this.publicServiceName = this.publicServicesService.publicService.publicServiceName;
    } else {
      this.router.navigate(['/home/public-services']);

    }

  }

  getMinAmounts() {
    // this.publicServicesService.getMinAmounts().subscribe(amounts => this.amounts = [...amounts, {id: 10, amount: 'Otro'}]);
  }

  getPublicServiceByFavorite() {
    this.pendingReceipts = this.publicServicesService.pendingReceipt;
    this.phoneNumberFormGroup.controls.phoneNumber.setValue(this.publicServicesService.phoneNumberByFavorite);
    this.publicServiceId = this.publicServicesService.publicServiceIdByFavorite;
    this.keys = this.publicServicesService.keyTypeByFavorite;
    if (this.publicServicesService.pendingReceipt?.amounts) {
      this.amounts = [];
      this.publicServicesService.pendingReceipt.amounts.map((value, index) => {
        this.amounts.push({
          amount: value,
          id: index + 1
        });
      });
      this.amounts.push({id: 10, amount: 'Otro'});
    }
    this.continue();
  }

  openModal() {
    this.modalService.confirmationPopup('¿Desea realizar esta recarga?').subscribe(confirmation => {
      if (confirmation) {
        this.recharge();
      }
    });
  }

  next() {
    if ( this.stepperIndex === 1 ) {
      this.buttonFormGroup = this.confirmCodeFormGroup;
      this.continue();
    } else {
      this.buttonFormGroup = this.rechargeFormGroup;
      this.checkPendingReceipts();
    }
  }

  checkPendingReceipts() {
    this.publicServicesService.checkPendingReceipts(this.publicServiceId, +this.phoneNumberFormGroup.controls.phoneNumber.value, this.keys[0].keyType)
      .pipe(finalize(() => {
        this.message = this.pendingReceipts.responseDescription;
        if (this.pendingReceipts?.receipts) {
          this.continue();
        } else {
          this.hasReceipts = false;
        }
      })).subscribe(pendingReceipts => {
      this.pendingReceipts = pendingReceipts;
      if (this.pendingReceipts?.amounts) {
        this.pendingReceipts.amounts.map((value, index) => {
          this.amounts.push({
            amount: value,
            id: index + 1
          });
        });
        this.amounts.push({id: 10, amount: 'Otro'});
      }
    });
  }

  recharge() {
    /*const receipt = this.pendingReceipts.receipts;
    this.publicServicesService.payPublicService(
      this.pendingReceipts.clientName,
      this.publicServiceId,
      receipt[0].serviceValue,
      this.pendingReceipts.currencyCode,
      this.rechargeFormGroup.controls.amount.value,
      +receipt[0].receiptPeriod,
      this.keys[0].keyType,
      receipt[0].expirationDate,
      receipt[0].billNumber,
      this.rechargeFormGroup.controls.credixCode.value,
      //this.requestForm.controls.term.value,)
      .pipe(finalize(() => {
        if (this.rechargeFormGroup.controls.credixCode.valid) {
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
          currencySymbol: '₡',
          amount: this.rechargeFormGroup.controls.amount?.value,
          contract: this.phoneNumberFormGroup.controls.phoneNumber.value,
          type: 'Recarga',
          quota: 1,
        };

        this.publicServicesService.voucher = {
          institution: [{companyCode: response.companyCode, companyName: response.companyName}],
          agreement: [{contractCode: response.contractCode, contractName: response.contractName}],
          agencyCode: response.agencyCode,
          cashier: 'Credix',
          currencyCode: this.pendingReceipts.currencyCode,
          channelType: this.pendingReceipts.channelType,
          clientName: this.pendingReceipts.clientName,
          billNumber: this.pendingReceipts.receipts[0].billNumber,
          transactionNumber: response.transactionNumber,
          paymentStatus: 'Aplicado',
          movementDate: this.pendingReceipts.date,
          expirationDate: this.pendingReceipts.receipts[0].expirationDate,
          period: this.pendingReceipts.receipts[0].receiptPeriod,
          reference: response.reference,
          valorType: 'EFECTIVO',
          amount: response.amountPaid,
          paymentConcepts: response.paymentConcepts,
          informativeConcepts: response.informativeConcepts,
          currencySymbol: '₡'
        };
      });*/
  }

  saveFavorite() {
    this.publicServicesService.savePublicServiceFavorite(
      this.publicServiceId,
      this.rechargeFormGroup.controls.phoneNumber.value,
      this.rechargeFormGroup.controls.favorite.value,
      this.keys[0].keyType,
      this.confirmCodeFormGroup.controls.credixCode.value).subscribe();
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
      this.rechargeFormGroup.controls.credixCode.setErrors({invalid: true});
      this.rechargeFormGroup.updateValueAndValidity();
    });
  }

  getTags(tags: Tag[]) {
    this.stepOneTitleTag = tags.find(tag => tag.description === 'servicios.stepper1')?.value;
    this.stepTwoTitleTag = tags.find(tag => tag.description === 'servicios.stepper2')?.value;
  }
}
