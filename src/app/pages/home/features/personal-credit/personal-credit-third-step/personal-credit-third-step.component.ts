import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PersonalCreditService} from '../personal-credit.service';
import {PersonalCreditSummary} from '../../../../../shared/models/personal-credit-summary';
import {Tag} from '../../../../../shared/models/tag';
import {TagsService} from '../../../../../core/services/tags.service';

@Component({
  selector: 'app-personal-credit-third-step',
  templateUrl: './personal-credit-third-step.component.html',
  styleUrls: ['./personal-credit-third-step.component.scss']
})
export class PersonalCreditThirdStepComponent implements OnInit, OnChanges {
  @Input() account;
  @Input() term = 0;
  @Input() isActive = false;
  ibanTag: string;
  tagCheque: string;
  subtitleTag1: string;
  amountTag: string;
  subtitleTag2: string;
  quotesTag: string;
  totalTag: string;
  plazoTag: string;
  personalCreditSummary: PersonalCreditSummary;
  amount: number;

  constructor(private personalCreditService: PersonalCreditService,
              private tagsService: TagsService) {

  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Crédito personal').tags)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.isActive && this.isActive) {
      this.personalCreditSummary = this.personalCreditService.personalCreditSummary;
      this.amount = this.personalCreditService.amount;
    }
  }

  getTags(tags: Tag[]) {
    this.ibanTag = tags.find(tag => tag.description === 'credito.stepper3.iban')?.value;
    this.tagCheque = tags.find(tag => tag.description === 'credito.stepper3.tagcheque')?.value;
    this.amountTag = tags.find(tag => tag.description === 'credito.stepper3.monto')?.value;
    this.plazoTag = tags.find(tag => tag.description === 'credito.stepper3.plazo')?.value;
    this.quotesTag = tags.find(tag => tag.description === 'credito.stepper3.cuota')?.value;
    this.totalTag = tags.find(tag => tag.description === 'credito.stepper3.total')?.value;
    this.subtitleTag1 = tags.find(tag => tag.description === 'credito.stepper3.subtitle1')?.value;
    this.subtitleTag2 = tags.find(tag => tag.description === 'credito.stepper3.subtitle2')?.value;
  }

}
