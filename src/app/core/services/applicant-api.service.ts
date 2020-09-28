import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Cacheable} from 'ngx-cacheable';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from './storage.service';

export const cleanProfilePhoto$ = new Subject();

@Injectable()
export class ApplicantApiService {
  private readonly userApplicantInfoUri = 'applicant/finduserapplicantaccountnumber';
  private readonly getApplicantProfilePhotoUri = 'applicant/getProfilePhotoApplicant';
  private newPhotoSub = new Subject();
  newPhoto$ = this.newPhotoSub.asObservable();

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  @Cacheable()
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
      identification: this.storageService.getIdentification()
    }).pipe(
      map(response => {
        if (response.imgBase64) {
          return response.imgBase64;
        } else {
          return null;
        }
      }));
  }

  emitNewPhoto(): void {
    this.newPhotoSub.next();
  }
}
