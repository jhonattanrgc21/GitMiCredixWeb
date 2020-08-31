import {Component, OnInit} from '@angular/core';
import {PaymentPlace} from '../../../../../shared/models/payment-place';
import {PaymentPlacesService} from '../payment-places.service';
import {PaymentPlaceDetail} from '../../../../../shared/models/payment-place-detail';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  tableHeaders = [
    {label: 'Comercios', width: '170px'},
    {label: 'Información del comercio', width: '100%'}
  ];
  paymentPlaces: PaymentPlace[];
  paymentPlaceDetail: PaymentPlaceDetail;

  constructor(private paymentPlacesService: PaymentPlacesService) {
  }

  ngOnInit(): void {
    this.getPaymentPlaces();
  }

  getPaymentPlaces() {
    this.paymentPlacesService.getPaymentPlaces().subscribe(paymentPlaces => {
      this.paymentPlaces = paymentPlaces;
    });
  }

  getPaymentPlaceDetail(paymentPlace: PaymentPlace) {
    this.paymentPlacesService.getPaymentPlaceRestriction(paymentPlace.name).subscribe(paymentPlaceDetail => {
      this.paymentPlaceDetail = {
        name: paymentPlace.name,
        linkFacebook: paymentPlaceDetail.linkFacebook,
        webPage: paymentPlaceDetail.webPage,
        paymentPlaceRestriction: paymentPlaceDetail.paymentPlaceRestriction
      };
      console.log(paymentPlaceDetail);
      console.log(this.paymentPlaceDetail);

    });
  }
}
