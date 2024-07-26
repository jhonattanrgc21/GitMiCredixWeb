import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'update-account-info-popup',
  templateUrl: './update-account-info-popup.component.html',
  styleUrls: ['./update-account-info-popup.component.scss']
})
export class UpdateAccountInfoPopUp implements OnInit {
  @ViewChild('stepper') stepper: CdkStepper;
  stepperIndex: number = 0

  personalInfoFormGroup = this.fb.group({})
  adressFormGroup = this.fb.group({})
  incomeFormGroup = this.fb.group({})


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }

  back() {
    this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex
  }

  nextStep() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex
  }

  submitUpdateAccountInfoForm(){

  }
}
