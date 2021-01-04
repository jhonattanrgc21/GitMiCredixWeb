import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FavoritesManagementService} from '../favorites-management.service';
import {FormControl} from '@angular/forms';
import {FavoritesPaymentsService} from './favorites-payments.service';
import {PublicServiceFavoriteByUser} from '../../../../../shared/models/public-service-favorite-by-user';

@Component({
  selector: 'app-favorites-payments',
  templateUrl: './favorites-payments.component.html',
  styleUrls: ['./favorites-payments.component.scss']
})
export class FavoritesPaymentsComponent implements OnInit, AfterViewInit {
  favoritePaymentDetailControl: FormControl = new FormControl(null);
  data: PublicServiceFavoriteByUser;
  errorMessage: string;
  deleted = false;

  constructor(private favoritesManagementService: FavoritesManagementService,
              private favoritesPaymentsService: FavoritesPaymentsService) {
  }

  ngOnInit(): void {
    this.getAccountDetail();
  }

  ngAfterViewInit() {
    this.getUpdateAlert();
    this.getDeletedSuccess();
    this.favoritesPublicServiceNameChanged();
  }

  getAccountDetail() {
    this.favoritesManagementService.publicServices.subscribe((response) => {
      this.data = response;
      this.deleted = false;
      this.favoritePaymentDetailControl.setValue(this.data?.publicServiceFavoriteName, {emitEvent: false});
      this.favoritePaymentDetailControl.markAsPristine();
    });
  }

  getUpdateAlert() {
    this.favoritesManagementService.confirmUpdate.subscribe((response) => {
      if (response.confirm && this.data.publicServiceFavoriteId > 0) {
        this.setUpdateFavorites(this.data.publicServiceFavoriteId, this.favoritePaymentDetailControl.value);
      }
    });
  }

  setUpdateFavorites(publicId: number, alias: string) {
    this.favoritesPaymentsService.setUpdatePublicService(publicId, alias).subscribe((response) => {
      if (response.type === 'success') {
        this.favoritesManagementService.emitUpdateSuccessAlert();
      } else {
        this.errorMessage = response.message;
        this.favoritePaymentDetailControl.setErrors({invalid: true});
      }
    });
  }

  favoritesPublicServiceNameChanged() {
    this.favoritePaymentDetailControl.valueChanges.subscribe(() => {
      if (this.favoritePaymentDetailControl.dirty) {
        this.favoritesManagementService.updating();
      }
    });
  }

  getDeletedSuccess() {
    this.favoritesManagementService.deleted.subscribe((response) => {
      this.deleted = response.publicServices;
    });
  }
}
