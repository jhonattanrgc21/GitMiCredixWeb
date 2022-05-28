import {Component, Inject, OnInit} from '@angular/core';
import {PopupReceiptComponent} from './popup-receipt/popup-receipt.component';
import {ModalService} from '../../../../../core/services/modal.service';
import {PublicServicesService} from '../public-services.service';
import { Router } from '@angular/router';
import { AutomaticsService } from '../../favorites-management/automatics/automatics.service';
import { PublicServicesApiService } from 'src/app/core/services/public-services-api.service';

@Component({
  selector: 'app-success-screen',
  templateUrl: './success-screen.component.html',
  styleUrls: ['./success-screen.component.scss']
})
export class SuccessScreenComponent implements OnInit {
  message: string;
  status: 'success' | 'error';
  title: string;
  type: 'Recarga' | 'Servicio';
  currencySymbol: string;
  amount: string;
  contract: string;
  today = new Date();
  quota: number;
  paymentType: string;
  resultAutomatics = false;
  done = false;
  result = null;

  constructor(private publicServicesService: PublicServicesService,
              private modalService: ModalService,
              private router: Router,
              private publicServicesApiService: PublicServicesApiService,
              ) {
  }

  ngOnInit(): void {

    console.log("paymentType: ", this.publicServicesService.paymentType);
    if ( this.publicServicesService?.result ) {
      this.title = this.publicServicesService.result.title;
      this.status = this.publicServicesService.result.status;
      this.message = this.publicServicesService.result.message;
      this.amount = this.publicServicesService.payment.amount;
      this.currencySymbol = this.publicServicesService.payment.currencySymbol;
      this.contract = this.publicServicesService.payment.contract;
      this.type = this.publicServicesService.payment.type;
      this.quota = this.publicServicesService.paymentQuotaSummary.quotaTo;
      this.paymentType = this.publicServicesService.paymentType;
    } else {
      this.router.navigate(['/home/public-services/public-service']);
    }
  }

  addAutomaticPayment() {
    if ( this.publicServicesService?.paymentType === 'Servicio' ) {
      this.publicServicesApiService.publicService = this.publicServicesService.publicServiceData;
      this.router.navigate(['/home/favorites-management/new-automatics']);
    }
  }

  openBillingModal() {
    this.modalService.open({
        title: 'Comprobante',
        data: {
          voucher: this.publicServicesService.voucher
        },
        component: PopupReceiptComponent
      },
      {height: 673, width: 380, disableClose: true, panelClass: 'new-service-receipt'});
  }
}
