import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AllowedMovement} from '../../../../shared/models/allowed-movement';
import {StorageService} from '../../../../core/services/storage.service';
import {ExtendTermQuota} from '../../../../shared/models/extend-term-quota';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class ExtendTermService {

  get movementsSelected(): number[] {
    return this._movementsSelected;
  }

  set movementsSelected(movementSelected: number[]) {
    this._movementsSelected = movementSelected;
  }

  get recentMovementsSelected(): string[] {
    return this._recentMovementsSelected;
  }

  set recentMovementsSelected(movementSelected: string[]) {
    this._recentMovementsSelected = movementSelected;
  }

  get result(): { status: 'success' | 'error'; message: string } {
    return this._result;
  }

  set result(result: { status: 'success' | 'error'; message: string }) {
    this._result = result;
  }

  get newQuota(): { establishment: string; currency: string; amount: string; quota: number } {
    return this._newQuota;
  }

  set newQuota(newQuota: { establishment: string; currency: string; amount: string; quota: number }) {
    this._newQuota = newQuota;
  }

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }
  private readonly getAllowedMovementsUri = 'channels/allowedmovements';
  private readonly calculateQuotaUri = 'channels/quotacalculator';
  private readonly saveNewQuotaUri = 'channels/savequotification';
  private readonly cutDateUri = 'channels/cutdateextermterm';
  private readonly quotasPreviousMovementsUri = 'channels/quotacalculator';
  private readonly saveNewQuotaPreviousMovementsUri = 'account/savepreviousconsumptions';

  // private readonly allowedMovementsUri = /channels/allowedmovements

  // tslint:disable-next-line:variable-name
  _movementsSelected: number[] = [];
  _recentMovementsSelected: string[] = [];
  private $allowedMovementsState: Subject<AllowedMovement[]> = new Subject<AllowedMovement[]>();
  private $filterPromo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $hideButtonPromoFilter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private $disableCheckBoxState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _quotaPromoMin: number;
  private _quotaPromoMax: number;

  get $allowedMovement(): Observable<AllowedMovement[]> {
    return this.$allowedMovementsState.asObservable();
  }

  get $promoFilter(): Observable<boolean> {
    return this.$filterPromo.asObservable();
  }

  get $hidePromoFilter(): Observable<boolean> {
    return this.$hideButtonPromoFilter.asObservable();
  }

  get $disabledCheckBox(): Observable<boolean> {
    return this.$disableCheckBoxState.asObservable();
  }

  setDisabledCheckBox(value: boolean) {
    this.$disableCheckBoxState.next(value);
  }

  get quotaPromoMin() {
    return this._quotaPromoMin;
  }

  set quotaPromoMin(value: number) {
    this._quotaPromoMin = value;
  }

  get quotaPromoMax() {
    return this._quotaPromoMax;
  }

  set quotaPromoMax(value: number) {
    this._quotaPromoMax = value;
  }

  // tslint:disable-next-line:variable-name
  _result: { status: 'success' | 'error'; message: string };

  // tslint:disable-next-line:variable-name
  _newQuota: { establishment: string; currency: string; amount: string; quota: number };

  setFilterPromo(checked: boolean) {
    this.$filterPromo.next(checked);
  }

  setAllowedMovements(allowedMovements: AllowedMovement[]) {
    this.$allowedMovementsState.next(allowedMovements);
  }

  setHidePromoButtonFilter(hide: boolean) {
    this.$hideButtonPromoFilter.next(hide);
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
            if ((response?.result) && productId === 1004 && response.type === 'success' && response.promo) {
                this.setHidePromoButtonFilter(false);
            } else {
              this.setHidePromoButtonFilter(true);
            }

            if ( response.type === 'success' ) {
              return response;
            } else {
              return [];
            }
          }
        ));
  }

  calculateQuotaByMovement(movementId: string, productId = 1): Observable<any> {
    return this.httpService.post('canales', this.calculateQuotaUri, {
      transaction: movementId,
      productId
    })
      .pipe(
        map(response => {
          this.quotaPromoMin = response.quotaPromoMin;
          this.quotaPromoMax = response.quotaPromoMax;
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

  calculateQuotaByMovementUnified(movementList: string[], productId = 1): Observable<any> {
    let transactions = "";
    for (let index = 0; index < movementList.length; index++) {
      if(index == 0){
        transactions += "["
      }
      transactions += movementList[index]
      if(index + 1 !== movementList.length){
        transactions += ","
      }else{
        transactions += "]"
      }
      
    }
    return this.httpService.post('canales', this.calculateQuotaUri, {
      transaction: transactions,
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

  getQuotasPreviousMovement(transaction: number[], productId: number): Observable<{purchaseAmount: string, listQuota: PaymentQuota[]}> {
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

  saveNewQuotaPreviousConsumptions( quota = 1, transaction: number[]): Observable<{title: string, message: string, type: string, status: 'success' | 'error'}> {
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
