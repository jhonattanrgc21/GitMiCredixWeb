import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';

@Injectable()
export class PersonalInfoManagementService {
  private saveApplicantProfilePhotoUri = 'applicant/saveProfilePhotoApplicant';

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
}
