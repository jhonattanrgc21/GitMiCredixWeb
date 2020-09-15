import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../../core/services/storage.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutomaticsService {

  // tslint:disable-next-line:variable-name
  private __createDelete: Subject<{ added: boolean; del: boolean; }> = new Subject<{ added: boolean; del: boolean; }>();

  constructor(private httpServices: HttpService,
              private storageServices: StorageService) {
  }

  get isAddedOrDelete(): Observable<{ added: boolean; del: boolean; }> {
    return this.__createDelete.asObservable();
  }

  emitAutomaticIsAddedOrDelete(added: boolean, del: boolean) {
    this.__createDelete.next({added, del});
  }

  getPeriodicity() {
    return this.httpServices.post('canales', 'schedulerpayment/getperiodicitylist', {})
      .pipe(
        map((response) => {
          if (response.length > 0) {
            return response;
          } else {
            return [];
          }
        })
      );
  }

  getCurrency() {
    return this.httpServices.post('canales', 'global/currencies')
      .pipe(
        map((response) => {
          if (response.type === 'success' && response.status === 200) {
            return response.currencies;
          } else {
            return [];
          }
        })
      );
  }

  // tslint:disable-next-line:max-line-length
  setAutomaticsPayment(transTypeId: number, publicSrvcId: number, periodId: number, startDat: string, k: string, maxAmnt: number, alias: string, codeCredix: number) {
    return this.httpServices.post('canales', 'schedulerpayment/createschedulerpayment', {
      channelId: 102,
      // tslint:disable-next-line:no-shadowed-variable
      cardId: this.storageServices.getCurrentCards().find((element) => element.category = 'Principal').cardId,
      transactionTypeId: transTypeId,
      publicServiceId: publicSrvcId,
      periodicityId: periodId,
      currencyId: 188,
      startDate: startDat,
      key: k,
      maxAmount: maxAmnt,
      aliasName: alias,
      credixCode: +codeCredix
    });
  }

  setDeleteAutomatics(schedulerPayId: number) {
    return this.httpServices.post('canales', 'schedulerpayment/deleteschedulerpayment', {
      channelId: 102,
      schedulerPayId
    });
  }

  setUpdateAutomatics(periodicityId: number, startDate: string, maxAmount: number, schedulerPayId: number) {
    return this.httpServices.post('canales', 'schedulerpayment/updateschedulerpayment', {
      channelId: 102,
      periodicityId,
      startDate,
      maxAmount,
      schedulerPayId
    });
  }
}
