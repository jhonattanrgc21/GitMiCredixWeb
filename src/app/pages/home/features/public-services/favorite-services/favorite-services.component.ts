import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class FavoriteServicesComponent implements OnInit, OnDestroy {
  publicFavoriteService: PublicServiceFavoriteByUser[] = [];
  pendingReceipt: PendingReceipts;
  selectedPublicService: PublicServiceFavoriteByUser;
  month: string;
  showMessage = false;
  hasReceipts = false;
  amountOfPay: string;
  message: string;
  status: 'info' | 'error';
  title: string;
  expirationDate: Date;
  tableHeaders = [
    {label: 'Servicios', width: '283px'},
    {label: 'Datos de la factura', width: 'auto'}
  ];
  isRecharge: boolean;

  constructor(private publicServicesService: PublicServicesService,
              private router: Router,
              private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.getFavoritePublicServiceDetail();
  }

  publicServiceChange(favorite: PublicServiceFavoriteByUser) {
    this.selectedPublicService = favorite;
    this.isRecharge = this.selectedPublicService.publicServiceCategory === 'Recargas';
    this.publicServicesService.publicServiceIdByFavorite = favorite.publicServiceId;
    this.publicServicesService.phoneNumberByFavorite = favorite.serviceReference;
    this.publicServicesService.keyTypeByFavorite = [{
      description: favorite.publicServiceAccessKeyDescription,
      keyType: favorite.publicServiceAccessKeyType
    }];
    this.showMessage = false;
    this.hasReceipts = false;
    this.getFavoriteServiceDetail();
  }

  getFavoriteServiceDetail() {
    this.publicServicesService.checkPendingReceipts(
      this.selectedPublicService.publicServiceId,
      +this.selectedPublicService.serviceReference,
      this.selectedPublicService.publicServiceAccessKeyType)
      .subscribe((response) => {
        this.pendingReceipt = response;
        this.hasReceipts = this.pendingReceipt?.receipts !== null && this.pendingReceipt?.receipts.length > 0;
        this.status = this.pendingReceipt ? 'info' : 'error';
        this.message = this.status === 'error' ? 'Oops...' : this.pendingReceipt?.responseDescription;
        this.showMessage = this.status === 'error' || (this.pendingReceipt !== null && !this.hasReceipts);

        if (this.pendingReceipt && this.pendingReceipt.receipts !== null) {
          const months: Date = new Date(this.pendingReceipt.date);
          this.month = getMontByMonthNumber(months.getMonth());
          this.expirationDate = new Date(this.pendingReceipt.receipts[0].expirationDate);
          this.amountOfPay = this.pendingReceipt.receipts[0].totalAmount;
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
        if (this.isRecharge) {
          this.publicServicesService.pendingReceipt = this.pendingReceipt;
          this.router.navigate(['/home/public-services/recharge']);
        } else {
          this.payService();
        }
      }
    });
  }

  payService() {
    if (this.pendingReceipt?.receipts !== null) {
      const amount = ConvertStringAmountToNumber(this.pendingReceipt.receipts[0].totalAmount).toString();
      this.publicServicesService.payPublicService(
        this.pendingReceipt.clientName,
        this.selectedPublicService.publicServiceId,
        +this.pendingReceipt.receipts[0].serviceValue,
        this.pendingReceipt.currencyCode,
        amount,
        +this.pendingReceipt.receipts[0].receiptPeriod,
        this.selectedPublicService.publicServiceAccessKeyType,
        this.pendingReceipt.receipts[0].expirationDate,
        this.pendingReceipt.receipts[0].billNumber)
        .pipe(finalize(() => this.router.navigate(['/home/public-services/success'])))
        .subscribe((response) => {
          this.publicServicesService.result = {
            status: response.type,
            message: response.descriptionOne || response.message,
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
            billNumber: this.pendingReceipt.receipts[0].billNumber,
            transactionNumber: response.transactionNumber,
            channelType: this.pendingReceipt.channelType,
            paymentStatus: 'Aplicado',
            movementDate: this.pendingReceipt.date,
            expirationDate: this.pendingReceipt.receipts[0].expirationDate,
            period: this.pendingReceipt.receipts[0].receiptPeriod,
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

  ngOnDestroy(): void {
    this.publicServicesService.unsubscribe();
  }
}
