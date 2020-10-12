import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FavoritesManagementService} from '../favorites-management.service';
import {FormControl} from '@angular/forms';
import {FavoritesPaymentsService} from './favorites-payments.service';
import {ToastData} from '../../../../../shared/components/credix-toast/credix-toast-config';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {PublicServiceFavoriteByUser} from '../../../../../shared/models/public-service-favorite-by-user';

@Component({
  selector: 'app-favorites-payments',
  templateUrl: './favorites-payments.component.html',
  styleUrls: ['./favorites-payments.component.scss']
})
export class FavoritesPaymentsComponent implements OnInit, AfterViewInit {

  data: PublicServiceFavoriteByUser;
  favoritesPaymentDetail: FormControl = new FormControl(null);


  constructor(private favoritesManagementService: FavoritesManagementService,
              private favoritesPaymentsService: FavoritesPaymentsService,
              private toastService: CredixToastService) {
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
      this.favoritesPaymentDetail.setValue(this.data?.publicServiceFavoriteName, {emitEvent: false});
      this.favoritesPaymentDetail.markAsPristine();
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
      const data: ToastData = {
        text: response.message,
        type: response.type,
      };

      this.toastService.show(data);
      if (response.message === 'Operación exitosa') {
        this.favoritesManagementService.emitUpdateSuccessAlert();
      }
    });
  }

  favoritesPublicServiceNameChanged() {
    this.favoritesPaymentDetail.valueChanges.subscribe(() => {
      if (this.favoritesPaymentDetail.dirty) {
        this.favoritesManagementService.updating();
      }
      });
    }

  getDeletedSuccess() {
    this.favoritesManagementService.deleted
      .subscribe((response) => {
          if (response.automatics) {
            this.data = null;
          }
      });
    }
  }
