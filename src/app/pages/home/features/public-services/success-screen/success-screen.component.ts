import {Component, OnInit} from '@angular/core';
import {PopupReceiptComponent} from './popup-receipt/popup-receipt.component';
import {ModalService} from '../../../../../core/services/modal.service';
import {PublicServicesService} from '../public-services.service';
import { Router } from '@angular/router';
import { AutomaticsService } from '../../favorites-management/automatics/automatics.service';

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

  constructor(private publicServicesService: PublicServicesService,
              private modalService: ModalService,
              private router: Router,
              private automaticsService: AutomaticsService,) {
  }

  ngOnInit(): void {
    /*if ( this.publicServicesService?.result ) {
      /*this.title = this.publicServicesService.result.title;
      this.status = this.publicServicesService.result.status;
      this.message = this.publicServicesService.result.message;
      this.amount = this.publicServicesService.payment.amount;
      this.currencySymbol = this.publicServicesService.payment.currencySymbol;
      this.contract = this.publicServicesService.payment.contract;
      this.type = this.publicServicesService.payment.type;
      this.quota = this.publicServicesService.paymentQuotaSummary.quotaTo;
    } else {
      this.router.navigate(['/home/public-services/public-service']);
    }*/
    
  }

  /*openModal() {
    console.log("openModal");
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(confirmation => {
      if (confirmation) {
      }
    });
  }*/

  addAutomaticPayment() {
    /*const date: Date = new Date(this.newAutomaticsForm.controls.startDate.value);
    this.modalService.confirmationPopup('¿Desea añadir este pago automático?').subscribe((confirm) => {
      if (confirm) {
        this.automaticsService.setAutomaticsPayment(1,
          this.newAutomaticsControls.publicService.value,
          this.newAutomaticsControls.periodicity.value,
          this.datePipe.transform(date.toISOString(), 'yyyy-MM-dd'),
          +this.newAutomaticsControls.contractControl.value,
          +this.newAutomaticsControls.maxAmount.value,
          this.newAutomaticsControls.nameOfAutomatics.value,
          +this.codeCredix.value,
          this.newAutomaticsControls.keyType.value)
          .pipe(finalize(() => {
            if (!this.codeCredix.hasError('invalid')) {
              this.done = true;
            }
          }))
          .subscribe((response) => {
            this.resultAutomatics = !this.resultAutomatics;
            
            this.result = {
              status: response.type,
              message: response.descriptionOne || response.message,
              title: response.titleOne
            };
          });
        }
      });*/
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
