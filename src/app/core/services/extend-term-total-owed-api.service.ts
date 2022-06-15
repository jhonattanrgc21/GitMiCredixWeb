import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable()
export class ExtendTermTotalOwedApiService {
  private readonly quotasPreviousMovementsUri = 'channels/quotacalculator';
  private readonly saveExtendTotalDebitUri = 'account/saveentendtotaldebit';
  private readonly cutDateUri = 'channels/cutdateextermterm';

  // public result: {title: string, message: string, status: string} = null;

  // tslint:disable-next-line:variable-name
  public _result: { status: 'success' | 'error'; message: string };

  get result(): { status: 'success' | 'error'; message: string } {
    return this._result;
  }

  set result(result: { status: 'success' | 'error'; message: string }) {
    this._result = result;
  }

  public newQuota: {amount: string, quota: number, currency: string,} = null;

  constructor(
    private httpService: HttpService,
  ) { }

  checkCutDate() {
    return this.httpService.post('canales', this.cutDateUri);
  }
  
  // getQuotasPreviousMovement(transaction: number[], productId: number): Observable<{purchaseAmount: string, minimumPayment: string, listQuota: any}> {
  //   return this.httpService.post('canales', this.quotasPreviousMovementsUri, {
  //     productId,
  //     transaction : '1'
  //   })
  //   .pipe(
  //     map(response => {
  //       return response;
  //       // if ( response?.listQuota ) {
  //       //   return response;
  //       // } else {
  //       //   return [];
  //       // }
  //     })
  //   );
  // }
  
  getQuotasPreviousMovement(transaction: number[], productId: number): Observable<any> {
    return this.httpService.post('canales', this.quotasPreviousMovementsUri, {
      productId,
      transaction : '1'
    })
    .pipe(
      map(response => {
        return response;
      })
    );
  }

  saveExtendTotalDebit(quota: number, productId: number): Observable<{title: 'success' | 'error', type: string, status: number, message: string,}> {
    return this.httpService.post('canales', this.saveExtendTotalDebitUri, {
      channelId : 101,
      accountId : 1,
      quota,
      productId
  })
    .pipe(
      map(response => ({
          title: response.titleOne,
          type: response.type,
          status: response.status,
          message: response.message,
      }))
    );
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
