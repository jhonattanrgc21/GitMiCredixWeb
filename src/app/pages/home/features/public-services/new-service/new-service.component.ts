import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkStepper} from '@angular/cdk/stepper';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {PublicServicesService} from '../public-services.service';
import {ConvertStringDateToDate, getMontByMonthNumber} from '../../../../../shared/utils';
import {PendingReceipts} from '../../../../../shared/models/pending-receipts';
import {ModalService} from '../../../../../core/services/modal.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./new-service.component.scss']
})
export class NewServiceComponent implements OnInit {
  contractControl = new FormControl(null, [Validators.required]);
  confirmFormGroup: FormGroup = new FormGroup({
    credixCode: new FormControl(null, [Validators.required]),
    favorite: new FormControl(null)
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
    });
  }

  getEnterprise(categoryId: number, enterpriseId: number) {
    this.publicServicesApiService.getPublicServiceEnterpriseByCategory(categoryId).subscribe(publicServiceEnterprises =>
      this.title = publicServiceEnterprises
        .find(enterprise => enterprise.publicServiceEnterpriseId === enterpriseId).publicServiceEnterpriseDescription);
  }

  openModal() {
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(confirmation => {
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
      this.contractControl.value,
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
    this.publicServicesService.checkPendingReceipts(this.publicServiceId, this.contractControl.value).subscribe(pendingReceipts => {
      if (pendingReceipts.receipts) {
        this.pendingReceipts = pendingReceipts;
        this.month = getMontByMonthNumber(ConvertStringDateToDate(pendingReceipts.receipts[0].receiptPeriod).getMonth());
        this.expirationDate = ConvertStringDateToDate(pendingReceipts.receipts[0].expirationDate);
        this.currencySymbol = pendingReceipts.currencyCode === 'COL' ? '₡' : '$';
        this.continue();
      } else {
        this.hasReceipts = false;
      }
    });
  }
}
