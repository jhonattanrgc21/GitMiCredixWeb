import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {Subject} from 'rxjs';

@Injectable()
export class AdditionalCardsManagementService {
  private readonly saveAdditionalCardUri = 'channels/saveadditionalcard';

  // tslint:disable-next-line:variable-name
  private _personalInfo = new Subject<PersonalInfo>();

  personalInfo$ = this._personalInfo.asObservable();

  set personalInfo(personalInfo: PersonalInfo) {
    this._personalInfo.next(personalInfo);
  }

  // tslint:disable-next-line:variable-name
  private _pickUpPlace = new Subject<string>();

  constructor(private httpService: HttpService) {
  }

  pickUpPlace$ = this._pickUpPlace.asObservable();

  set pickUpPlace(pickUpPlace: string) {
    this._pickUpPlace.next(pickUpPlace);
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
