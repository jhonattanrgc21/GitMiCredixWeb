import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../../core/services/storage.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutomaticsService {

  constructor(private httpServices: HttpService,
              private storageServices: StorageService) {
  }

  // tslint:disable-next-line:variable-name
  private __IsAdded: Subject<{ added: boolean }> = new Subject<{ added: boolean }>();
  // tslint:disable-next-line:variable-name
  private __IsDeleted: Subject<{ deleted: boolean }> = new Subject<{ deleted: boolean }>();

  get isAdded(): Observable<{ added: boolean }> {
    return this.__IsAdded.asObservable();
  }

  emitAutomaticIsAdded(added: boolean) {
    this.__IsAdded.next({added});
  }


  get isDeleted(): Observable<{ deleted: boolean }> {
    return this.__IsDeleted.asObservable();
  }

  emitAutomaticsIsDeleted(deleted: boolean) {
    return this.__IsDeleted.next({deleted});
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
  setAutomaticsPayment(transTypeId: number, publicSrvcId: number, periodId: number, startDat: string, k: string, maxAmnt: number, codeCredix: number) {
    return this.httpServices.post('canales', 'schedulerpayment/createschedulerpayment', {
      channelId: 102,
      // tslint:disable-next-line:no-shadowed-variable
      cardId: this.storageServices.getCurrentCards().find((element) => element.category = 'Principal').cardId,
      transactionTypeId: transTypeId,
      publicServiceId: publicSrvcId,
      periodicityId: periodId,
      startDate: startDat,
      key: k,
      maxAmount: maxAmnt,
      credixCode: +codeCredix
    });
  }

  setDeleteAutomatics(automaticId: number) {
    return this.httpServices.post('canales', 'schedulerpayment/deleteschedulerpayment', {
      channelId: 102,
      schedulerPayId: automaticId
    });
  }
}
