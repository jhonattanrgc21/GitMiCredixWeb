import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../../../core/services/storage.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {GlobalRequestsService} from '../../../../core/services/global-requests.service';
import {PersonalInfoService} from './personal-info.service';
import {CredixToastService} from '../../../../core/services/credix-toast.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  name = '';
  email = '';
  phoneNumber = '';
  nationality = '';
  typeIncome = '';
  occupation = '';
  address = '';
  profilePhoto = 'assets/images/avatar.png';
  os: string;

  constructor(private personalInfoService: PersonalInfoService,
              private globalRequestsService: GlobalRequestsService,
              private storageService: StorageService,
              private toastService: CredixToastService,
              private deviceService: DeviceDetectorService) {
    this.name = storageService.getCurrentUser().aplicantName;
    this.os = this.deviceService.getDeviceInfo().os;
  }

  ngOnInit(): void {
    this.getApplicantInfo();
    this.getApplicantProfilePhoto();
  }

  edit() {

  }

  getApplicantProfilePhoto() {
    this.globalRequestsService.getApplicantProfilePhoto().subscribe(profilePhoto => {
      console.log(profilePhoto);
      this.profilePhoto = profilePhoto ? `data:image/png;base64,${profilePhoto}` : 'assets/images/avatar.png';
    });
  }

  onImageUploaded(image) {
    if (image.size > 3000000) {
      this.toastService.show({text: 'La imagen debe ser menor a 3 MB', type: 'error'});
    } else {
      this.changeProfilePhoto(image.file.split(',')[1], image.type, +(image.size / 1000).toFixed(2));
    }
  }

  changeProfilePhoto(image: string, format: string, size: number) {
    this.personalInfoService.saveApplicantProfilePhoto(image, format, size).subscribe(response => {
      if (response.type === 'success') {
        this.getApplicantProfilePhoto();
      }
    });
  }

  getApplicantInfo() {
    this.globalRequestsService.getUserApplicantInfo(this.storageService.getCurrentUser().accountNumber)
      .subscribe(applicantInfo => {
        if (applicantInfo) {
          this.email = this.maskEmail(applicantInfo.applicant.email);
          this.phoneNumber = this.maskPhoneNumber(applicantInfo.applicant.phoneApplicant[0].phone.toString());
          this.nationality = applicantInfo.applicant.country.description;
          this.typeIncome = applicantInfo.applicant.typeIncomeApplicant;
          this.occupation = applicantInfo.applicant.personApplicant.occupation.description;
          this.address = applicantInfo.applicant.addressApplicant.find(add => add.addressType.id = 1).detail;
        }
      });
  }

  maskEmail(email: string): string {
    const prefix = email.split('@')[0];
    const suffix = email.split('@')[1];
    let prefixMasked = prefix.charAt(0);
    for (let i = 1; i < prefix.length - 1; i++) {
      prefixMasked = prefixMasked + '*';
    }
    return `${prefixMasked}${prefix.charAt(prefix.length - 1)}@${suffix}`;
  }

  maskPhoneNumber(phone: string): string {
    const prefix = phone.substring(0, 4);
    const suffix = phone.substring(4, 8);
    return `${prefix.charAt(0)}${prefix.charAt(1)}**-**${suffix.charAt(2)}${suffix.charAt(3)}`;
  }
}
