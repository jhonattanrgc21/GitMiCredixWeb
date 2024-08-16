import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Cacheable} from 'ngx-cacheable';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from './storage.service';
import { ApplicantData, ApplicantDataResponse } from 'src/app/shared/models/applicant-data';
import { HttpClient } from '@angular/common/http';

export const cleanProfilePhoto$ = new Subject();
export const cleanUserInfo$ = new Subject();

@Injectable()
export class ApplicantApiService {
  private readonly userApplicantInfoUri = 'applicant/finduserapplicantaccountnumber';
  private readonly getApplicantProfilePhotoUri = 'applicant/getProfilePhotoApplicant';
  private readonly getApplicantDataUri = 'applicant/getapplicantdata';

  constructor(private httpService: HttpService,
              private storageService: StorageService, private HttpClient: HttpClient) {
  }

  @Cacheable({
    cacheBusterObserver: cleanUserInfo$.asObservable()
  })
  getUserApplicantInfo(accountNumber: number): Observable<any> {
    return this.httpService
      .post('canales', this.userApplicantInfoUri, {accountNumber})
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.informationApplicant;
          } else {
            return null;
          }
        })
      );
  }

  @Cacheable({
    cacheBusterObserver: cleanProfilePhoto$.asObservable()
  })
  getApplicantProfilePhoto(): Observable<string> {
    return this.httpService.post('canales', this.getApplicantProfilePhotoUri, {
      identification: this.storageService.getCurrentUser().identification
    }).pipe(
      map(response => {
        if (response.imgBase64) {
          return response.imgBase64;
        } else {
          return null;
        }
      }));
  }

  @Cacheable()
  getApplicantData(): Observable<ApplicantData>{
    // return this.httpService.post('canales', this.getApplicantDataUri)
    return this.HttpClient.post('https://6b2aab92-24f1-4ab5-9d72-c220120e3cb5.mock.pstmn.io/api/canalesbe/applicant/getapplicantdata',
      {},
      {
        headers: {
          exampleNumber: '1'
        }
      })
    .pipe(
      map((response: ApplicantDataResponse) => {
        if(response.type === 'success'){
          return response.data
        } else {
          throw new Error('Ha ocurrido un error')
        }
      })
    )
  }
}
