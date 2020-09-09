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
  data: { publicServicesAccessKeyDescription: string, account: number, publicServiceProvider: string, publicServiceName: string, publicServiceId: number };
  favoritesPaymentDetail: FormControl = new FormControl({value: null, disabled: true});


  constructor(private favoritesManagementService: FavoritesManagementService,
              private favoritesPaymentsService: FavoritesPaymentsService) {
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
        publicServiceId: response.publicServiceId
      };
      this.favoritesPaymentDetail.setValue(response.publicServiceFavoriteName);
      this.getDeleteAlert();
    });
  }

  getDeleteAlert() {
    this.favoritesManagementService.deleteFavorites.subscribe((response) => {
      if (response && this.data.publicServiceId !== undefined) {
        this.setDeleteFavorites(this.data.publicServiceId);
      }
    });
  }

  setDeleteFavorites(publicId: number) {
    this.favoritesPaymentsService.setDeletePublicService(publicId).subscribe((response) => {
      console.log(response);
    });
  }
}
