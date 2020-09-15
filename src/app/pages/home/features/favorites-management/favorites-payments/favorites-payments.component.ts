import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FavoritesManagementService} from '../favorites-management.service';
import {FormControl} from '@angular/forms';
import {FavoritesPaymentsService} from './favorites-payments.service';

@Component({
  selector: 'app-favorites-payments',
  templateUrl: './favorites-payments.component.html',
  styleUrls: ['./favorites-payments.component.scss']
})
export class FavoritesPaymentsComponent implements OnInit, AfterViewInit {

  isUpdating = false;
  // tslint:disable-next-line:max-line-length
  data: { publicServicesAccessKeyDescription: string, account: number, publicServiceProvider: string, publicServiceName: string, publicServiceId: number, publicServiceFavoriteName: string, publicServiceFavoriteId: number, accountId: number, publicServiceAccessKeyId: number, publicServiceEnterpriseDescription: string };
  favoritesPaymentDetail: FormControl = new FormControl(null);


  constructor(private favoritesManagementService: FavoritesManagementService,
              private favoritesPaymentsService: FavoritesPaymentsService) {
    // tslint:disable-next-line:max-line-length
    this.data = {
      publicServicesAccessKeyDescription: '',
      account: 0,
      publicServiceProvider: '',
      publicServiceName: '',
      publicServiceId: 0,
      publicServiceFavoriteName: '',
      accountId: 0,
      publicServiceAccessKeyId: 0,
      publicServiceFavoriteId: 0,
      publicServiceEnterpriseDescription: ''
    };
  }

  ngOnInit(): void {
    this.getAccountDetail();
  }

  ngAfterViewInit() {
    this.getUpdateAlert();
    this.getDeleteAlert();
  }

  getAccountDetail() {
    this.favoritesManagementService.favoritesPaymentsData.subscribe(response => {
      this.data = {
        publicServicesAccessKeyDescription: response.publicServiceAccessKeyDescription,
        account: response.accountNumber,
        publicServiceProvider: response.publicServiceProvider,
        publicServiceName: response.publicServiceName,
        publicServiceId: response.publicServiceId,
        publicServiceFavoriteName: response.publicServiceFavoriteName,
        publicServiceFavoriteId: response.publicServiceFavoriteId,
        publicServiceAccessKeyId: response.publicServiceAccessKeyId,
        accountId: response.accountId,
        publicServiceEnterpriseDescription: response.publicServiceEnterpriseDescription
      };
      this.favoritesPaymentDetail.setValue(response.publicServiceFavoriteName);
    });
  }

  getUpdateAlert() {
    this.favoritesManagementService.confirmUpdate.subscribe((response) => {
      if (response.confirm && this.data.publicServiceFavoriteId > 0) {
        this.setUpdateFavorites(this.data.publicServiceFavoriteId, this.favoritesPaymentDetail.value);
      }
    });
  }

  setUpdateFavorites(publicId: number, alias: string) {
    this.favoritesPaymentsService.setUpdatePublicService(publicId, alias).subscribe((response) => {
      if (response.message === 'Operación exitosa') {
        this.favoritesManagementService.emitUpdateSuccessAlert();
      }
    });
  }

  getDeleteAlert() {
    this.favoritesManagementService.deleteFavorites.subscribe((response) => {
      if (response.del && this.data.publicServiceFavoriteId > 0) {
        this.setDeleteFavorites(this.data.publicServiceFavoriteId);
      }
    });
  }

  setDeleteFavorites(publicId: number) {
    this.favoritesPaymentsService.setDeletePublicService(publicId).subscribe((response) => {
      if (response.type === 'success' && response.message === 'Operación exitosa') {
        this.favoritesPaymentsService.emitFavoritesIsAddedOrDelete(false, true);
      }
    });
  }

  updating(event) {
    if (event.key !== '' && event.code !== '') {
      this.favoritesPaymentDetail.valueChanges.subscribe(value => {
        this.favoritesManagementService.updating();
        this.isUpdating = this.favoritesPaymentDetail.valid;
      });
    }
  }
}
