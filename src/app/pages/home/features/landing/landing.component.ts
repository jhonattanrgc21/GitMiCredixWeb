import {Component, OnInit} from '@angular/core';
import {LandingService} from './landing.service';
import {Movement} from '../../../../shared/models/Movement';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  paymentDetails: PaymentDetails;
  balances: Balances;
  awards: Awards[] = [];
  movements: Movement[] = [];

  constructor(private landingService: LandingService) {
  }

  ngOnInit(): void {
    this.getHomeContent();
    this.getAccountsSummary();
  }

  getHomeContent() {
    this.landingService.getHomeContent().subscribe(response => {
      this.paymentDetails = {
        currentDate: response.fechaActual,
        nextCutOffDate: response.fechaProximaCorte,
        nextPaymentDate: response.fechaProximaMaximaPago,
        lastCutOffDate: response.ultimaFechaCorte,
        lastPaymentDate: response.ultimaFechaMaximoPago,
        minPaymentColones: response.pagoMinimoActColones,
        minPaymentDollars: response.pagoMinimoActDolares,
        cashPaymentColones: response.pagoContadoColones,
        cashPaymentDollars: response.pagoContadoDolares
      };

      this.movements = response.movements;
      console.log(this.movements);

      response.listBanner.forEach(banner => {
        this.awards.push({
          title: banner.title,
          description: banner.description,
          img: banner.link
        });
      });
    });
  }

  getAccountsSummary() {
    this.landingService.getAccountSummary().subscribe(response => {
      if (response.type === 'success') {
        this.balances = {
          available: response.compra,
          limit: response.compracuotasdisp,
          consumed: response.consumed
        };
      } else {
        this.balances = {
          available: '0',
          limit: '0',
          consumed: '0'
        };
      }
    });
  }

}

export interface PaymentDetails {
  currentDate: string;
  nextCutOffDate: string;
  nextPaymentDate: string;
  lastCutOffDate: string;
  lastPaymentDate: string;
  minPaymentColones: string;
  minPaymentDollars: string;
  cashPaymentColones: string;
  cashPaymentDollars: string;
}

export interface Balances {
  available: string;
  limit: string;
  consumed: string;
}

export interface Awards {
  title: string;
  description: string;
  img: string;
}
