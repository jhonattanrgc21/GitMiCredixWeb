import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-schedule-quotas-first-step',
  templateUrl: './schedule-quotas-first-step.component.html',
  styleUrls: ['./schedule-quotas-first-step.component.scss']
})
export class ScheduleQuotasFirstStepComponent implements OnInit {

  @Input() disableNextStepControl: FormControl;
  @Output() dollarsOption = new EventEmitter<boolean>()
  @Output() colonesOption = new EventEmitter<boolean>()
  
  currencyList: any[] = [
    {
      code: 188,
      description: 'Colones',
      isSelected: false,
    },
    {
      code: 840,
      description: 'Dólares',
      isSelected: false,
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  getValueCheckBoxes(isChecked: boolean, item: any) {
    item.isSelected = isChecked;
    if(item.code == 188) this.colonesOption.emit(item.isSelected);
    else this.dollarsOption.emit(item.isSelected);

    if(this.currencyList.filter(item => item.isSelected == false).length == 2){
      this.disableNextStepControl.setValue(true);
    }
    else{
      this.disableNextStepControl.setValue(false);
    }
  }
}
