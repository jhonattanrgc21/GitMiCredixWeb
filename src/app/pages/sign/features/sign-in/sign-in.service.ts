import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import * as CryptoJS from 'crypto-js';
import {Observable, Subject} from 'rxjs';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {User} from '../../../../shared/models/user';
import {map, tap} from 'rxjs/operators';
import {Card} from '../../../../shared/models/card';

@Injectable()
export class SignInService {
  private readonly loginUri = 'security/userlogin';
  private readonly logoutUri = 'security/logoutbyusername';
  private readonly getDeviceInfoUri = 'channels/getdeviceinfo';
  private readonly validateOtpUri = 'security/validateonetimepassword';
  private newDeviceSub = new Subject();
  newDevice$ = this.newDeviceSub.asObservable();

  constructor(private httpService: HttpService,
              private toastService: CredixToastService) {
  }

  login(username: string, password: string, deviceIdentifier: number = 1213123134, typeIncome: number = 2):
    Observable<{ user: User, cards: Card[] }> {
    return this.httpService.post('canales', this.loginUri, {
      username,
      password: CryptoJS.SHA256(password).toString(),
      deviceIdentifier,
      typeIncome
    }).pipe(
      tap(response => {
        if (response.titleOne === 'warn') {
          this.newDeviceSub.next();
        }
      }),
      map(response => {
        if (response.titleOne === 'success') {
          return {
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
                  `${card.cardNumber.substr(card.cardNumber.length - 8, 4)} ${card.cardNumber.substr(card.cardNumber.length - 4, card.cardNumber.length)}`
              }))
          };
        } else {
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
        },
        error => {
        },
        () => {
        }),
      map(response => response.type)
    );
  }

  getDeviceInfo(uuid = 12345): Observable<{ status: string; id: number }> {
    return this.httpService.post('canales', this.getDeviceInfoUri, {uuid})
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
      tap(response => this.toastService.show({text: response.descriptionOne, type: response.type}),
        error => {
        },
        () => {
        }),
      map(response => ({status: response.type, message: response.descriptionOne}))
    );
  }

  saveDevice(): Observable<'success' | 'error'> {
    return this.httpService.post('canales', 'channels/savedevice', {
      deviceIdentification: '12345',
      platform: 1,
      uuid: 12345,
      carrierName: 'AT&T',
      platformVersion: '8.2.3',
      manufacturer: 'Xiaomi',
      model: 'Redmi note 8 pro',
      isoCountryCode: 'VE',
      mobileNetworkCode: '123',
      mobileCountryCode: '123',
      numberPhone: '1234567890',
      isActive: '1'
    }).pipe(
      tap(response => {
          if (response.type === 'error') {
            this.toastService.show({text: 'Ocurrió un error. Intente nuevamente', type: response.type});
          }
        },
        error => {
        },
        () => {
        }),
      map(response => response.type)
    );
  }

}
