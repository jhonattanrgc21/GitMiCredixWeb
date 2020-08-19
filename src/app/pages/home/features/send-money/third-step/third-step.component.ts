import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss'],
})
export class ThirdStepComponent implements OnInit, OnChanges {
  @Input() codeControl: FormControl = new FormControl(null);
  @Input() account;
  @Input() timeLimit: number;
  @Input() amount: number;
  @Input() commissionRate: number;
  @Input() currencyPrefix: string;
  @Input() total: number;
  @Input() commission: number;
  quotaAmountView: number;
  iva: number;

  constructor() {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.amount && this.timeLimit) {
      this.quotaAmountView = Number(
        (+this.amount / +this.timeLimit).toFixed(2)
      );
    } else {
      this.quotaAmountView = 0;
    }
    this.iva = this.commission * 0.13;
  }

}
