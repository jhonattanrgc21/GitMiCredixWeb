import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TagsService } from 'src/app/core/services/tags.service';
import { Tag } from 'src/app/shared/models/tag';
import { ConvertStringAmountToNumber } from 'src/app/shared/utils';
import { ConvertNumberToStringAmount } from 'src/app/shared/utils/convert-number-to-string-amount';

@Component({
  selector: 'app-schedule-quotas-third-step',
  templateUrl: './schedule-quotas-third-step.component.html',
  styleUrls: ['./schedule-quotas-third-step.component.scss']
})
export class ScheduleQuotasThirdStepComponent implements OnInit {
  @Input() colonesForm: FormGroup;
  @Input() dollarsForm: FormGroup;
  @Input() isColones: boolean;
  @Input() isDollars: boolean;

  tag1: string;
  tag2: string;
  tag3: string;
  tag4: string;
  tag5: string;
  tag6: string;

  constructor(private tagsService: TagsService,
              private datePipe: DatePipe
              ) { }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
  }

  formatNumberWithCommas(num: string): string {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  formatNumber(value: string): string {
    value = value.replace(/,/g, '.');
    const number = parseFloat(value);
    const result = number === 0.0 ? number.toFixed(0) : number.toString();
    return result.replace('.', ',');
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  getTags(tags: Tag[]) {
    this.tag1 = tags.find(tag => tag.description === 'programarcuotas.stepper3.tag1')?.value;
    this.tag2 = tags.find(tag => tag.description === 'programarcuotas.stepper3.tag2')?.value;
    this.tag3 = tags.find(tag => tag.description === 'programarcuotas.stepper3.tag3')?.value;
    this.tag4 = tags.find(tag => tag.description === 'programarcuotas.stepper3.tag4')?.value;
    this.tag5 = tags.find(tag => tag.description === 'programarcuotas.stepper3.tag5')?.value;
    this.tag6 = tags.find(tag => tag.description === 'programarcuotas.stepper3.tag6')?.value;
  }
}
