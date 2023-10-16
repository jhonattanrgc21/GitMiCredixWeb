import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TagsService } from 'src/app/core/services/tags.service';
import { Tag } from 'src/app/shared/models/tag';

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

  constructor(private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Programar cuotas').tags));
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
