import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PendingReceipts} from '../../../../../shared/models/pending-receipts';
import {finalize} from 'rxjs/operators';
import {PublicServicesService} from '../public-services.service';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../../core/services/modal.service';
import {Keys} from '../../../../../shared/models/keys';

@Component({
  selector: 'app-new-recharge',
  templateUrl: './new-recharge.component.html',
  styleUrls: ['./new-recharge.component.scss']
})
export class NewRechargeComponent implements OnInit {
  rechargeFormGroup: FormGroup = new FormGroup({
    phoneNumber: new FormControl(null, [Validators.required]),
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
  anotherAmount = false;
  saveAsFavorite = false;
  done = false;
  hasReceipts = true;
  pendingReceipts: PendingReceipts;
  publicServiceId: number;
  name: string;
  title: string;
  message: string;
  status: 'success' | 'error';
  keys: Keys[];
  quantityOfKeys: number;
  today = new Date();

  constructor(private publicServicesService: PublicServicesService,
              private publicServicesApiService: PublicServicesApiService,
              private router: Router,
              private modalService: ModalService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getMinAmounts();
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

    });
  }

  getMinAmounts() {
    this.publicServicesService.getMinAmounts().subscribe(amounts => this.amounts = [...amounts, {id: 10, amount: 'Otro'}]);
  }

  onCheckboxChanged(checked: boolean) {
    this.saveAsFavorite = checked;
    this.rechargeFormGroup.controls.favorite.reset();
    if (this.saveAsFavorite) {
      this.rechargeFormGroup.controls.favorite.setValidators([Validators.required]);
    } else {
      this.rechargeFormGroup.controls.favorite.clearValidators();
    }
    this.rechargeFormGroup.controls.favorite.updateValueAndValidity();
  }

  onAmountChanged(value) {
    if (value !== 'Otro') {
      this.anotherAmount = false;
      this.rechargeFormGroup.controls.amount.setValidators([Validators.required]);
      this.rechargeFormGroup.controls.amount.setValue(value);
    } else {
      this.rechargeFormGroup.controls.amount.reset();
      this.rechargeFormGroup.controls.amount.setValidators([Validators.required, Validators.min(1000)]);
      this.anotherAmount = true;
    }
    this.rechargeFormGroup.controls.amount.updateValueAndValidity();
  }

  openModal() {
    this.modalService.confirmationPopup('¿Desea realizar esta recarga?').subscribe(confirmation => {
      if (confirmation) {
        this.checkPendingReceipts();
      }
    });
  }

  recharge() {
    const receipt = this.pendingReceipts.receipts[0];
    this.publicServicesService.payPublicService(
      this.publicServiceId,
      +receipt.serviceValue,
      this.rechargeFormGroup.controls.amount.value,
      +receipt.receiptPeriod,
      null,
      receipt.expirationDate,
      receipt.billNumber)
      .pipe(finalize(() => this.done = true))
      .subscribe(response => {
        this.status = response.type;
        this.message = response.responseDescription || response.message;
        if (response.type === 'success' && this.saveAsFavorite) {
          this.saveFavorite();
        }
      });
  }

  saveFavorite() {
    this.publicServicesService.savePublicServiceFavorite(
      this.publicServiceId,
      this.rechargeFormGroup.controls.phoneNumber.value,
      this.rechargeFormGroup.controls.favorite.value,
      this.rechargeFormGroup.controls.credixCode.value).subscribe(result => {
      if (result.status && result.status === 406) {
        this.rechargeFormGroup.controls.credixCode.setErrors({invalid: true});
        this.rechargeFormGroup.updateValueAndValidity();
      }
    });
  }

  back() {
    this.router.navigate(['/home/public-services']);
  }

  checkPendingReceipts() {
    this.publicServicesService.checkPendingReceipts(this.publicServiceId, this.rechargeFormGroup.controls.phoneNumber.value)
      .subscribe(pendingReceipts => {
        if (pendingReceipts.receipts) {
          this.pendingReceipts = pendingReceipts;
          this.recharge();
        } else {
          this.hasReceipts = false;
        }
      });
  }

}
