import { Injectable } from '@angular/core';
import { Cacheable } from 'ngx-cacheable';
import { HttpService } from '../../../../core/services/http.service';
import { ApplicantData } from 'src/app/shared/models/applicant-data';

export interface uploadIdentificationParams {
  identification: string,
  expirationDateIdentification: string,
  face: 'frontFace' | 'backFace', // frontFace || backFace
  imagebase64: string | ArrayBuffer, // la imagen en formato base64
  formatImage: string; // 'PNG' | 'JPEG' | 'JPG'
  }


@Injectable()
export class UpdateAccountInfoService {
  private readonly saveIdentificationPhotoUri = 'applicant/saveidentificationphoto'
  private readonly updateApplicantDataUri = 'applicant/updateapplicantdata'

  constructor(private httpService: HttpService){}

  @Cacheable()
  saveIdentificationPhoto(identificationParams: uploadIdentificationParams){
    return this.httpService.post('canales', this.saveIdentificationPhotoUri, identificationParams)
  }

  updateApplicantData(applicantData: ApplicantData){
    return this.httpService.post('canales', this.updateApplicantDataUri, applicantData)
  }

}
