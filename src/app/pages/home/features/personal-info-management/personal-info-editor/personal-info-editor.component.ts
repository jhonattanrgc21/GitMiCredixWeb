import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';
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

@Component({
  selector: 'app-personal-info-editor',
  templateUrl: './personal-info-editor.component.html',
  styleUrls: ['./personal-info-editor.component.scss']
})
export class PersonalInfoEditorComponent implements OnInit, AfterViewInit {
  name = '';
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
  countries: Country[] = [];
  provinces: Province[] = [];
  cantons: Canton[] = [];
  districts: District[] = [];
  incomeTypes: IncomeType[] = [];
  occupations: Occupation[] = [];
  hideEmailMask = false;
  hidePhoneNumberMask = false;

  constructor(private personalInfoManagementService: PersonalInfoManagementService,
              private globalRequestsService: GlobalRequestsService,
              private toastService: CredixToastService,
              private storageService: StorageService,
              private router: Router) {
    this.name = storageService.getCurrentUser().aplicantName;
  }

  ngOnInit(): void {
    this.personalInfoFormGroup.controls.email.valueChanges.subscribe(value => this.hideEmailMask = value.length === 0);
    this.personalInfoFormGroup.controls.phoneNumber.valueChanges.subscribe(value => this.hidePhoneNumberMask = value.length === 0);
    this.personalInfoFormGroup.controls.province.valueChanges.subscribe(value => this.getCanton(value));
    this.personalInfoFormGroup.controls.canton.valueChanges.subscribe(value => this.getDistrict(value));
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.getFormData(), 0);
  }

  initFormGroup() {
    if (this.personalInfoManagementService.applicantInfo) {
      this.personalInfoFormGroup.controls.email.setValue(this.personalInfoManagementService.applicantInfo.email);
      this.personalInfoFormGroup.controls.phoneNumber.setValue(this.personalInfoManagementService.applicantInfo.phoneNumber);
      this.personalInfoFormGroup.controls.country.setValue(this.personalInfoManagementService.applicantInfo.country);
      this.personalInfoFormGroup.controls.incomeType.setValue(this.personalInfoManagementService.applicantInfo.incomeType);
      this.personalInfoFormGroup.controls.occupation.setValue(this.personalInfoManagementService.applicantInfo.occupation);
      this.personalInfoFormGroup.controls.province.setValue(this.personalInfoManagementService.applicantInfo.province);
      this.personalInfoFormGroup.controls.canton.setValue(this.personalInfoManagementService.applicantInfo.canton);
      this.personalInfoFormGroup.controls.district.setValue(this.personalInfoManagementService.applicantInfo.district);
      this.personalInfoFormGroup.controls.addressDetail.setValue(this.personalInfoManagementService.applicantInfo.addressDetail);
    } else {
      this.globalRequestsService.getUserApplicantInfo(this.storageService.getCurrentUser().accountNumber)
        .pipe(finalize(() => this.initFormGroup()))
        .subscribe(applicantInfo => {
          if (applicantInfo) {
            this.personalInfoManagementService.applicantInfo = {
              email: applicantInfo.applicant.email,
              phoneNumber: applicantInfo.applicant.phoneApplicant.find(phone => phone.phoneType.id = 1).phone,
              country: applicantInfo.applicant.country?.id,
              occupation: applicantInfo.applicant.personApplicant.occupation?.id,
              addressDetail: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id = 1).detail,
              incomeType: applicantInfo.applicant.typeIncomeApplicant?.id,
              province: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id = 1).province.id,
              canton: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id = 1).canton.id,
              district: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id = 1).district.id
            };
          }
        });
    }
  }

  goBack() {
    this.router.navigate(['/home/personal-info']);
  }

  getFormData() {
    forkJoin([
      this.globalRequestsService.getCountries(),
      this.globalRequestsService.getProvinces(),
      this.globalRequestsService.getIncomeTypes(),
      this.globalRequestsService.getOccupations()
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
    console.log(1);
    this.globalRequestsService.getCantons(provinceId).subscribe(cantons => this.cantons = cantons);
  }

  getDistrict(cantonId: number) {
    this.globalRequestsService.getDistricts(cantonId).subscribe(districts => this.districts = districts);
  }

  edit() {
    if (this.personalInfoFormGroup.valid) {
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
      }).subscribe(response => {
        if (response.type === 'success') {
          this.toastService.show({text: response.message, type: 'success'});
          this.globalRequestsService.userApplicantInfo = null;
          this.goBack();
        }
      });
    }

  }

}
