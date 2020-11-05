import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AllowedMovement} from '../../../../shared/models/allowed-movement';
import {StorageService} from '../../../../core/services/storage.service';
import {ExtendTermQuota} from '../../../../shared/models/extend-term-quota';

@Injectable()
export class ExtendTermService {
  private readonly getAllowedMovementsUri = 'channels/allowedmovements';
  private readonly calculateQuotaUri = 'channels/quotacalculator';
  private readonly saveNewQuotaUri = 'channels/savequotification';
// tslint:disable-next-line:variable-name
  _result: { status: 'success' | 'error'; message: string };

  get result(): { status: 'success' | 'error'; message: string } {
    return this._result;
  }

  set result(result: { status: 'success' | 'error'; message: string }) {
    this._result = result;
  }

  // tslint:disable-next-line:variable-name
  _newQuota: { establishment: string; currency: string; amount: string; quota: number };

  get newQuota(): { establishment: string; currency: string; amount: string; quota: number } {
    return this._newQuota;
  }

  set newQuota(newQuota: { establishment: string; currency: string; amount: string; quota: number }) {
    this._newQuota = newQuota;
  }

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  getAllowedMovements(): Observable<AllowedMovement[]> {
    return this.httpService.post('canales', this.getAllowedMovementsUri, {
      accountId: this.storageService.getCurrentUser().actId,
      cardId: this.storageService.getCurrentCards().find(element => element.category === 'Principal').cardId
    })
      .pipe(
        map((response) => {
            if (response.result) {
              return response.result;
            } else {
              return [];
            }
          }
        ));
  }

  calculateQuotaByMovement(movementId: string): Observable<ExtendTermQuota[]> {
    return this.httpService.post('canales', this.calculateQuotaUri, {movementId})
      .pipe(
        map(response => {
            if (response.type === 'success') {
              return [{
                feeAmount: '0,00',
                feePercentage: 0,
                quotaTo: (response.listQuota as ExtendTermQuota[])[0].quotaFrom,
                amountPerQuota: '0,00',
                quotaFrom: 0,
                financedPlan: 0,
                purchaseAmount: '0,00',
                IVA: '0,00'
              }, ...response.listQuota];
            } else {
              return [];
            }
          }
        ));
  }

  saveNewQuota(cardId: number, feeAmount: number, newQuota: number, movementId: string): Observable<any> {
    return this.httpService.post('canales', this.saveNewQuotaUri, {
      cardId,
      feeAmount,
      newQuota,
      movementId,
      statusId: 1,
      userIdCreate: this.storageService.getCurrentUser().userId,
    });
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
