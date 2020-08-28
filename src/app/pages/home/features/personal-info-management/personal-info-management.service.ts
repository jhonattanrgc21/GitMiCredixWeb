import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';

@Injectable()
export class PersonalInfoManagementService {
  private saveApplicantProfilePhotoUri = 'applicant/saveProfilePhotoApplicant';
  applicantInfo: {
    email: string;
    phoneNumber: string;
    country: number;
    incomeType: number;
    occupation: number;
    province: number;
    canton: number;
    district: number;
    addressDetail: string
  };
  private updateApplicantInfoUri = 'applicant/updateapplicantdata';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  saveApplicantProfilePhoto(image: string, format: string, size: number) {
    return this.httpService.post('canales', this.saveApplicantProfilePhotoUri, {
      identification: this.storageService.getIdentification(),
      imagebase64: image,
      formatImage: format,
      size
    });
  }

  updateApplicantInfo(applicantInfo: {
    email: string; phoneApplicant: string; countryId: number; incomeOriginId: number; occupationId: number;
    provinceId: number; cantonId: number; districtId: number; addressApplicant: string; credixCode: string
  }) {
    return this.httpService.post('canales', this.updateApplicantInfoUri, {...applicantInfo});
  }
}
