import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PaymentDetails} from '../landing.component';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit, OnChanges {
  @Input() paymentDetails: PaymentDetails;
  startDate: Date;
  endDate: Date;
  cashColonesAmount = 0;
  cashDollarsAmount = 0;
  minColonesAmount = 0;
  minDollarsAmount = 0;
  prefixColones = '₡';
  prefixDollars = '$';

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.paymentDetails.firstChange) {
      this.setDates(this.paymentDetails.nextCutOffDate, this.paymentDetails.nextPaymentDate);
      this.cashColonesAmount = this.paymentDetails.cashPaymentColones;
      this.cashDollarsAmount = this.paymentDetails.cashPaymentDollars;
      this.minColonesAmount = this.paymentDetails.minPaymentColones;
      this.minDollarsAmount = this.paymentDetails.minPaymentDollars;
    }
  }

  setDates(startDateStr: string, endDateStr: string) {

    this.startDate = new Date(
      Number(startDateStr.split('/')[2]),
      Number(startDateStr.split('/')[1]),
      Number(startDateStr.split('/')[0])
    );

    this.endDate = new Date(
      Number(endDateStr.split('/')[2]),
      Number(endDateStr.split('/')[1]),
      Number(endDateStr.split('/')[0])
    );
  }

}
