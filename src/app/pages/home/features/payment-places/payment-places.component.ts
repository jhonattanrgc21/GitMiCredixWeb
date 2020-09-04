import {Component, OnInit} from '@angular/core';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';
import {PaymentPlacesService} from './payment-places.service';

@Component({
  selector: 'app-payment-places',
  templateUrl: './payment-places.component.html',
  styleUrls: ['./payment-places.component.scss']
})
export class PaymentPlacesComponent implements OnInit {
  tabs = [
    {id: 1, name: 'Pagos digitales'},
    {id: 2, name: 'Comercios'},
  ];

  constructor(private paymentPlacesService: PaymentPlacesService,
              private toastService: CredixToastService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  tabSelected(tab) {
    this.router.navigate([tab.id === 1 ? 'home/payment-places/digital-payments' : 'home/payment-places/shops']);
  }

}
