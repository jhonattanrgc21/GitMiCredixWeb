import {Component, Input, OnInit} from '@angular/core';
import {PersonalCreditService} from '../personal-credit.service';
import {PersonalCreditSummary} from '../../../../../shared/models/personal-credit-summary';

@Component({
  selector: 'app-personal-credit-third-step',
  templateUrl: './personal-credit-third-step.component.html',
  styleUrls: ['./personal-credit-third-step.component.scss']
})
export class PersonalCreditThirdStepComponent implements OnInit {
  @Input() account;
  @Input() term = 0;
  personalCreditSummary: PersonalCreditSummary;
  amount: number;

  constructor(public personalCreditService: PersonalCreditService) {
    this.personalCreditSummary = personalCreditService.personalCreditSummary;
    this.amount = personalCreditService.amount;
  }

  ngOnInit(): void {
  }

}
