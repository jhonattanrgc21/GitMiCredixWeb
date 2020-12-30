import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import * as CryptoJS from 'crypto-js';
import {Observable, Subject} from 'rxjs';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {map, tap} from 'rxjs/operators';
import {Card} from '../../../../shared/models/card';
import {DeviceDetectorService} from 'ngx-device-detector';
import {StorageService} from '../../../../core/services/storage.service';

@Injectable()
export class SignInService {
  private readonly loginUri = 'security/userlogin';
  private readonly logoutUri = 'security/logoutbyusername';
  private readonly getDeviceInfoUri = 'channels/getdeviceinfo';
  private readonly validateOtpUri = 'security/validateonetimepassword';
  private readonly saveDeviceUri = 'channels/savedevice';
  private newDeviceSub = new Subject();
  newDevice$ = this.newDeviceSub.asObservable();

  constructor(private httpService: HttpService,
              private deviceService: DeviceDetectorService,
              private storageService: StorageService,
              private toastService: CredixToastService) {
  }

  login(username: string, password: string, typeIncome: number = 2) {
    return this.httpService.post('canales', this.loginUri, {
      username,
      password: CryptoJS.SHA256(password).toString(),
      deviceIdentifier: this.storageService.getUuid(),
      typeIncome
    }).pipe(
      map(response => {
        if (response.titleOne === 'success') {
          return {
            type: 'success',
            user: {
              userId: response.json.userId,
              actId: response.json.actId,
              aplId: response.json.aplId,
              typeIdentification: response.json.typeIdentification,
              identification: username,
              aplicantName: response.json.aplicantName,
              accountNumber: response.json.accountNumber,
            },
            cards: (response.json.cardNumberList as Card[])
              .map(card => ({
                ...card,
                cardNumber:
                // tslint:disable-next-line:max-line-length
                  `${card.cardNumber.substr(card.cardNumber.length - 8, 4)} ${card.cardNumber.substr(card.cardNumber.length - 4, card.cardNumber.length)}`
              }))
          };
        }

        if (response.titleOne === 'warn') {
          return {
            type: 'warn',
            response
          };
        }

        if (response.titleOne === 'error') {
          throw new Error(response.json.message);
        }
      })
    );
  }

  logout(username: string, deviceIdentifier: number = 1213123134, typeIncome: number = 2): Observable<'success' | 'error'> {
    return this.httpService.post('canales', this.logoutUri, {
      username,
      deviceIdentifier,
      typeIncome
    }).pipe(
      tap(response => {
          if (response.type === 'error') {
            this.toastService.show({text: response.descriptionOne, type: 'error'});
          }
        }),
      map(response => response.type)
    );
  }

  getDeviceInfo(): Observable<{ status: string; id: number }> {
    return this.httpService.post('canales', this.getDeviceInfoUri, {uuid: this.storageService.getUuid()})
      .pipe(
        map(response => ({status: response.type, id: response.id}))
      );
  }

  sendOtp(optSent: boolean, identification: string, typeIdentification: number = 1):
    Observable<{ userId: number, phoneNumber: string; email: string }> {
    return this.httpService.post('canales', 'security/getdatamaskednameapplicantsendotp', {
      identification,
      typeIdentification
    }).pipe(
      tap(response => {
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

  validateOtp(confirmationCode: number, userId): Observable<{ status: 'success' | 'error', message: string }> {
    return this.httpService.post('canales', this.validateOtpUri, {
      userId,
      validateToken: 1,
      usernameSecurity: 'sts_sac',
      passwordSecurity: '27ddddd7aa59f8c80837e6f46e79d5d5c05a4068914babbbf7745b43a2b21f47',
      confirmationCode
    }).pipe(
      map(response => ({status: response.type, message: response.descriptionOne}))
    );
  }

  saveDevice(): Observable<'success' | 'error'> {
    return this.httpService.post('canales', this.saveDeviceUri, {
      deviceIdentification: this.storageService.getUuid(),
      uuid: this.storageService.getUuid(),
      platform: this.deviceService.os === 'Mac' ? 1 : this.deviceService.os === 'Android' ? 2 : 3,
      manufacturer: this.deviceService.os,
      model: this.deviceService.os,
      platformVersion: this.deviceService.os_version,
      carrierName: 'No encontrado',
      isoCountryCode: 'XXXXXXXXXX',
      mobileNetworkCode: 'XXXXXXXXXX',
      mobileCountryCode: 'XXXXXXXXXX',
      numberPhone: '0000000000',
      isActive: '1'
    }).pipe(
      tap(response => {
          if (response.type === 'error') {
            this.toastService.show({text: 'Ocurrió un error. Intente nuevamente', type: response.type});
          }
        }),
      map(response => response.type)
    );
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
