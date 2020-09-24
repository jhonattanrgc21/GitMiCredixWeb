import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PendingReceipts} from '../../../../../shared/models/pending-receipts';
import {finalize} from 'rxjs/operators';
import {ConvertStringDateToDate, getMontByMonthNumber} from '../../../../../shared/utils';
import {PublicServicesService} from '../public-services.service';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModalService} from '../../../../../core/services/modal.service';

@Component({
  selector: 'app-new-recharge',
  templateUrl: './new-recharge.component.html',
  styleUrls: ['./new-recharge.component.scss']
})
export class NewRechargeComponent implements OnInit {
  rechargeFormGroup: FormGroup = new FormGroup({
    phoneNumber: new FormControl(null, [Validators.required]),
    amount: new FormControl(null, [Validators.required, Validators.min(1000)]),
    credixCode: new FormControl(null, [Validators.required]),
  });
  favoriteControl = new FormControl(null);
  amounts: { amount: string, id: number }[] = [
    {id: 1, amount: '1.000,00'},
    {id: 1, amount: '2.000,00'},
    {id: 1, amount: '5.000,00'},
    {id: 1, amount: '10.000,00'},
    {id: 1, amount: 'Otro'},
  ];
  anotherAmount = false;
  saveAsFavorite = false;
  done = false;
  hasReceipts = true;
  pendingReceipts: PendingReceipts;
  publicServiceId: number;
  name: string;
  month: string;
  expirationDate: Date;
  title: string;
  message: string;
  status: 'success' | 'error';
  today = new Date();

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
    });
    // this.getMinAmounts();
  }

  getEnterprise(categoryId: number, enterpriseId: number) {
    this.publicServicesApiService.getPublicServiceEnterpriseByCategory(categoryId).subscribe(publicServiceEnterprises =>
      this.title = publicServiceEnterprises
        .find(enterprise => enterprise.publicServiceEnterpriseId === enterpriseId).publicServiceEnterpriseDescription);
  }

  getMinAmounts() {
    this.publicServicesService.getMinAmounts().subscribe(amounts => this.amounts = [...amounts, {id: 10, amount: 'Otro'}]);
  }

  onCheckboxChanged(checked: boolean) {
    this.saveAsFavorite = checked;
    if (this.saveAsFavorite) {
      this.favoriteControl.setValidators([Validators.required]);
    }
  }

  onAmountChanged(value) {
    if (value !== 'Otro') {
      this.anotherAmount = false;
      this.rechargeFormGroup.controls.amount.setValue(value);
    } else {
      this.anotherAmount = true;
    }
  }

  openModal() {
    this.modalService.confirmationPopup('¿Desea realizar esta recarga?').subscribe(confirmation => {
      if (confirmation) {
        const receipt = this.pendingReceipts.receipts[0];
        this.publicServicesService.payPublicService(
          this.publicServiceId,
          +receipt.serviceValue,
          receipt.totalAmount,
          +receipt.receiptPeriod,
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
    });
  }

  saveFavorite() {
    this.publicServicesService.savePublicServiceFavorite(
      this.publicServiceId,
      this.rechargeFormGroup.controls.phoneNumber.value,
      this.favoriteControl.value,
      this.rechargeFormGroup.controls.credixCode.value).subscribe();
  }

  back() {
    this.router.navigate(['/home/public-services']);
  }

  checkPendingReceipts() {
    this.publicServicesService.checkPendingReceipts(this.publicServiceId, this.rechargeFormGroup.controls.phoneNumber.value)
      .subscribe(pendingReceipts => {
        if (pendingReceipts.receipts) {
          this.pendingReceipts = pendingReceipts;
          this.month = getMontByMonthNumber(ConvertStringDateToDate(pendingReceipts.receipts[0].receiptPeriod).getMonth());
          this.expirationDate = ConvertStringDateToDate(pendingReceipts.receipts[0].expirationDate);
        } else {
          this.hasReceipts = false;
        }
      });
  }

}
