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
  dataDetail: PendingReceipts;
  optionSelected = 0;
  company: string;
  hasReceipts: boolean;
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
    this.dataDetail = null;
    this.dataResponse = null;
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
        this.dataDetail = response;
        const months: Date = new Date(this.dataDetail.date);
        this.month = getMontByMonthNumber(months.getMonth());
        if (this.dataDetail.receipts === null || response.type === 'error') {
          this.hasReceipts = false;
          this.company = null;
          this.expirationDate = null;
          this.dataDetail = null;
          this.month = null;
        } else {
          this.expirationDate = new Date(this.dataDetail?.receipts.expirationDate);
          this.amountOfPay = this.dataDetail.receipts.totalAmount;
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
    this.modalService.confirmationPopup('¿Desea realizar esta pago?', '', 380, 203)
      .subscribe((confirm) => {
        if (confirm) {
          if (this.dataDetail.receipts !== null) {
            const amount = ConvertStringAmountToNumber(this.dataDetail.receipts.totalAmount).toString();
            this.publicService.payPublicService(this.optionSelected,
              +this.dataDetail.receipts.serviceValue,
              amount,
              +this.dataDetail.receipts.receiptPeriod,
              this.keyType,
              this.dataDetail.receipts.expirationDate,
              this.dataDetail.receipts.billNumber)
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
