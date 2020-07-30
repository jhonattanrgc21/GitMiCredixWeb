import {Component, OnInit} from '@angular/core';
import {LandingService} from './landing.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  paymentDetails: PaymentDetails;

  constructor(private landingService: LandingService) {
  }

  ngOnInit(): void {
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
    });
  }

}

export interface PaymentDetails {
  currentDate: string;
  nextCutOffDate: string;
  nextPaymentDate: string;
  lastCutOffDate: string;
  lastPaymentDate: string;
  minPaymentColones: number;
  minPaymentDollars: number;
  cashPaymentColones: number;
  cashPaymentDollars: number;
}
