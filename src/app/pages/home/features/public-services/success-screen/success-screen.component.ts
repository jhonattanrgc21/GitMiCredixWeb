import {Component, OnInit} from '@angular/core';
import {PopupReceiptComponent} from './popup-receipt/popup-receipt.component';
import {ModalService} from '../../../../../core/services/modal.service';
import {PublicServicesService} from '../public-services.service';

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

  constructor(private publicServicesService: PublicServicesService,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.title = this.publicServicesService.result.title;
    this.status = this.publicServicesService.result.status;
    this.message = this.publicServicesService.result.message;
    this.amount = this.publicServicesService.payment.amount;
    this.currencySymbol = this.publicServicesService.payment.currencySymbol;
    this.contract = this.publicServicesService.payment.contract;
    this.type = this.publicServicesService.payment.type;
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
