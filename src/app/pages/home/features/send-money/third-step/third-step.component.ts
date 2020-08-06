import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FavoriteIbanAccount} from '../../../../../shared/models/favorite-iban-account';

@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss']
})
export class ThirdStepComponent implements OnInit, OnChanges {
  @Input() codeControl: FormControl = new FormControl(null);
  @Input() account: FavoriteIbanAccount;
  @Input() timeLimit: number;
  @Input() amount: number;
  @Input() currencyPrefix: string;
  quotaAmountView: number;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.amount && this.timeLimit) {
      this.quotaAmountView = (Number((+this.amount / +this.timeLimit).toFixed(2)));
    } else {
      this.quotaAmountView = 0;
    }
  }

}
