import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StorageService} from '../../../../../core/services/storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Occupation} from '../../../../../shared/models/occupation';
import {Country} from '../../../../../shared/models/country';
import {IncomeType} from '../../../../../shared/models/income-type';
import {Canton} from '../../../../../shared/models/canton';
import {District} from '../../../../../shared/models/district';
import {Province} from '../../../../../shared/models/province';
import {forkJoin} from 'rxjs';
import {PersonalInfoManagementService} from '../personal-info-management.service';
import {finalize} from 'rxjs/operators';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {ApplicantApiService} from '../../../../../core/services/applicant-api.service';
import {GlobalApiService} from '../../../../../core/services/global-api.service';
import {CredixCodeErrorService} from '../../../../../core/services/credix-code-error.service';

@Component({
  selector: 'app-personal-info-editor',
  templateUrl: './personal-info-editor.component.html',
  styleUrls: ['./personal-info-editor.component.scss']
})
export class PersonalInfoEditorComponent implements OnInit, AfterViewInit {
  personalInfoFormGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(null, [Validators.required,
      Validators.maxLength(8), Validators.minLength(8)]),
    country: new FormControl(null, [Validators.required]),
    incomeType: new FormControl(null, [Validators.required]),
    occupation: new FormControl(null, [Validators.required]),
    province: new FormControl(null, [Validators.required]),
    canton: new FormControl(null, [Validators.required]),
    district: new FormControl(null, [Validators.required]),
    addressDetail: new FormControl(null, [Validators.required]),
    code: new FormControl(null, [Validators.required,
      Validators.maxLength(6), Validators.minLength(6)])
  });
  name = '';
  countries: Country[] = [];
  provinces: Province[] = [];
  cantons: Canton[] = [];
  districts: District[] = [];
  incomeTypes: IncomeType[] = [];
  occupations: Occupation[] = [];
  hideEmailMask = false;
  hidePhoneNumberMask = false;
  message: string;
  title: string;
  status: 'success' | 'error';
  done = false;

  constructor(private personalInfoManagementService: PersonalInfoManagementService,
              private credixCodeErrorService: CredixCodeErrorService,
              private applicantApiService: ApplicantApiService,
              private globalApiService: GlobalApiService,
              private toastService: CredixToastService,
              private storageService: StorageService,
              private modalService: ModalService) {
    this.name = storageService.getCurrentUser().aplicantName;
  }

  ngOnInit(): void {
    this.setSubscriptions();
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.personalInfoFormGroup.controls.code.setErrors({invalid: true});
      this.personalInfoFormGroup.updateValueAndValidity();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.getFormData(), 0);
  }

  setSubscriptions() {
    this.personalInfoFormGroup.controls.email.valueChanges.subscribe(value => this.hideEmailMask = value.length === 0);
    this.personalInfoFormGroup.controls.phoneNumber.valueChanges.subscribe(value => this.hidePhoneNumberMask = value.length === 0);
    this.personalInfoFormGroup.controls.province.valueChanges.subscribe(value => this.getCanton(value));
    this.personalInfoFormGroup.controls.canton.valueChanges.subscribe(value => this.getDistrict(value));
  }

  initFormGroup() {
    if (!this.personalInfoManagementService.applicantInfo) {
      this.applicantApiService.getUserApplicantInfo(this.storageService.getCurrentUser().accountNumber)
        .pipe(finalize(() => this.initFormGroup()))
        .subscribe(applicantInfo => {
          if (applicantInfo) {
            this.personalInfoManagementService.applicantInfo = {
              email: applicantInfo.applicant.email,
              phoneNumber: applicantInfo.applicant.phoneApplicant.find(phone => phone.phoneType.id === 1).phone,
              country: applicantInfo.applicant.country?.id,
              occupation: applicantInfo.applicant.personApplicant.occupation?.id,
              addressDetail: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id === 1).detail,
              incomeType: applicantInfo.applicant.typeIncomeApplicant?.id,
              province: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id === 1).province.id,
              canton: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id === 1).canton.id,
              district: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id === 1).district.id
            };
          }
        });
    } else {
      this.personalInfoFormGroup.controls.email.setValue(this.personalInfoManagementService.applicantInfo.email);
      this.personalInfoFormGroup.controls.phoneNumber.setValue(this.personalInfoManagementService.applicantInfo.phoneNumber);
      this.personalInfoFormGroup.controls.country.setValue(this.personalInfoManagementService.applicantInfo.country);
      this.personalInfoFormGroup.controls.incomeType.setValue(this.personalInfoManagementService.applicantInfo.incomeType);
      this.personalInfoFormGroup.controls.occupation.setValue(this.personalInfoManagementService.applicantInfo.occupation);
      this.personalInfoFormGroup.controls.province.setValue(this.personalInfoManagementService.applicantInfo.province);
      this.personalInfoFormGroup.controls.canton.setValue(this.personalInfoManagementService.applicantInfo.canton);
      this.personalInfoFormGroup.controls.district.setValue(this.personalInfoManagementService.applicantInfo.district);
      this.personalInfoFormGroup.controls.addressDetail.setValue(this.personalInfoManagementService.applicantInfo.addressDetail);
    }
  }

  getFormData() {
    forkJoin([
      this.globalApiService.getCountries(),
      this.globalApiService.getProvinces(),
      this.globalApiService.getIncomeTypes(),
      this.globalApiService.getOccupations()
    ])
      .pipe(finalize(() => this.initFormGroup()))
      .subscribe(values => {
        this.countries = values[0];
        this.provinces = values[1];
        this.incomeTypes = values[2];
        this.occupations = values[3];
      });
  }

  getCanton(provinceId: number) {
    this.globalApiService.getCantons(provinceId).subscribe(cantons => this.cantons = cantons);
  }

  getDistrict(cantonId: number) {
    this.globalApiService.getDistricts(cantonId).subscribe(districts => this.districts = districts);
  }

  edit() {
    this.modalService.confirmationPopup('¿Desea guardar estos datos?').subscribe((confirmation) => {
      if (confirmation) {
        const email = (this.personalInfoFormGroup.controls.email.value as string).includes('*') ?
          this.personalInfoManagementService.applicantInfo.email : this.personalInfoFormGroup.controls.email.value;
        const phoneApplicant = (this.personalInfoFormGroup.controls.phoneNumber.value.toString()).includes('*') ?
          this.personalInfoManagementService.applicantInfo.phoneNumber : this.personalInfoFormGroup.controls.phoneNumber.value;
        this.personalInfoManagementService.updateApplicantInfo({
          email,
          phoneApplicant,
          countryId: this.personalInfoFormGroup.controls.country.value,
          incomeOriginId: this.personalInfoFormGroup.controls.incomeType.value,
          occupationId: this.personalInfoFormGroup.controls.occupation.value,
          provinceId: this.personalInfoFormGroup.controls.province.value,
          cantonId: this.personalInfoFormGroup.controls.canton.value,
          districtId: this.personalInfoFormGroup.controls.district.value,
          addressApplicant: this.personalInfoFormGroup.controls.addressDetail.value,
          credixCode: this.personalInfoFormGroup.controls.code.value,
        }).pipe(finalize(() => this.done = this.personalInfoFormGroup.controls.code.valid))
          .subscribe(result => {
            this.title = result.title;
            this.status = result.type;
            this.message = result.message;
          });
      }
    });
  }

}
