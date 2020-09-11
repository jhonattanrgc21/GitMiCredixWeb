import {Component, OnInit} from '@angular/core';
import {FavoritesManagementService} from '../favorites-management.service';
import {FormControl} from '@angular/forms';
import {FavoritesPaymentsService} from './favorites-payments.service';

@Component({
  selector: 'app-favorites-payments',
  templateUrl: './favorites-payments.component.html',
  styleUrls: ['./favorites-payments.component.scss']
})
export class FavoritesPaymentsComponent implements OnInit {

  showContent = false;
  // tslint:disable-next-line:max-line-length
  data: { publicServicesAccessKeyDescription: string, account: number, publicServiceProvider: string, publicServiceName: string, publicServiceId: number, publicServiceFavoriteName: string };
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
      publicServiceFavoriteName: ''
    };
  }

  ngOnInit(): void {
    this.getAccountDetail();
  }

  getAccountDetail() {
    this.favoritesManagementService.favoritesPaymentsData.subscribe(response => {
      this.showContent = !this.showContent;
      this.data = {
        publicServicesAccessKeyDescription: response.publicServiceAccessKeyDescription,
        account: response.accountNumber,
        publicServiceProvider: response.publicServiceProvider,
        publicServiceName: response.publicServiceName,
        publicServiceId: response.publicServiceId,
        publicServiceFavoriteName: response.publicServiceFavoriteName
      };
      this.favoritesPaymentDetail.setValue(response.publicServiceFavoriteName);
      this.getDeleteAlert();
    });
  }

  getDeleteAlert() {
    this.favoritesManagementService.deleteFavorites.subscribe((response) => {
      if (response.del && this.data.publicServiceId !== undefined) {
        this.setDeleteFavorites(this.data.publicServiceId);
      }
    });
  }

  setDeleteFavorites(publicId: number) {
    this.favoritesPaymentsService.setDeletePublicService(publicId).subscribe((response) => {
      if (response.type === 'success' && response.message === 'Operación exitosa') {
        this.favoritesPaymentsService.emitFavoritesIsDeleted(true);
      }
    });
  }
}
