import { Component, EventEmitter, OnInit, Output, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TagsService } from 'src/app/core/services/tags.service';
import { Currency } from 'src/app/shared/models/programmed-rule';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-schedule-quotas-first-step',
  templateUrl: './schedule-quotas-first-step.component.html',
  styleUrls: ['./schedule-quotas-first-step.component.scss']
})
export class ScheduleQuotasFirstStepComponent implements OnInit, OnChanges {

  @Input() disableNextStepControl: FormControl;
  @Input() currencyList: Currency[] = [];
  @Output() dollarsOption = new EventEmitter<boolean>()
  @Output() colonesOption = new EventEmitter<boolean>()

  info: string;

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
  }

  ngOnChanges(simple: SimpleChanges) {
    if ( simple.displayValue?.currentValue) {
        this.currencyList = simple.displayValue?.currentValue;
    }
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

  getTags(tags: Tag[]) {
    this.info = tags.find(tag => tag.description === 'programarcuotas.stepper1.tag')?.value;
  }
}
