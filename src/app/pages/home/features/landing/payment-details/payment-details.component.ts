import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PaymentDetails} from '../landing.component';
import {ConvertStringDateToDate} from '../../../../../shared/utils';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit, OnChanges {
  @Input() paymentDetails: PaymentDetails;
  @Input() paymentDetailsTags = {
    titleTag: 'Detalle de pago',
    cutOffTag: 'Corte',
    maxPaymentDateTag: 'Fecha máxima de pago',
    colonesTag: 'Colones',
    dollarsTag: 'Dólares',
    minTag: 'Mínimo',
    countedTag: 'Contado',
    todayTag: 'Hoy'
  };
  startDate: Date;
  endDate: Date;
  today: Date;
  firstLabel: string;
  secondLabel: string;
  toggleBarColor = false;
  cashColonesAmount = '0';
  cashDollarsAmount = '0';
  minColonesAmount = '0';
  minDollarsAmount = '0';
  prefixColones = '₡';
  prefixDollars = '$';

  constructor() {
    this.today = new Date();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.paymentDetails.firstChange) {
      this.setDates(this.paymentDetails.lastCutOffDate, this.paymentDetails.lastPaymentDate,
        this.paymentDetails.nextCutOffDate, this.paymentDetails.nextPaymentDate);
      this.cashColonesAmount = this.paymentDetails.cashPaymentColones;
      this.cashDollarsAmount = this.paymentDetails.cashPaymentDollars;
      this.minColonesAmount = this.paymentDetails.minPaymentColones;
      this.minDollarsAmount = this.paymentDetails.minPaymentDollars;
    }
  }

  setDates(lastCutOff: string, lastPayment: string, nextCutOff: string, nextPayment: string) {
    const lastCutOffDate = ConvertStringDateToDate(lastCutOff);
    const lastPaymentDate = ConvertStringDateToDate(lastPayment);
    const nextCutOffDate = ConvertStringDateToDate(nextCutOff);
    const nextPaymentDate = ConvertStringDateToDate(nextPayment);

    if (this.today.getTime() > lastPaymentDate.getTime()) {
      this.startDate = lastPaymentDate;
      this.endDate = nextCutOffDate;
      this.firstLabel = this.paymentDetailsTags.maxPaymentDateTag;
      this.secondLabel = this.paymentDetailsTags.cutOffTag;
      this.toggleBarColor = true;
    } else {
      this.startDate = lastCutOffDate;
      this.endDate = lastPaymentDate;
      this.firstLabel = this.paymentDetailsTags.cutOffTag;
      this.secondLabel = this.paymentDetailsTags.maxPaymentDateTag;
      this.toggleBarColor = false;
    }
  }

}
