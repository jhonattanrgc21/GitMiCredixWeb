import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';

@Component({
  selector: 'app-payment-places',
  templateUrl: './payment-places.component.html',
  styleUrls: ['./payment-places.component.scss']
})
export class PaymentPlacesComponent implements OnInit {
  paymentPlaces:string[];
  contador = 0;
  tabs = [
    {id: 1, name: 'Comercios'},
    {id: 2, name: 'Pago digitales'},
  ];
  options = [];
  details=[{id: 1, name: 'Detalles 1'}]
  tab_show = 1;
  tooltip = "Copiar";
  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getPaymentPlaces();
  }

  tabSelected(tab) {
    if(tab.id == 1){
      this.tab_show=1
    }else{
      this.tab_show=0
    }
  }
  change(){
    this.tooltip = "Copiado";
  }
  getPaymentPlaces(){
    this.httpService.post('canales', 'paymentplace/getpaymentplace')
      .subscribe(resp =>{
        this.paymentPlaces = resp.paymentPlace;
        this.paymentPlaces.forEach(paymentPlace => {
          this.getPaymentPlaceRestriction(paymentPlace);
        });
        console.log(this.paymentPlaces);
      });
  }

  getPaymentPlaceRestriction(paymentPlace){
    this.httpService.post('canales', 'paymentplace/getpaymentplacerestriction', {
      channelId : 102,
      name : paymentPlace.name
    })
      .subscribe(resp =>{
        this.contador+=1;
        paymentPlace.restrictions = resp.paymentPlace;
        this.options.push({id: this.contador, name: paymentPlace.name, img: `../../../../../assets/images/${paymentPlace.name}.png`})
      });
  }

}
