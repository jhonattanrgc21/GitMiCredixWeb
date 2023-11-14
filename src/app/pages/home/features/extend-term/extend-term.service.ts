import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AllowedMovement} from '../../../../shared/models/allowed-movement';
import {StorageService} from '../../../../core/services/storage.service';
import {ExtendTermQuota} from '../../../../shared/models/extend-term-quota';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {PreviousMovements} from '../../../../shared/models/previous-purchase';

@Injectable()
export class ExtendTermService {
  private readonly getAllowedMovementsUri = 'channels/allowedmovements';
  private readonly calculateQuotaUri = 'channels/quotacalculator';
  private readonly saveNewQuotaUri = 'channels/savequotification';
  private readonly cutDateUri = 'channels/cutdateextermterm';
  private readonly quotasPreviousMovementsUri = 'channels/quotacalculator';
  private readonly saveNewQuotaPreviousMovementsUri = 'account/savepreviousconsumptions';
  // tslint:disable-next-line:variable-name
  private _amountSummary = '0';
  private _pagoContadoColones = '';
  private _movementsSelectedArr: PreviousMovements[] = [];
  private _endDate: Date;

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }

  get movementsSelectedArr() {
    return this._movementsSelectedArr;
  }

  set movementsSelectedArr(val: PreviousMovements[]) {
    this._movementsSelectedArr = val;
  }

  get amountSummary(): string {
    return this._amountSummary;
  }

  set amountSummary(val: string) {
    this._amountSummary = val;
  }

  get pagoContadoColones(): string {
    return this._pagoContadoColones;
  }

  set pagoContadoColones(val: string ) {
    this._pagoContadoColones = val;
  }

  // tslint:disable-next-line:variable-name
  _movementsSelected: string[] = [];

  get movementsSelected(): string[] {
    return this._movementsSelected;
  }

  set movementsSelected(movementSelected: string[]) {
    this._movementsSelected = movementSelected;
  }

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

  checkCutDate() {
    return this.httpService.post('canales', this.cutDateUri);
  }

  getAllowedMovements(productId: number): Observable<any> {
    return this.httpService.post('canales', this.getAllowedMovementsUri, {
      accountId: this.storageService.getCurrentUser().actId,
      cardId: this.storageService.getCurrentCards().find(element => element.category === 'Principal').cardId,
      productId,
    })
      .pipe(
        map((response) => {
            if ( response.type === 'success' ) {
              return response;
            } else {
              return [];
            }
          }
        ));
  }

  calculateQuotaByMovement(movementId: string, productId = 1): Observable<ExtendTermQuota[]> {
    return this.httpService.post('canales', this.calculateQuotaUri, {
      transaction: movementId,
      productId
    })
      .pipe(
        map(response => {
            if ( response?.listQuota ) {
              return [{
                feeAmount: '0,00',
                feePercentage: 0,
                quotaTo: (response.listQuota as ExtendTermQuota[])[0].quotaFrom,
                amountPerQuota: '0,00',
                quotaFrom: 0,
                financedPlan: 0,
                purchaseAmount: '0,00',
                IVA: '0,00',
                commissionAmount: '0,00',
                commissionPercentage: '0,00',
              }, ...response.listQuota];
            } else {
              return [];
            }
          }
        ));


  }

  getQuotasPreviousMovement(transaction: string[], productId: number): Observable<{purchaseAmount: string, listQuota: PaymentQuota[]}> {
    return this.httpService.post('canales', this.quotasPreviousMovementsUri, {
      productId,
      transaction
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

  saveNewQuotaPreviousConsumptions( quota = 1, transaction: string[]): Observable<{title: string, message: string, type: string, status: 'success' | 'error'}> {
    return this.httpService.post('canales', this.saveNewQuotaPreviousMovementsUri, {
      accountId: this.storageService.getCurrentUser().actId,
      quota,
      transaction
    })
    .pipe(
      map(response => ({
          title: response.titleOne,
          message: response.message,
          type: response.type,
          status: response.titleOne
        }))
    );
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
