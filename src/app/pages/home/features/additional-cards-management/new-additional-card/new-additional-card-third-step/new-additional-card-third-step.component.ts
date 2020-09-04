import {Component, Input, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {AdditionalCardsManagementService} from '../../additional-cards-management.service';

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

  constructor(private additionalCardsManagementService: AdditionalCardsManagementService) {
  }

  ngOnInit(): void {
    this.getUserInfo();
    this.getPickUpPlace();
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

}
