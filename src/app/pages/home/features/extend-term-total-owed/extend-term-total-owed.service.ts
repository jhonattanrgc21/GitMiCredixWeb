import { Injectable } from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExtendTermTotalOwedService {
  private readonly quotasPreviousMovementsUri = 'channels/quotacalculator';
  private readonly saveExtendTotalDebitUri = 'account/saveentendtotaldebit';
  private readonly cutDateUri = 'channels/cutdateextermterm';

  public result: {title: string, message: string, status: string} = null;
  public newQuota: {amount: string, quota: number, currency: string,} = null;

  constructor(
    private httpService: HttpService,
  ) { }

  checkCutDate() {
    return this.httpService.post('canales', this.cutDateUri);
  }
  
  getQuotasPreviousMovement(transaction: number[], productId: number): Observable<{purchaseAmount: string, minimumPayment: string, listQuota: any}> {
    return this.httpService.post('canales', this.quotasPreviousMovementsUri, {
      productId,
      transaction : '1'
    })
    .pipe(
      map(response => {
        if ( response?.listQuota ) {
          return response;
        } else {
          return [];
        }
      })
    );
  }

  saveExtendTotalDebit(quota: number, productId: number): Observable<{title: string, type: string, status: 'success' | 'error', message: string,}> {
    return this.httpService.post('canales', this.saveExtendTotalDebitUri, {
      channelId : 101,
      accountId : 1,
      quota,
      productId
  })
    .pipe(
      map(response => ({
          title: response.titeOne,
          type: response.type,
          status: response.status,
          message: response.message,
      }))
    );
  }


}
