import {Component, OnInit} from '@angular/core';
import {PublicServiceFavoriteByUser} from '../../../../../shared/models/public-service-favorite-by-user';
import {PublicServicesService} from '../public-services.service';
import {PendingReceipts} from '../../../../../shared/models/pending-receipts';
import {ConvertStringAmountToNumber, getMontByMonthNumber} from '../../../../../shared/utils';
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
  optionSelected = 0;
  company: string;
  hasReceipts = true;
  amountOfPay: string;
  paymentSend = false;
  message: string;
  status: 'success' | 'error';
  title: string;
  expirationDate: Date;
  keyType: number;
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
  }

  ngOnInit(): void {
    this.getFavoritePublicServiceDetail();
  }

  favoriteServiceDetail(publicServiceId: number, accessKey: number, keyType: number) {
    this.optionSelected = publicServiceId;
    this.company = this.publicFavoriteService
      .find(elem => elem.publicServiceId === publicServiceId).publicServiceEnterpriseDescription;
    this.keyType = keyType;
    this.publicService.checkPendingReceipts(publicServiceId, accessKey, keyType)
      .subscribe((response) => {
        this.pendingReceipt = response;
        if (this.pendingReceipt === null || this.pendingReceipt.receipts === null) {
          this.hasReceipts = false;
          this.company = null;
          this.expirationDate = null;
          this.pendingReceipt = null;
          this.month = null;
        } else {
          const months: Date = new Date(this.pendingReceipt.date);
          this.month = getMontByMonthNumber(months.getMonth());
          this.expirationDate = new Date(this.pendingReceipt?.receipts.expirationDate);
          this.amountOfPay = this.pendingReceipt.receipts.totalAmount;
          this.hasReceipts = true;
        }
      });
  }

  getFavoritePublicServiceDetail() {
    this.publicService.getPublicServicesFavoritesByUser()
      .subscribe((response) => {
        this.publicFavoriteService = response;
      });
  }

  pay() {
    this.modalService.confirmationPopup('¿Desea realizar esta pago?').subscribe((confirm) => {
      if (confirm) {
        if (this.pendingReceipt?.receipts !== null) {
          const amount = ConvertStringAmountToNumber(this.pendingReceipt.receipts.totalAmount).toString();
          this.publicService.payPublicService(this.optionSelected,
            +this.pendingReceipt.receipts.serviceValue,
            this.pendingReceipt.currencyCode,
            amount,
            +this.pendingReceipt.receipts.receiptPeriod,
            this.keyType,
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
