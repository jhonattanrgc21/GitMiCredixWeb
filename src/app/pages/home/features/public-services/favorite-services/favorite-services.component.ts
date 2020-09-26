import {Component, OnInit} from '@angular/core';
import {PublicServiceFavoriteByUser} from '../../../../../shared/models/public-service-favorite-by-user';
import {PublicServicesService} from '../public-services.service';
import {PendingReceipts} from '../../../../../shared/models/pending-receipts';
import {getMontByMonthNumber} from '../../../../../shared/utils/getMonthByMonthNumber';
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
    this.dataDetail = null;
    this.dataResponse = null;
  }

  ngOnInit(): void {
    this.getFavoritePublicServiceDetail();
  }

  favoriteServiceDetail(publicServiceId: number, accessKey: number) {
    this.optionSelected = publicServiceId;
    this.company = this.publicFavoriteService
      .find(elem => elem.publicServiceId === publicServiceId).publicServiceEnterpriseDescription;
    this.publicService.checkPendingReceipts(publicServiceId, accessKey)
      .subscribe((response) => {
        this.dataDetail = response;
        const months: Date = new Date(this.dataDetail.date);
        this.month = getMontByMonthNumber(months.getMonth());
        if (this.dataDetail.receipts !== null) {
          this.expirationDate = new Date(this.dataDetail.receipts.find(elem => elem.expirationDate).expirationDate);
          this.amountOfPay = this.dataDetail.receipts.find(elem => elem.totalAmount).totalAmount;
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
          if (this.dataDetail.receipts !== null) {
            this.publicService.payPublicService(this.optionSelected,
              +this.dataDetail.receipts.find(elem => elem.serviceValue).serviceValue,
              this.dataDetail.receipts.find(elem => elem.totalAmount).totalAmount,
              +this.dataDetail.receipts.find(elem => elem.receiptPeriod).receiptPeriod,
              this.dataDetail.receipts.find(elem => elem.expirationDate).expirationDate,
              this.dataDetail.receipts.find(elem => elem.billNumber).billNumber)
              .pipe(finalize(() => this.paymentSend = true))
              .subscribe((response) => {
                console.log(response);
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
