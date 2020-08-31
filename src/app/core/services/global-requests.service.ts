import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map, publishReplay, refCount} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {AccountSummary} from '../../shared/models/account-summary';
import {Currency} from '../../shared/models/currency';
import {IdentificationType} from '../../shared/models/IdentificationType';
import {IbanAccount} from '../../shared/models/iban-account';
import {Country} from '../../shared/models/country';
import {Province} from '../../shared/models/province';
import {Canton} from '../../shared/models/canton';
import {District} from '../../shared/models/district';
import {Occupation} from '../../shared/models/occupation';
import {IncomeType} from '../../shared/models/income-type';

@Injectable()
export class GlobalRequestsService {
  currencies: Observable<Currency[]>;
  identificationTypes: Observable<IdentificationType[]>;
  countries: Observable<Country[]>;
  provinces: Observable<Province[]>;
  cantons: Observable<Canton[]>;
  districts: Observable<District[]>;
  occupations: Observable<Occupation[]>;
  incomeTypes: Observable<IncomeType[]>;
  accountSummary: Observable<AccountSummary>;
  quotas: Observable<number[]>;
  ibanAccounts: Observable<IbanAccount[]>;
  userApplicantInfo: Observable<any>;
  userApplicantProfileImage: Observable<string>;
  private provinceId: number;
  private cantonId: number;
  private currenciesUri = 'global/currencies';
  private identificationTypesUri = 'global/identification-types';
  private countriesUri = 'global/listcountries';
  private provincesUri = 'global/listprovinces';
  private cantonsUri = 'global/listcantons';
  private districtsUri = 'global/listdistricts';
  private occupationsUri = 'global/findalloccupation';
  private incomeTypesUri = 'global/getTypeIncome';
  private accountSummaryUri = 'channels/accountsummary';
  private getQuotasUri = 'customerservice/listquotabyproduct';
  private getIbanAccountUri = 'account/getibanaccount';
  private userApplicantInfoUri = 'applicant/finduserapplicantaccountnumber';
  private getApplicantProfilePhotoUri = 'applicant/getProfilePhotoApplicant';

  constructor(
    private httpService: HttpService,
    private storageService: StorageService
  ) {
  }

  getCurrencies(): Observable<Currency[]> {
    if (!this.currencies) {
      this.currencies = this.httpService
        .post('canales', this.currenciesUri)
        .pipe(
          publishReplay(1),
          refCount(),
          map((response) => {
            if (response.type === 'success') {
              return response.currencies;
            } else {
              return [];
            }
          })
        );
    }

    return this.currencies;
  }

  getIdentificationTypes() {
    if (!this.identificationTypes) {
      this.identificationTypes = this.httpService
        .post('canales', this.identificationTypesUri)
        .pipe(
          publishReplay(1),
          refCount(),
          map((response) => {
            if (response.type === 'success') {
              return response.identificationTypes;
            } else {
              return [];
            }
          })
        );
    }

    return this.identificationTypes;
  }

  getCountries() {
    if (!this.countries) {
      this.countries = this.httpService
        .post('canales', this.countriesUri)
        .pipe(
          publishReplay(1),
          refCount()
        );
    }

    return this.countries;
  }

  getProvinces() {
    if (!this.provinces) {
      this.provinces = this.httpService
        .post('canales', this.provincesUri)
        .pipe(
          publishReplay(1),
          refCount()
        );
    }

    return this.provinces;
  }

  getCantons(provinceId: number) {
    if (provinceId !== this.provinceId) {
      this.cantons = null;
    }

    if (!this.cantons) {
      this.provinceId = provinceId;
      this.cantons = this.httpService
        .post('canales', this.cantonsUri, {provinceId})
        .pipe(
          publishReplay(1),
          refCount()
        );
    }

    return this.cantons;
  }

  getDistricts(cantonId: number) {
    if (cantonId !== this.cantonId) {
      this.districts = null;
    }

    if (!this.districts) {
      this.cantonId = cantonId;
      this.districts = this.httpService
        .post('canales', this.districtsUri, {cantonId})
        .pipe(
          publishReplay(1),
          refCount()
        );
    }

    return this.districts;
  }

  getOccupations() {
    if (!this.occupations) {
      this.occupations = this.httpService
        .post('canales', this.occupationsUri)
        .pipe(
          publishReplay(1),
          refCount()
        );
    }

    return this.occupations;
  }

  getIncomeTypes() {
    if (!this.incomeTypes) {
      this.incomeTypes = this.httpService
        .post('canales', this.incomeTypesUri)
        .pipe(
          publishReplay(1),
          refCount()
        );
    }

    return this.incomeTypes;
  }

  getAccountSummary(
    cardId: number = this.storageService
      .getCurrentCards()
      .find((card) => card.category === 'Principal').cardId
  ): Observable<AccountSummary> {
    if (!this.accountSummary) {
      this.accountSummary = this.httpService
        .post('canales', this.accountSummaryUri, {
          cardId,
          userId: this.storageService.getCurrentUser().userId,
        })
        .pipe(
          publishReplay(1),
          refCount(),
          map((response) => {
            if (response.type === 'success' || response.titleOne === 'Éxito') {
              return {
                available: response.json.compracuotasdisp,
                limit: response.json.compra,
                consumed: response.json.consumed,
              };
            } else {
              return {
                available: '0',
                limit: '0',
                consumed: '0',
              };
            }
          })
        );
    }

    return this.accountSummary;
  }

  getQuotas(productId: number): Observable<number[]> {
    if (!this.quotas) {
      this.quotas = this.httpService
        .post('canales', this.getQuotasUri, {
          productId
        })
        .pipe(
          publishReplay(1),
          refCount(),
          map((response) => {
            if (response.type === 'success') {
              return response.listQuota.map((q) => q.quota);
            } else {
              return [];
            }
          })
        );
    }

    return this.quotas;
  }

  getIbanAccounts(): Observable<IbanAccount[]> {
    if (!this.ibanAccounts) {
      this.ibanAccounts = this.httpService
        .post('canales', this.getIbanAccountUri)
        .pipe(publishReplay(1),
          refCount(),
          map((response) => {
            if (response.type === 'success' && response.ibanAccountList) {
              return response.ibanAccountList;
            } else {
              return [];
            }
          }));
    }
    return this.ibanAccounts;
  }

  getUserApplicantInfo(accountNumber: number): Observable<any> {
    if (!this.userApplicantInfo) {
      this.userApplicantInfo = this.httpService
        .post('canales', this.userApplicantInfoUri, {accountNumber})
        .pipe(publishReplay(1),
          refCount(),
          map((response) => {
            if (response.type === 'success') {
              return response.informationApplicant;
            } else {
              return null;
            }
          })
        );
    }
    return this.userApplicantInfo;
  }

  getApplicantProfilePhoto() {
    if (!this.userApplicantProfileImage) {
      this.userApplicantProfileImage = this.httpService.post('canales', this.getApplicantProfilePhotoUri, {
        identification: this.storageService.getIdentification()
      }).pipe(publishReplay(1),
        refCount(),
        map(response => response.imgBase64));
    }
    return this.userApplicantProfileImage;
  }
}
