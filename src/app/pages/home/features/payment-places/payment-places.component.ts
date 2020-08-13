import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {CredixToastService} from '../../../../core/services/credix-toast.service';

@Component({
  selector: 'app-payment-places',
  templateUrl: './payment-places.component.html',
  styleUrls: ['./payment-places.component.scss']
})
export class PaymentPlacesComponent implements OnInit {
  paymentPlaces: string[];
  contador = 0;
  tabs = [
    {id: 1, name: 'Comercios'},
    {id: 2, name: 'Pago digitales'},
  ];
  options = [];
  details = [{id: 1, name: 'Detalles 1'}];
  tabShow = 1;
  tooltip = 'Copiar';

  constructor(private httpService: HttpService, private toastService: CredixToastService) {
  }

  ngOnInit(): void {
    this.getPaymentPlaces();
  }

  tabSelected(tab) {
    if (tab.id === 1) {
      this.tabShow = 1;
    } else {
      this.tabShow = 0;
    }
  }

  getPaymentPlaces() {
    this.httpService.post('canales', 'paymentplace/getpaymentplace')
      .subscribe(resp => {
        this.paymentPlaces = resp.paymentPlace;

        this.paymentPlaces.forEach(async paymentPlace => {
          await this.getPaymentPlaceRestriction(paymentPlace);
        });
      });
  }

  getPaymentPlaceRestriction(paymentPlace) {
    this.httpService.post('canales', 'paymentplace/getpaymentplacerestriction', {
      channelId: 102,
      name: paymentPlace.name
    })
      .subscribe(resp => {
        this.contador += 1;
        paymentPlace.restrictions = resp.paymentPlace;

        this.options = [...this.options,{
          id: this.contador,
          priority: paymentPlace.priority,
          name: paymentPlace.name,
          img: paymentPlace.linkImage,
          restrictions: resp.paymentPlace
        }];

      });
  }

  copyIbanAccount(text: string) {
    this.toastService.show({text, type: 'success'});
  }

}
