import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';
import {StorageService} from '../../../../../core/services/storage.service';

@Injectable()
export class SignUpService {
  private readonly checkUserUri = 'security/verifyregistryuser';
  private readonly sendOtpUri = 'security/getdatamaskednameapplicantsendotp';
  private readonly validateOtpUri = 'security/validateonetimepassword';
  private readonly checkPasswordUri = 'security/validatePasswordAndConfirmPassword';

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private toastService: CredixToastService) {
  }

  checkUser(identification: string): Observable<{ isRegistered: boolean, status: string }> {
    return this.httpService.post('canales', this.checkUserUri, {identification}).pipe(
      tap(response => {
          if (response.type === 'error') {
            this.toastService.show({text: response.message, type: 'error'});
          }
        }),
      map(response => {
        if (response.type === 'success') {
          return {isRegistered: response.registereduser, status: 'success'};
        } else {
          return {isRegistered: false, status: 'error'};
        }
      })
    );
  }

  sendOtp(optSent: boolean, identification: string, typeIdentification: number = 1):
    Observable<{ userId: number, phoneNumber: string; email: string }> {
    return this.httpService.post('canales', this.sendOtpUri, {
      identification,
      typeIdentification
    }).pipe(
      tap(response => {
          if (response.type === 'error') {
            this.toastService.show({text: response.message, type: 'error'});
          }
        },
        error => {
        },
        () => {
          if (optSent) {
            this.toastService.show({text: 'SMS enviado nuevamente', type: 'success'});
          }
        }),
      map(response => {
        if (response.type === 'success') {
          return {userId: response.userId, phoneNumber: response.phone, email: response.email};
        } else {
          return null;
        }
      })
    );
  }

  validateOtp(confirmationCode: number, userId: number): Observable<{ status: 'success' | 'error', message: string }> {
    return this.httpService.post('canales', this.validateOtpUri, {
      userId,
      validateToken: 0,
      usernameSecurity: 'sts_sac',
      passwordSecurity: '27ddddd7aa59f8c80837e6f46e79d5d5c05a4068914babbbf7745b43a2b21f47',
      confirmationCode
    }).pipe(
      map(response => ({status: response.type, message: response.descriptionOne}))
    );
  }

  checkPassword(userId: number, password: string) {
    return this.httpService.post('canales', this.checkPasswordUri, {
      userId,
      typeIncome: 1,
      validateToken: 0,
      newPassword: CryptoJS.SHA256(password).toString(),
      confirmPassword: CryptoJS.SHA256(password).to,
      usernameSecurity: 'sts_sac',
      passwordSecurity: '27ddddd7aa59f8c80837e6f46e79d5d5c05a4068914babbbf7745b43a2b21f47',
      uuid: this.storageService.getUuid(),
      platform: 3
    });
  }

}
