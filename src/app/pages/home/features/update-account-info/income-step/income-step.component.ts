import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'income-step-component',
  templateUrl: './income-step.component.html',
  styleUrls: ['./income-step.component.scss']
})
export class IncomeStepComponent implements OnInit {
  @Input() IncomeStepFormGroup: FormGroup

  constructor() { }

  ngOnInit(): void { }
}
