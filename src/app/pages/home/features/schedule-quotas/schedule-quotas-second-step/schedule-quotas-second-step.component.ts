import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-quotas-second-step',
  templateUrl: './schedule-quotas-second-step.component.html',
  styleUrls: ['./schedule-quotas-second-step.component.scss']
})
export class ScheduleQuotasSecondStepComponent implements OnInit {
  @Input() currencyCode: number;
  @Input() ruleForm: FormGroup;

  comissionLabel: string;
  interestLabel: string;
  infoLabel: string

  constructor() {
    this.ruleForm = new FormGroup({
      minimumAmount: new FormControl('', [Validators.required]),
      maximumAmount: new FormControl('', [Validators.required]),
      quotas: new FormControl('', [Validators.required]),
      commissions: new FormControl('', [Validators.required]),
      interest: new FormControl('', [Validators.required]),
      initDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.comissionLabel = 'Comisión mensual';
    this.interestLabel = 'Interés mensual';
    this.infoLabel = `Quiero que mis compras en ${this.currencyCode == 188 ? 'colones' : 'dólares'}  entre:`;
  }

}
