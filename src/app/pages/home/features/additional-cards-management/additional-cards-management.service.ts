import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {Subject} from 'rxjs';

@Injectable()
export class AdditionalCardsManagementService {
  // tslint:disable-next-line:variable-name
  private _personalInfo = new Subject<PersonalInfo>();
  set personalInfo(personalInfo: PersonalInfo) {
    this._personalInfo.next(personalInfo);
  }

  // tslint:disable-next-line:variable-name
  private _pickUpPlace = new Subject<string>();
  set pickUpPlace(pickUpPlace: string) {
    this._pickUpPlace.next(pickUpPlace);
  }

  private readonly saveAdditionalCardUri = 'channels/saveadditionalcard';
  private readonly setCreditLimitUri = 'channels/setlimitnumberpercentage';
  private readonly disableAdditionalCardUri = 'channels/deactivateadditionalcard';
  personalInfo$ = this._personalInfo.asObservable();
  pickUpPlace$ = this._pickUpPlace.asObservable();

  constructor(private httpService: HttpService) {
  }

  saveAdditionalCard(name: string, lastNames: string, idIdentificationType: number, identification: string, phone: string, email: string,
                     birthday: string, limitPercentage: number, retreatPlace: string, credixCode: string) {
    return this.httpService
      .post('canales', this.saveAdditionalCardUri, {
        name,
        lastNames,
        idIdentificationType,
        identification,
        phone,
        email,
        birthday,
        limitPercentage,
        retreatPlace,
        credixCode,
      });
  }

  setCreditLimit(cardId: number, limitPercentage: number) {
    return this.httpService
      .post('canales', this.setCreditLimitUri, {
        cardId,
        limitPercentage
      });
  }

  disableAdditionalCard(cardId: number) {
    return this.httpService
      .post('canales', this.disableAdditionalCardUri, {
        cardId,
      });
  }
}

interface PersonalInfo {
  name: string;
  lastName: string;
  identificationType: number;
  identification: number;
  phoneNumber: number;
  email: string;
  birthday: Date;
  creditLimit: number;
}
