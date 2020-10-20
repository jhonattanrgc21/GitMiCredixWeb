import {Component, OnInit} from '@angular/core';
import {PublicServiceFavoriteByUser} from '../../../../../shared/models/public-service-favorite-by-user';
import {PublicServicesService} from '../public-services.service';
import {PendingReceipts} from '../../../../../shared/models/pending-receipts';
import {ConvertStringAmountToNumber, getMontByMonthNumber} from '../../../../../shared/utils';
import {ModalService} from '../../../../../core/services/modal.service';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-favorite-services',
  templateUrl: './favorite-services.component.html',
  styleUrls: ['./favorite-services.component.scss', '../public-services.component.scss']
})
export class FavoriteServicesComponent implements OnInit {
  publicFavoriteService: PublicServiceFavoriteByUser[] = [];
  pendingReceipt: PendingReceipts;
  selectedPublicService: PublicServiceFavoriteByUser;
  month: string;
  hasReceipts = true;
  amountOfPay: string;
  message: string;
  status: 'success' | 'error';
  title: string;
  expirationDate: Date;
  tableHeaders = [
    {label: 'Servicios', width: '283px'},
    {label: 'Datos de la factura', width: 'auto'}
  ];

  constructor(private publicServicesService: PublicServicesService,
              private router: Router,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.getFavoritePublicServiceDetail();
  }

  favoriteServiceDetail(favorite: PublicServiceFavoriteByUser) {
    this.selectedPublicService = favorite;
    this.publicServicesService
      .checkPendingReceipts(favorite.publicServiceId, +favorite.serviceReference, favorite.publicServiceAccessKeyType)
      .subscribe((response) => {
        this.pendingReceipt = response;
        if (this.pendingReceipt === null || this.pendingReceipt.receipts === null) {
          this.hasReceipts = false;
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
    this.publicServicesService.getPublicServicesFavoritesByUser().subscribe(publicServices => {
      this.publicFavoriteService = publicServices;
    });
  }


  openConfirmationModal() {
    this.modalService.confirmationPopup('¿Desea realizar este pago?').subscribe(confirmation => {
      if (confirmation) {
        this.payService();
      }
    });
  }

  payService() {
    if (this.pendingReceipt?.receipts !== null) {
      const amount = ConvertStringAmountToNumber(this.pendingReceipt.receipts.totalAmount).toString();
      this.publicServicesService.payPublicService(
        this.selectedPublicService.publicServiceId,
        +this.pendingReceipt.receipts.serviceValue,
        this.pendingReceipt.currencyCode,
        amount,
        +this.pendingReceipt.receipts.receiptPeriod,
        this.selectedPublicService.publicServiceAccessKeyType,
        this.pendingReceipt.receipts.expirationDate,
        this.pendingReceipt.receipts.billNumber)
        .pipe(finalize(() => this.router.navigate(['/home/public-services/success'])))
        .subscribe((response) => {
          this.publicServicesService.result = {
            status: response.type,
            message: response.descriptionOne,
            title: 'Servicios'
          };

          this.publicServicesService.payment = {
            currencySymbol: this.pendingReceipt.currencyCode === 'COL' ? '₡' : '$',
            amount: this.amountOfPay,
            contract: this.selectedPublicService.serviceReference,
            type: this.selectedPublicService.publicServiceCategory === 'Recargas' ? 'Recarga' : 'Servicio'
          };

          this.publicServicesService.voucher = {
            institution: [{companyCode: response.companyCode, companyName: response.companyName}],
            agreement: [{contractCode: response.contractCode, contractName: response.contractName}],
            agencyCode: response.agencyCode,
            cashier: 'Credix',
            currencyCode: this.pendingReceipt.currencyCode,
            clientName: this.pendingReceipt.clientName,
            billNumber: this.pendingReceipt.receipts.billNumber,
            invoiceNumber: this.pendingReceipt.receipts.receipt,
            channelType: this.pendingReceipt.channelType,
            paymentStatus: 'Aplicado',
            movementDate: this.pendingReceipt.date,
            expirationDate: this.pendingReceipt.receipts.expirationDate,
            period: this.pendingReceipt.receipts.receiptPeriod,
            reference: response.reference,
            valorType: 'EFECTIVO',
            amount: response.amountPaid,
            paymentConcepts: response.paymentConcepts,
            informativeConcepts: response.informativeConcepts,
            currencySymbol: this.pendingReceipt.currencyCode === 'COL' ? '₡' : '$'
          };
        });
    }
  }
}
