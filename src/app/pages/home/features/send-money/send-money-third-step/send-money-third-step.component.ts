import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

@Component({
  selector: 'app-send-money-third-step',
  templateUrl: './send-money-third-step.component.html',
  styleUrls: ['./send-money-third-step.component.scss'],
})
export class SendMoneyThirdStepComponent implements OnInit, OnChanges {
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
  step3Subt2;
  step3Tag5;
  step3Tag6;
  step3Tag9;
  step3Tag8;
  step3Tag4;
  step3Tag7;
  step3Tag3;
  step3Tag1;
  step3Tag2;
  step3Subt1;

  constructor(private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Enviar dinero').tags)
    );

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

  getTags(tags: Tag[]) {
    this.step3Subt2 = tags.find(tag => tag.description === 'enviardinero.stepper3.subtitle2').value;
    this.step3Tag5 = tags.find(tag => tag.description === 'enviardinero.stepper3.tag5').value;
    this.step3Tag6 = tags.find(tag => tag.description === 'enviardinero.stepper3.tag6').value;
    this.step3Tag9 = tags.find(tag => tag.description === 'enviardinero.stepper3.tag9').value;
    this.step3Tag8 = tags.find(tag => tag.description === 'enviardinero.stepper3.tag8').value;
    this.step3Tag4 = tags.find(tag => tag.description === 'enviardinero.stepper3.tag4').value;
    this.step3Tag7 = tags.find(tag => tag.description === 'enviardinero.stepper3.tag7').value;
    this.step3Tag3 = tags.find(tag => tag.description === 'enviardinero.stepper3.tag3').value;
    this.step3Tag1 = tags.find(tag => tag.description === 'enviardinero.stepper3.tag1').value;
    this.step3Tag2 = tags.find(tag => tag.description === 'enviardinero.stepper3.tag2').value;
    this.step3Subt1 = tags.find(tag => tag.description === 'enviardinero.stepper3.subtitle1').value;
  }

}
