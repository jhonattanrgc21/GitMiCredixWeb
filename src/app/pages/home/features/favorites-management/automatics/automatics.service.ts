import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../../core/services/storage.service';
import {Cacheable, CacheBuster} from 'ngx-cacheable';
import {cleanSchedulePayments$} from '../../../../../core/services/channels-api.service';
import {Observable} from 'rxjs';
import {Periodicity} from '../../../../../shared/models/periodicity';

@Injectable()
export class AutomaticsService {
  private readonly getPeriodicityUri = 'schedulerpayment/getperiodicitylist';

  constructor(private httpServices: HttpService,
              private storageServices: StorageService) {
  }

  @Cacheable()
  getPeriodicity(): Observable<Periodicity[]> {
    return this.httpServices.post('canales', this.getPeriodicityUri)
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
                       key: number,
                       maxAmount: number,
                       aliasName: string,
                       credixCode: number,
                       publicServiceAccessKeyId: number) {
    return this.httpServices.post('canales', 'schedulerpayment/createschedulerpayment', {
      cardId: this.storageServices.getCurrentCards()
        .find((element) => element.category = 'Principal').cardId,
      transactionTypeId,
      publicServiceId,
      periodicityId,
      currencyId: 188,
      startDate,
      key,
      maxAmount,
      aliasName,
      publicServiceAccessKeyId,
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
