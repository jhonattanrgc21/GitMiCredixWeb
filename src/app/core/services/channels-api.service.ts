import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Cacheable} from 'ngx-cacheable';
import {map} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {Observable, Subject} from 'rxjs';
import {AdditionalCard} from '../../shared/models/additional-card';
import {ThAddress} from '../../shared/models/th-address';
import {SchedulePayments} from '../../shared/models/schedule-payments';


export const cleanSchedulePayments$ = new Subject();

@Injectable()
export class ChannelsApiService {
  private readonly accountSummaryUri = 'channels/accountsummary';
  private readonly getAdditionalCardsUri = 'channels/getlistsadditionalcardsth';
  private readonly thAddressesUri = 'channels/getaddressth';
  private readonly getSchedulePaymentsUri = 'schedulerpayment/getscheduledpays';
  private readonly getamountavailablecreditUri = 'channels/getamountavailablecredit';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  @Cacheable({
    maxCacheCount: 3
  })

  getAccountSummary(cardId: number) {
    return this.httpService.post('canales', this.accountSummaryUri, {
      cardId,
      userId: this.storageService.getCurrentUser().userId,
    }).pipe(
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

  getAmountAvailableCredit(cardId: number) {
    return this.httpService.post('canales', this.getamountavailablecreditUri, {
      cardId,
      userId: this.storageService.getCurrentUser().userId,
    }).pipe(
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

  @Cacheable()
  getAdditionalCards(): Observable<AdditionalCard[]> {
    return this.httpService.post('canales', this.getAdditionalCardsUri)
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.json;
          } else {
            return [];
          }
        })
      );
  }

  @Cacheable()
  getThAddresses(): Observable<{ addresses: ThAddress[], email: string; phone: number }> {
    return this.httpService
      .post('canales', this.thAddressesUri, {identification: this.storageService.getCurrentUser().identification})
      .pipe(
        map((response) => {
          if (response.titleOne === 'success') {
            return {addresses: response.json.address, email: response.json.email, phone: response.json.phone};
          } else {
            return null;
          }
        })
      );
  }

  @Cacheable({
    cacheBusterObserver: cleanSchedulePayments$.asObservable()
  })
  getAllSchedulersPayment(): Observable<SchedulePayments[]> {
    return this.httpService.post('canales', this.getSchedulePaymentsUri)
      .pipe(
        map((response) => {
          if (response.scheduledPayList?.length > 0 && response.message === 'Operación exitosa') {
            return response.scheduledPayList;
          } else {
            return [];
          }
        })
      );
  }
}
