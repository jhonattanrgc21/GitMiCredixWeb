import {Component, OnDestroy, OnInit} from '@angular/core';
import {StorageService} from '../../../../../core/services/storage.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {PersonalInfoManagementService} from '../personal-info-management.service';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';
import {ApplicantApiService} from '../../../../../core/services/applicant-api.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit, OnDestroy {
  name = '';
  email = '';
  phoneNumber = '';
  nationality = '';
  typeIncome = '';
  occupation = '';
  address = '';
  profilePhoto = 'assets/images/avatar.png';
  os: string;

  constructor(private personalInfoManagementService: PersonalInfoManagementService,
              private applicantApiService: ApplicantApiService,
              private storageService: StorageService,
              private toastService: CredixToastService,
              private router: Router,
              private deviceService: DeviceDetectorService) {
    this.name = storageService.getCurrentUser().aplicantName;
    this.os = this.deviceService.getDeviceInfo().os;
  }

  ngOnInit(): void {
    this.getApplicantInfo();
    this.getApplicantProfilePhoto();
  }

  edit() {
    this.router.navigate(['/home/personal-info/edit']);
  }

  getApplicantProfilePhoto() {
    this.applicantApiService.getApplicantProfilePhoto().subscribe(profilePhoto =>
      this.profilePhoto = profilePhoto ? `data:image/png;base64,${profilePhoto}` : 'assets/images/avatar.png');
  }

  onImageUploaded(image) {
    if (image.size > 3000000) {
      this.toastService.show({text: 'La imagen debe ser menor a 3 MB', type: 'error'});
    } else {
      this.changeProfilePhoto(image.file.split(',')[1], image.type, +(image.size / 1000).toFixed(2));
    }
  }

  changeProfilePhoto(image: string, format: string, size: number) {
    this.personalInfoManagementService.saveApplicantProfilePhoto(image, format, size).subscribe(response => {
      if (response.type === 'success') {
        this.getApplicantProfilePhoto();
      }
    });
  }

  getApplicantInfo() {
    this.applicantApiService.getUserApplicantInfo(this.storageService.getCurrentUser().accountNumber)
      .subscribe(applicantInfo => {
        if (applicantInfo) {
          this.email = applicantInfo.applicant.email;
          this.phoneNumber = applicantInfo.applicant.phoneApplicant?.find(phone => phone.phoneType.id === 1).phone;
          this.nationality = applicantInfo.applicant.country?.description;
          this.typeIncome = applicantInfo.applicant.typeIncomeApplicant?.description;
          this.occupation = applicantInfo.applicant.personApplicant?.occupation.description;
          this.address = applicantInfo.applicant.addressApplicant?.find(add => add.addressType.id === 1).detail;

          this.personalInfoManagementService.applicantInfo = {
            email: this.email,
            phoneNumber: this.phoneNumber,
            addressDetail: this.address,
            country: applicantInfo.applicant.country?.id,
            occupation: applicantInfo.applicant.personApplicant.occupation?.id,
            incomeType: applicantInfo.applicant.typeIncomeApplicant?.id,
            province: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id === 1).province.id,
            canton: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id === 1).canton.id,
            district: applicantInfo.applicant.addressApplicant.find(add => add.addressType.id === 1).district.id
          };
        }
      });
  }

  ngOnDestroy(): void {
    this.personalInfoManagementService.unsubscribe();
  }
}
