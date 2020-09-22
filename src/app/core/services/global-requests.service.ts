import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {catchError, map, publishReplay, refCount} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {Observable, of} from 'rxjs';
import {AccountSummary} from '../../shared/models/account-summary';
import {Currency} from '../../shared/models/currency';
import {IdentificationType} from '../../shared/models/identification-type';
import {IbanAccount} from '../../shared/models/iban-account';
import {Country} from '../../shared/models/country';
import {Province} from '../../shared/models/province';
import {Canton} from '../../shared/models/canton';
import {District} from '../../shared/models/district';
import {Occupation} from '../../shared/models/occupation';
import {IncomeType} from '../../shared/models/income-type';
import {Quota} from '../../shared/models/quota';
import {DatePipe} from '@angular/common';
import {AdditionalCard} from '../../shared/models/additional-card';
import {DeliveryPlace} from '../../shared/models/delivery-place';
import {ThAddress} from '../../shared/models/th-address';

@Injectable()
export class GlobalRequestsService {
  private homeContent: Observable<any>;
  private currencies: Observable<Currency[]>;
  private identificationTypes: Observable<IdentificationType[]>;
  private countries: Observable<Country[]>;
  private provinces: Observable<Province[]>;
  private cantons: Observable<Canton[]>;
  private districts: Observable<District[]>;
  private occupations: Observable<Occupation[]>;
  private incomeTypes: Observable<IncomeType[]>;
  private accountSummary: Observable<AccountSummary>;
  private quotas: Observable<Quota[]>;
  private ibanAccounts: Observable<IbanAccount[]>;
  private userApplicantInfo: Observable<any>;
  private userApplicantProfileImage: Observable<string>;
  private additionalCards: Observable<AdditionalCard[]>;
  private deliveryPlaces: Observable<DeliveryPlace[]>;
  private thAddresses: Observable<{ addresses: ThAddress[], email: string; phone: number }>;
  private provinceId: number;
  private cantonId: number;
  private readonly tagsHomePageUri = 'homepage/tagshomepage';
  private readonly currenciesUri = 'global/currencies';
  private readonly identificationTypesUri = 'global/identification-types';
  private readonly countriesUri = 'global/listcountries';
  private readonly provincesUri = 'global/listprovinces';
  private readonly cantonsUri = 'global/listcantons';
  private readonly districtsUri = 'global/listdistricts';
  private readonly occupationsUri = 'global/findalloccupation';
  private readonly incomeTypesUri = 'global/getTypeIncome';
  private readonly accountSummaryUri = 'channels/accountsummary';
  private readonly getQuotasUri = 'customerservice/listquotabyproduct';
  private readonly getIbanAccountUri = 'account/getibanaccount';
  private readonly userApplicantInfoUri = 'applicant/finduserapplicantaccountnumber';
  private readonly getApplicantProfilePhotoUri = 'applicant/getProfilePhotoApplicant';
  private readonly getAdditionalCardsUri = 'channels/getlistsadditionalcardsth';
  private readonly deliveryPlaceUri = 'global/deliveryplace';
  private readonly thAddressesUri = 'channels/getaddressth';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  getHomeContent(cardId: number) {
    if (!this.homeContent) {
      this.homeContent = this.httpService.post('canales', this.tagsHomePageUri, {
        cardId,
        userId: this.storageService.getCurrentUser().userId,
        hour: new DatePipe('es').transform(new Date(), 'HH:MM')
      })
        .pipe(
          publishReplay(1),
          refCount(),
          map(response => {
            if (response.type !== 'error') {
              return response.json;
            } else {
              throw new Error('Ocurrió un error');
            }
          }),
          catchError(err => {
            console.log('Error: ', err);
            return of();
          })
        );
    }

    return this.homeContent;
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

  getAccountSummary(cardId: number): Observable<AccountSummary> {
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

  getQuotas(productId: number): Observable<Quota[]> {
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
              return response.listQuota;
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
        .pipe(
          publishReplay(1),
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
        .pipe(
          publishReplay(1),
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
      }).pipe(
        publishReplay(1),
        refCount(),
        map(response => {
          if (response.type === 'success') {
            return response.imgBase64;
          } else {
            return null;
          }
        }));
    }
    return this.userApplicantProfileImage;
  }

  getAdditionalCards(): Observable<AdditionalCard[]> {
    if (!this.additionalCards) {
      this.additionalCards = this.httpService
        .post('canales', this.getAdditionalCardsUri)
        .pipe(
          publishReplay(1),
          refCount(),
          map((response) => {
            if (response.type === 'success') {
              return response.json;
            } else {
              return [];
            }
          })
        );
    }

    return this.additionalCards;
  }

  getDeliveryPlaces(): Observable<DeliveryPlace[]> {
    if (!this.deliveryPlaces) {
      this.deliveryPlaces = this.httpService
        .post('canales', this.deliveryPlaceUri)
        .pipe(
          publishReplay(1),
          refCount(),
          map((response) => {
            if (response.type === 'success') {
              return response.deliveryPlace;
            } else {
              return [];
            }
          })
        );
    }

    return this.deliveryPlaces;
  }

  getThAddresses(): Observable<{ addresses: ThAddress[], email: string; phone: number }> {
    if (!this.thAddresses) {
      this.thAddresses = this.httpService
        .post('canales', this.thAddressesUri, {
          identification: this.storageService.getIdentification()
        })
        .pipe(
          publishReplay(1),
          refCount(),
          map((response) => {
            if (response.titleOne === 'success') {
              return {addresses: response.json.address, email: response.json.email, phone: response.json.phone};
            } else {
              return;
            }
          })
        );
    }

    return this.thAddresses;
  }

  clearCache() {
    this.accountSummary = null;
    this.quotas = null;
    this.ibanAccounts = null;
    this.userApplicantInfo = null;
    this.userApplicantProfileImage = null;
    this.homeContent = null;
    this.additionalCards = null;
    this.thAddresses = null;
  }
}
