import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

@Component({
  selector: 'app-buy-without-card-first-step',
  templateUrl: './buy-without-card-first-step.component.html',
  styleUrls: ['./buy-without-card-first-step.component.scss']
})
export class BuyWithoutCardFirstStepComponent implements OnInit {
  @Input() credixCode: FormControl = new FormControl(null, [Validators.required]);
  step1: string;

  constructor(private tagsService: TagsService) {

  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Compra sin tarjeta').tags)
    );
  }

  getTags(tags: Tag[]) {
    this.step1 = tags.find(tag => tag.description === 'compra.stepper1')?.value;
}

}
