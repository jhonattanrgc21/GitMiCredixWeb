import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../../core/services/storage.service';
import {CacheBuster} from 'ngx-cacheable';
import {cleanSchedulePayments$} from '../../../../../core/services/channels-api.service';

@Injectable()
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


  @CacheBuster({
    cacheBusterNotifier: cleanSchedulePayments$
  })
  setAutomaticsPayment(transactionTypeId: number,
                       publicServiceId: number,
                       periodicityId: number,
                       startDate: string,
                       key: string,
                       maxAmount: number,
                       aliasName: string,
                       credixCode: number) {
    return this.httpServices.post('canales', 'schedulerpayment/createschedulerpayment', {
      // tslint:disable-next-line:no-shadowed-variable
      cardId: this.storageServices.getCurrentCards().find((element) => element.category = 'Principal').cardId,
      transactionTypeId,
      publicServiceId,
      periodicityId,
      currencyId: 188,
      startDate,
      key,
      maxAmount,
      aliasName,
      credixCode
    });
  }

  @CacheBuster({
    cacheBusterNotifier: cleanSchedulePayments$
  })
  setUpdateAutomatics(periodicityId: number, startDate: string, maxAmount: number, schedulerPayId: number, codeCredix: string) {
    return this.httpServices.post('canales', 'schedulerpayment/updateschedulerpayment', {
      periodicityId,
      startDate,
      maxAmount,
      schedulerPayId,
      codeCredix
    });
  }
}
