import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map, publishReplay, refCount} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {AccountSummary} from '../../shared/models/account-summary';
import {Currency} from '../../shared/models/currency';
import {IdentificationType} from '../../shared/models/IdentificationType';

@Injectable()
export class GlobalRequestsService {
  currencies: Observable<Currency[]>;
  identificationTypes: Observable<IdentificationType[]>;
  accountSummary: Observable<AccountSummary>;
  quotas: Observable<number[]>;
  private currenciesUri = 'global/currencies';
  private identificationTypesUri = 'global/identification-types';
  private accountSummaryUri = 'channels/accountsummary';
  private getQuotasUri = 'customerservice/listquotabyproduct';
  private getIbanAccountUri = 'account/getibanaccount';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  getCurrencies(): Observable<Currency[]> {
    if (!this.currencies) {
      this.currencies = this.httpService.post('canales', this.currenciesUri)
        .pipe(
          publishReplay(1),
          refCount(),
          map(response => {
            if (response.type === 'success') {
              return response.currencies;
            } else {
              return [];
            }
          }));
    }

    return this.currencies;
  }

  getIdentificationTypes() {
    if (!this.identificationTypes) {
      this.identificationTypes = this.httpService.post('canales', this.identificationTypesUri)
        .pipe(
          publishReplay(1),
          refCount(),
          map(response => {
            if (response.type === 'success') {
              return response.identificationTypes;
            } else {
              return [];
            }
          }));
    }

    return this.identificationTypes;
  }

  getAccountSummary(cardId: number = this.storageService.getCurrentCards().find(card => card.category === 'Principal').cardId):
    Observable<AccountSummary> {
    if (!this.accountSummary) {
      this.accountSummary = this.httpService.post('canales', this.accountSummaryUri, {
        cardId,
        userId: this.storageService.getCurrentUser().userId
      })
        .pipe(
          publishReplay(1),
          refCount(),
          map(response => {
            if (response.type === 'success' || response.titleOne === 'Éxito') {
              return {
                available: response.json.compracuotasdisp,
                limit: response.json.compra,
                consumed: response.json.consumed
              };
            } else {
              return {
                available: '0',
                limit: '0',
                consumed: '0'
              };
            }
          }));
    }

    return this.accountSummary;
  }

  getQuotas(productId: number): Observable<number[]> {
    if (!this.quotas) {
      this.quotas = this.httpService.post('canales', this.getQuotasUri, {
        productId
      })
        .pipe(
          publishReplay(1),
          refCount(),
          map(response => {
            if (response.type === 'success') {
              return response.listQuota.map(q => q.quota);
            } else {
              return [];
            }
          }));
    }

    return this.quotas;
  }

  getIbanAccount() {
    return this.httpService.post('canales', this.getIbanAccountUri, {channelId: 102});
  }

}
