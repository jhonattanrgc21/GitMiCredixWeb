import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {PersonalCreditService} from '../personal-credit.service';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

@Component({
  selector: 'app-personal-credit-second-step',
  templateUrl: './personal-credit-second-step.component.html',
  styleUrls: ['./personal-credit-second-step.component.scss']
})
export class PersonalCreditSecondStepComponent implements OnInit {
  @Input() accountControl: FormControl = new FormControl(null);
  option1Tag: string;
  option2Tag: string;
  secondStepOption1Tag: string;
  secondStepOption2Tag1: string;
  secondStepOption2Tag2: string;
  secondStepOption2Tag3: string;
  subtitle: string;
  radioButtonSelected = 0;

  constructor(private personalCreditService: PersonalCreditService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.personalCreditService.errorIbanAccount$.subscribe(() => {
      this.accountControl.setErrors({invalid: true});
    });
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Crédito personal').tags)
    );
  }

  radioButtonChanged(event) {
    this.radioButtonSelected = event.value;

    if (+this.radioButtonSelected === 1) {
      this.accountControl.setValue(null);
    }

    if (+this.radioButtonSelected === 2) {
      this.accountControl.setValue(0);
    }
  }

  getTags(tags: Tag[]) {
    this.option1Tag = tags.find(tag => tag.description === 'credito.stepper2.option1')?.value;
    this.option2Tag = tags.find(tag => tag.description === 'credito.stepper2.option2')?.value;
    this.secondStepOption1Tag = tags.find(tag => tag.description === 'credito.stepper2.option1.tag')?.value;
    this.secondStepOption2Tag1 = tags.find(tag => tag.description === 'credito.stepper2.option2.tag1')?.value;
    this.secondStepOption2Tag2 = tags.find(tag => tag.description === 'credito.stepper2.option2.tag2')?.value;
    this.secondStepOption2Tag3 = tags.find(tag => tag.description === 'credito.stepper2.option2.tag3')?.value;
    this.subtitle = tags.find(tag => tag.description === 'credito.stepper2.subtitle')?.value;
  }

}
