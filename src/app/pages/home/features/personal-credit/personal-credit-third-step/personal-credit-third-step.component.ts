import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PersonalCreditService} from '../personal-credit.service';
import {PersonalCreditSummary} from '../../../../../shared/models/personal-credit-summary';

@Component({
  selector: 'app-personal-credit-third-step',
  templateUrl: './personal-credit-third-step.component.html',
  styleUrls: ['./personal-credit-third-step.component.scss']
})
export class PersonalCreditThirdStepComponent implements OnInit, OnChanges {
  @Input() account;
  @Input() term = 0;
  @Input() isActive = false;
  personalCreditSummary: PersonalCreditSummary;
  amount: number;

  constructor(private personalCreditService: PersonalCreditService) {

  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive) {
      this.personalCreditSummary = this.personalCreditService.personalCreditSummary;
      this.amount = this.personalCreditService.amount;
    }
  }

}
