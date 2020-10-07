import {Component, OnInit} from '@angular/core';
import {PublicServiceFavoriteByUser} from '../../../../../shared/models/public-service-favorite-by-user';
import {PublicServicesService} from '../public-services.service';
import {PendingReceipts} from '../../../../../shared/models/pending-receipts';
import {getMontByMonthNumber} from '../../../../../shared/utils';
import {ModalService} from '../../../../../core/services/modal.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-favorite-services',
  templateUrl: './favorite-services.component.html',
  styleUrls: ['./favorite-services.component.scss', '../public-services.component.scss']
})
export class FavoriteServicesComponent implements OnInit {
  publicFavoriteService: PublicServiceFavoriteByUser[] = [];
  month: string;
  pendingReceipt: PendingReceipts;
  optionSelected: PublicServiceFavoriteByUser;
  category: string;
  company: string;
  amountOfPay: string;
  paymentSend = false;
  message: string;
  status: 'success' | 'error';
  title: string;
  expirationDate: Date;
  dataResponse: {
    amountPaid: string;
    quotes: string;
    phoneNumber: number;
    date: string;
  };

  tableHeaders = [
    {label: 'Servicios', width: '283px'},
    {label: 'Datos de la factura', width: 'auto'}
  ];

  constructor(private publicService: PublicServicesService,
              private modalService: ModalService) {
    this.pendingReceipt = null;
    this.dataResponse = null;
  }

  ngOnInit(): void {
    this.getFavoritePublicServiceDetail();
  }

  favoriteServiceDetail(favorite: PublicServiceFavoriteByUser) {
    this.optionSelected = favorite;
    this.company = this.publicFavoriteService
      .find(elem => elem.publicServiceId === this.optionSelected.publicServiceId).publicServiceEnterpriseDescription;
    this.publicService.checkPendingReceipts(
      this.optionSelected.publicServiceId, +this.optionSelected.serviceReference, this.optionSelected.publicServiceAccessKeyType)
      .subscribe(pendingReceipt => {
        this.pendingReceipt = pendingReceipt;
        const months: Date = new Date(this.pendingReceipt.date);
        this.month = getMontByMonthNumber(months.getMonth());
        if (this.pendingReceipt.receipts !== null) {
          this.expirationDate = new Date(this.pendingReceipt.receipts.expirationDate);
          this.amountOfPay = this.pendingReceipt.receipts.totalAmount;
        }
      });
  }

  getFavoritePublicServiceDetail() {
    this.publicService.getPublicServicesFavoritesByUser()
      .subscribe((response) => {
        this.publicFavoriteService = response;
        this.category = this.publicFavoriteService.find(elem => elem.publicServiceCategory).publicServiceCategory;
      });
  }

  pay() {
    this.modalService.confirmationPopup('¿Desea realizar esta pago?', '', 380, 203)
      .subscribe((confirm) => {
        if (confirm) {
          if (this.pendingReceipt.receipts !== null) {
            this.publicService.payPublicService(
              this.optionSelected.publicServiceId,
              +this.pendingReceipt.receipts.serviceValue,
              this.pendingReceipt.receipts.totalAmount,
              +this.pendingReceipt.receipts.receiptPeriod,
              this.optionSelected.publicServiceAccessKeyType,
              this.pendingReceipt.receipts.expirationDate,
              this.pendingReceipt.receipts.billNumber)
              .pipe(finalize(() => this.paymentSend = true))
              .subscribe((response) => {
                this.message = response.message;
                this.status = response.type;
                this.title = response.titleOne;

                this.dataResponse = {
                  amountPaid: response.amountPaid,
                  quotes: response.totalPaymentConcepts,
                  phoneNumber: response.reference,
                  date: response.date
                };
              });
          }
        }
      });

  }
}
