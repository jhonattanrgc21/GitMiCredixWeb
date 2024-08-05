import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'update-account-info-popup',
  templateUrl: './update-account-info-popup.component.html',
  styleUrls: ['./update-account-info-popup.component.scss']
})
export class UpdateAccountInfoPopUp implements OnInit {
  @ViewChild('stepper') stepper: CdkStepper;
  stepperIndex: number = 0

  personalInfoFormGroup = this.fb.group({
    fullName: ['Randy Josue', Validators.required],
    lastName: ['Naranjo Bolaños', Validators.required],
    idType: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
    id: ['604780998',[Validators.required]],
    idExpirationDate: [{value: new Date(), disabled: true}, [Validators.required]],
    civilState: [1, [Validators.required]],
    sex: [1, [Validators.required]],
    bornDate: [new Date(), Validators.required],
    celphone: [{value: '12345678', disabled: true}, [Validators.minLength(8), Validators.maxLength(8)]],
    roomPhone: ['12345678', [Validators.minLength(8), Validators.maxLength(8)]],
    workPhone: ['12345678', [Validators.minLength(8), Validators.maxLength(8)]],
    referencePhone: ['12345678', [Validators.minLength(8), Validators.maxLength(8)]],
    otherPhone: ['12345678', [Validators.minLength(8), Validators.maxLength(8)]]
  })
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
