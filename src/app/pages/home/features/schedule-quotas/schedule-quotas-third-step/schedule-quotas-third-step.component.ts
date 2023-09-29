import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

}
