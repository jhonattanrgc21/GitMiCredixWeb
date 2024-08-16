import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicantApiService } from '../../../../../core/services/applicant-api.service';

@Component({
  selector: 'update-account-info-popup',
  templateUrl: './update-account-info-popup.component.html',
  styleUrls: ['./update-account-info-popup.component.scss']
})
export class UpdateAccountInfoPopUp implements OnInit {
  @ViewChild('stepper') stepper: CdkStepper;
  stepperIndex: number = 0
  personalInfoSwitch: 'idUpload' | 'form' = 'form'

  idValid = false

  personalInfoFormGroup = this.fb.group({
    fullName: ['', Validators.required],
    lastName: ['', Validators.required],
    idType: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
    id: ['',[Validators.required]],
    idExpirationDate: [{value: new Date(), disabled: true}, [Validators.required]],
    civilState: [1, [Validators.required]],
    sex: [1, [Validators.required]],
    bornDate: [new Date(), Validators.required],
    celphone: [{value: '', disabled: true}, [Validators.minLength(8), Validators.maxLength(8)]],
    roomPhone: ['', [Validators.minLength(8), Validators.maxLength(8)]],
    workPhone: ['', [Validators.minLength(8), Validators.maxLength(8)]],
    referencePhone: ['', [Validators.minLength(8), Validators.maxLength(8)]],
    otherPhone: ['', [Validators.minLength(8), Validators.maxLength(8)]]
  })
  adressFormGroup = this.fb.group({
    province: ['', [Validators.required]],
    canton: ['', [Validators.required]],
    district: ['', [Validators.required]],
    detail: ['', [Validators.required]],
    name: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required]]
  })
  incomeFormGroup = this.fb.group({})


  constructor(private fb: FormBuilder, private applicantApiService: ApplicantApiService) { }

  ngOnInit(): void {

    //LoadFormData
    this.applicantApiService.getApplicantData().subscribe(data => {
      console.log(data)
    })

  }

  back() {
    if(this.stepperIndex === 0 && this.personalInfoSwitch === 'idUpload'){
        this.personalInfoSwitch = 'form'
        this.idValid = false
      return
    }
    if(this.stepperIndex === 1){
      this.idValid = false
    }
    this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex
  }

  nextStep() {
    if(!this.idValid){
      //TODO: VALIDAR SI LA CEDULA ESTA VENCIDA
        this.personalInfoSwitch = 'idUpload'
      return
    }

    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex
  }

  validateId(){
    this.idValid = true
    this.nextStep()
  }

  submitUpdateAccountInfoForm(){

  }
}
