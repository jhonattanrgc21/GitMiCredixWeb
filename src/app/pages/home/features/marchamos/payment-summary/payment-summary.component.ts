import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-payment-summary',
  templateUrl: './payment-summary.component.html',
  styleUrls: ['./payment-summary.component.scss']
})
export class PaymentSummaryComponent implements OnInit, OnChanges {
  @Input() resultPay: {
    messageToPay: string,
    responseToPay: string,
    totalMount: number,
    quotas: number,
    plateNumber: string,
    firstCouteToPayIn: string
  };
  @Input() responseResultPay: boolean;
  @Output() responseResultPayChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.responseResultPay && this.responseResultPay) {

    }
  }

  doAnotherPay() {
    this.responseResultPayChanged.emit(!this.responseResultPay);
  }

}
