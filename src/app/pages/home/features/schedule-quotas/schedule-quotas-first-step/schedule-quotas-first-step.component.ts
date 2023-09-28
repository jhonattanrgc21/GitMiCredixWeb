import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-schedule-quotas-first-step',
  templateUrl: './schedule-quotas-first-step.component.html',
  styleUrls: ['./schedule-quotas-first-step.component.scss']
})
export class ScheduleQuotasFirstStepComponent implements OnInit {

  @Input() currencyForm: FormGroup;
  @Input() currencyList: any[];
  @Output() dollarsOption = new EventEmitter<boolean>()
  @Output() colonesOption = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  getValueCheckBoxes(isChecked: boolean, item: any) {
    item.isSelected = isChecked;
    if(item.code == 188)
    {
      this.currencyForm.get('colones').setValue(item.isSelected);
      this.colonesOption.emit(item.isSelected);
    }
    else{
      this.currencyForm.get('dollars').setValue(item.isSelected);
      this.dollarsOption.emit(item.isSelected);
    }
  }
}
