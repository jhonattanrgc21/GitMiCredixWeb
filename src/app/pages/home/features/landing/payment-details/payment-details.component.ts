import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  startDateOne = new Date(2020, 7, 2);
  endDateOne = new Date(2020, 8, 30);
  value = 166409.06;
  prefixColones = '₡';
  prefixDollars = '$';

  constructor() {
  }

  ngOnInit(): void {
  }

}
