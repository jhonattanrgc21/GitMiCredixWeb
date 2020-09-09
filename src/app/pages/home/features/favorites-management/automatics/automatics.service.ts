import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../../core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutomaticsService {

  constructor(private httpServices: HttpService,
              private storageServices: StorageService) {
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
      credixCode: codeCredix
    });
  }

  setDeleteAutomatics(automaticId: number) {
    return this.httpServices.post('canales', 'schedulerpayment/deleteschedulerpayment', {
      channelId: 102,
      schedulerPayId: automaticId
    });
  }
}
