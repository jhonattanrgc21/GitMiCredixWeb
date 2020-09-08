import {Component, OnInit} from '@angular/core';
import {FavoritesManagementService} from '../favorites-management.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-favorites-payments',
  templateUrl: './favorites-payments.component.html',
  styleUrls: ['./favorites-payments.component.scss']
})
export class FavoritesPaymentsComponent implements OnInit {

  showContent = false;
  data: { publicServicesAccessKeyDescription: string, account: number, publicServiceProvider: string, publicServiceName: string };
  favoritesPaymentDetail: FormControl = new FormControl({value: null, disabled: true});


  constructor(private favoritesManagementService: FavoritesManagementService) {
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
        publicServiceName: response.publicServiceName
      };
      this.favoritesPaymentDetail.setValue(response.publicServiceFavoriteName);
    });
  }
}
