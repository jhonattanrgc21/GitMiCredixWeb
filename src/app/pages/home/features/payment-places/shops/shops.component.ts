import {Component, OnInit} from '@angular/core';
import {PaymentPlace} from '../../../../../shared/models/payment-place';
import {PaymentPlacesService} from '../payment-places.service';
import {PaymentPlaceDetail} from '../../../../../shared/models/payment-place-detail';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {
  tableHeaders = [
    {label: 'Comercios', width: '170px'},
    {label: 'Información del comercio', width: 'auto'}
  ];
  paymentPlaces: PaymentPlace[];
  paymentPlaceDetail: PaymentPlaceDetail;
  firstSubtitleTag: string;
  secondSubtitleTag: string;

  constructor(private paymentPlacesService: PaymentPlacesService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Lugares de pago').tags));
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
    });
  }

  getTags(tags: Tag[]) {
    this.firstSubtitleTag = tags.find(tag => tag.description === 'lugares.tab1.subtitle1')?.value;
    this.secondSubtitleTag = tags.find(tag => tag.description === 'lugares.tab1.subtitle2')?.value;
  }
}
