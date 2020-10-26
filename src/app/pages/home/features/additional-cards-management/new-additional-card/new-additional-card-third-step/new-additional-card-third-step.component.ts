import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AdditionalCardsManagementService} from '../../additional-cards-management.service';
import {TagsService} from '../../../../../../core/services/tags.service';
import {Tag} from '../../../../../../shared/models/tag';

@Component({
  selector: 'app-new-additional-card-third-step',
  templateUrl: './new-additional-card-third-step.component.html',
  styleUrls: ['./new-additional-card-third-step.component.scss']
})
export class NewAdditionalCardThirdStepComponent implements OnInit {
  @Input() confirmFormControl = new FormControl(null, [Validators.required]);
  name = '';
  email = '';
  phoneNumber = 0;
  pickUpPlace = '';
  creditLimit = 0;
  subtitleOneTag: string;
  subtitleTwoTag: string;
  subtitleThreeTag: string;
  secondTag: string;
  thirdTag: string;

  constructor(private additionalCardsManagementService: AdditionalCardsManagementService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.getPickUpPlace();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Tarjetas adicionales').tags));
  }

  getUserInfo() {
    this.additionalCardsManagementService.personalInfo$.subscribe(value => {
      this.name = value.name + ' ' + value.lastName;
      this.email = value.email;
      this.phoneNumber = value.phoneNumber;
      this.creditLimit = value.creditLimit;
    });
  }

  getPickUpPlace() {
    this.additionalCardsManagementService.pickUpPlace$.subscribe(value => this.pickUpPlace = value);
  }

  getTags(tags: Tag[]) {
    this.subtitleOneTag = tags.find(tag => tag.description === 'adicionales.stepper3.subtitle1').value;
    this.subtitleTwoTag = tags.find(tag => tag.description === 'adicionales.stepper3.subtitle2').value;
    this.subtitleThreeTag = tags.find(tag => tag.description === 'adicionales.stepper3.subtitle3').value;
    this.secondTag = tags.find(tag => tag.description === 'adicionales.stepper3.tag2').value;
    this.thirdTag = tags.find(tag => tag.description === 'adicionales.stepper3.tag3').value;
  }
}
