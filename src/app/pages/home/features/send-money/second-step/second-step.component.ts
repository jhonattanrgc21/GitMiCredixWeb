import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss']
})
export class SecondStepComponent implements OnInit {
  @Input() amountToSendControl: FormControl = new FormControl(null);
  @Input() quotasControl: FormControl = new FormControl(null);
  @Input() detailsControl: FormControl = new FormControl(null);
  @Input() currencyCode = '';
  quotaAmountView = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.amountToSendControl.valueChanges.subscribe(value => {
      this.computeQuotaAmount(value, this.quotasControl.value);
    });

    this.quotasControl.valueChanges.subscribe(value => {
      this.computeQuotaAmount(this.amountToSendControl.value, value);
    });
  }

  computeQuotaAmount(amount: string, quota: number) {
    if (amount && quota) {
      this.quotaAmountView = (Number((+amount / +quota).toFixed(2)));
    } else {
      this.quotaAmountView = 0;
    }
  }
}
