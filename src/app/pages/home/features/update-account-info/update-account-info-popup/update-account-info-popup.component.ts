import { CdkStepper } from '@angular/cdk/stepper';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicantApiService } from '../../../../../core/services/applicant-api.service';
import { ApplicantData, ApplicantIncome } from 'src/app/shared/models/applicant-data';
import { idPhotos } from '../id-photo-upload/id-photo-upload.component';
import { UpdateAccountInfoService } from '../update-account-info.service';
import { combineLatest } from 'rxjs';
import { GlobalApiService } from '../../../../../core/services/global-api.service';
import { DynamicFormData } from 'src/app/shared/models/dynamic-form';

@Component({
  selector: 'update-account-info-popup',
  templateUrl: './update-account-info-popup.component.html',
  styleUrls: ['./update-account-info-popup.component.scss'],
  providers: [UpdateAccountInfoService]
})
export class UpdateAccountInfoPopUp implements OnInit {
  @ViewChild('stepper') stepper: CdkStepper;
  stepperIndex: number = 0
  personalInfoSwitch: 'idUpload' | 'form' = 'form'

  idValid = false
  idPhotos: idPhotos;

  personalInfoFormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastNames: ['', Validators.required],
    typeIdentificacionId: [1, [Validators.required, Validators.min(1), Validators.max(4)]],
    identification: ['', [Validators.required]],
    documentExpirationDate: [{ value: '', disabled: true }, [Validators.required]],
    civilStatus: [0, [Validators.required]],
    gender: ['', [Validators.required]],
    birthdate: ['', Validators.required],
    cellPhone: [{ value: '', disabled: true }, [Validators.minLength(8), Validators.maxLength(8)]],
    homePhone: ['', [Validators.minLength(8), Validators.maxLength(8)]],
    workPhone: ['', [Validators.minLength(8), Validators.maxLength(8)]],
    referencePhone: ['', [Validators.minLength(8), Validators.maxLength(8)]],
    otherPhone: ['', [Validators.minLength(8), Validators.maxLength(8)]]
  })

  adressFormGroup = this.fb.group({
    province: ['', [Validators.required]],
    canton: ['', [Validators.required]],
    district: ['', [Validators.required]],
    exactAddress: ['', [Validators.required]],
    billingAddress: ['', [Validators.required]],
    billingCity: ['', [Validators.required]],
    billingState: ['', [Validators.required]],
    billingPostalCode: ['', [Validators.required]],
    billingCountry: ['', [Validators.required]],
  })
  incomeFormGroup = this.fb.group({
    incomeType: [1, [Validators.required]]
  })
  incomeData: ApplicantIncome;

  constructor(
    private fb: FormBuilder,
    private applicantApiService: ApplicantApiService,
    private updateAccountInfoService: UpdateAccountInfoService,
    private globalApiService: GlobalApiService
  ) { }

  ngOnInit(): void {

    combineLatest([this.applicantApiService.getApplicantData(), this.globalApiService.getDynamicForm("updatedata")])
      .subscribe(([applicantData, dynamicFormData]) => {
        this.loadFormData(applicantData)
        this.checkDynamicFormSetting(dynamicFormData)
      })
  }

  checkDynamicFormSetting(dynamicFormData: DynamicFormData[]) {
  }

  loadFormData(data: ApplicantData) {

    this.idValid =
      (!data.documentExpirationDate || data.documentExpirationDate === "null")
        ? false
        : (new Date() >= new Date(data.documentExpirationDate))

    this.personalInfoFormGroup.setValue({
      firstName: data.firstName,
      lastNames: data.lastNames,
      typeIdentificacionId: data.typeIdentificacionId,
      identification: data.identification,
      documentExpirationDate: data.documentExpirationDate,
      civilStatus: data.civilStatus,
      gender: data.gender,
      birthdate: data.birthdate,
      cellPhone: data.cellPhone,
      homePhone: data.homePhone,
      workPhone: data.workPhone,
      referencePhone: data.referencePhone,
      otherPhone: data.otherPhone
    })

    if (data.mailAddress) {
      this.adressFormGroup.setValue({
        province: data.homeAddress.provinceId,
        canton: data.homeAddress.cantonId,
        district: data.homeAddress.districtId,
        exactAddress: data.homeAddress.detail,
        billingAddress: data.mailAddress.detail,
        billingCity: data.mailAddress.city,
        billingState: data.mailAddress.state,
        billingPostalCode: data.mailAddress.postalCode,
        billingCountry: data.mailAddress.countryId
      })
    } else if(data.homeAddress) {
      this.adressFormGroup.setValue({
        province: data.homeAddress.provinceId,
        canton: data.homeAddress.cantonId,
        district: data.homeAddress.districtId,
        exactAddress: data.homeAddress.detail,
        billingAddress: '',
        billingCity: '',
        billingState: '',
        billingPostalCode: '',
        billingCountry: ''
      })
    }

    if (data.income) {
      this.incomeFormGroup.setValue({
        incomeType: data.income.incomeOriginId
      })

      this.incomeData = data.income
    }


  }

  back() {
    if (this.stepperIndex === 0 && this.personalInfoSwitch === 'idUpload') {
      this.personalInfoSwitch = 'form'
      this.idValid = false
      return
    }
    if (this.stepperIndex === 1) {
      this.idValid = false
    }
    this.stepper.previous();
    this.stepperIndex = this.stepper.selectedIndex
  }

  nextStep() {
    if (!this.idValid) {
      this.personalInfoSwitch = 'idUpload'
      return
    }

    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex
  }

  validateId(idPhotos: idPhotos) {
    this.idPhotos = idPhotos
    this.idValid = true
    this.nextStep()
  }

  submitUpdateAccountInfoForm() {
    const personalInfo = this.personalInfoFormGroup.value

    const requests = []

    if (!this.idPhotos) {

      requests.push(this.updateAccountInfoService.saveIdentificationPhoto({
        identification: personalInfo.identification,
        expirationDateIdentification: personalInfo.documentExpirationDate,
        face: 'frontFace',
        imagebase64: this.idPhotos['front'].base64,
        formatImage: this.idPhotos['front'].type
      }))
      requests.push(this.updateAccountInfoService.saveIdentificationPhoto({
        identification: personalInfo.identification,
        expirationDateIdentification: personalInfo.documentExpirationDate,
        face: 'backFace',
        imagebase64: this.idPhotos['back'].base64,
        formatImage: this.idPhotos['back'].type
      }))

    }

    // requests.push(
    //   this.updateAccountInfoService.updateApplicantData({
    //     ...personalInfo,
    //     // mailAddress
    //     // income
    //   })
    // )


    // TODO SUBCRIBE OBSERVERS
    // forkJoin(requests).subscribe((x) => {})
  }

}

