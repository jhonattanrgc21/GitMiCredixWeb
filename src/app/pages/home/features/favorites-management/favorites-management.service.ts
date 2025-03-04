import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable, Subject} from 'rxjs';
import {FavoriteIbanAccount} from '../../../../shared/models/favorite-iban-account';
import {PublicServiceFavoriteByUser} from '../../../../shared/models/public-service-favorite-by-user';
import {SchedulePayments} from '../../../../shared/models/schedule-payments';
import {CacheBuster} from 'ngx-cacheable';
import {cleanIbanFavoriteAccount$} from '../../../../core/services/account-api.service';
import {cleanFavoritesPublicService$} from '../../../../core/services/public-services-api.service';
import {cleanSchedulePayments$} from '../../../../core/services/channels-api.service';
import { map } from 'rxjs/operators';
import { PaymentQuota } from 'src/app/shared/models/payment-quota';

@Injectable()
export class FavoritesManagementService {
  private readonly deleteIbanAccountUri = 'iban/deletePublicServiceFavorite';
  private readonly deleteFavoritePublicServiceUri = 'publicservice/deletepublicservicefavorite';
  private readonly deleteSchedulePaymentUri = 'schedulerpayment/deleteschedulerpayment';
  private readonly getQuotaCalculatorUri = 'general/quotacalculator'; 	
  private readonly getAmountRechargeUri = 'publicservicebncr/amountsrecharge';

  // tslint:disable-next-line:variable-name max-line-length
  private _favoritesPublicService: Subject<PublicServiceFavoriteByUser> = new Subject<PublicServiceFavoriteByUser>();

  // tslint:disable-next-line:variable-name
  private _ibanAccountData: Subject<FavoriteIbanAccount> = new Subject<FavoriteIbanAccount>();
  // tslint:disable-next-line:variable-name
  private _schedulePayments: Subject<SchedulePayments> = new Subject<SchedulePayments>();

  // tslint:disable-next-line:variable-name
  private __update = new Subject();
  // tslint:disable-next-line:variable-name
  private __updateSuccess = new Subject();
  // tslint:disable-next-line:variable-name
  private __confirmUpdate: Subject<{ confirm: boolean }> = new Subject<{ confirm: boolean }>();
  // tslint:disable-next-line:variable-name
  private _redirectToAutomatics: boolean;

  // tslint:disable-next-line:variable-name
  private _isTabChanged = new Subject();
  // tslint:disable-next-line:variable-name
  private _deleted: Subject<{
    iban?: boolean;
    publicServices?: boolean;
    automatics?: boolean;
  }> = new Subject<{
    iban?: boolean;
    publicServices?: boolean;
    automatics?: boolean;
  }>();

  // tslint:disable-next-line:variable-name max-line-length
  private _valuesFromFavorites: {
    publicServiceCategoryId: number;
    publicServiceEnterpriseId: number;
    publicServiceId: number;
    keyType: number;
    favoriteName: string;
    contractControl: string;
  };

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  get schedulePayments(): Observable<SchedulePayments> {
    return this._schedulePayments.asObservable();
  }

  get ibanAccount(): Observable<FavoriteIbanAccount> {
    return this._ibanAccountData.asObservable();
  }

  get publicServices(): Observable<PublicServiceFavoriteByUser> {
    return this._favoritesPublicService.asObservable();
  }

  // tslint:disable-next-line:variable-name
  _result: { status: 'success' | 'error'; message: string; title: string };
  get result(): { status: 'success' | 'error'; message: string; title: string } {
    return this._result;
  }

  set result(result: { status: 'success' | 'error'; message: string; title: string }) {
    this._result = result;
  }
  
  // tslint:disable-next-line:max-line-length
  get valuesFromFavorites(): {
    publicServiceCategoryId: number;
    publicServiceEnterpriseId: number;
    publicServiceId: number;
    keyType: number;
    favoriteName: string;
    contractControl: string;
  } {
    return this._valuesFromFavorites;
  }

  set redirecting(confirm: boolean) {
    this._redirectToAutomatics = confirm;
  }

  get redirect(): boolean {
    return this._redirectToAutomatics;
  }

  set valuesToFavorites(data: {
    publicServiceCategoryId: number;
    publicServiceEnterpriseId: number;
    publicServiceId: number;
    keyType: number;
    favoriteName: string;
    contractControl: string;
  }) {
    this._valuesFromFavorites = data;
  }

  get confirmUpdate(): Observable<{ confirm: boolean }> {
    return this.__confirmUpdate.asObservable();
  }

  get update(): Observable<any> {
    return this.__update.asObservable();
  }

  get updateSuccess(): Observable<any> {
    return this.__updateSuccess.asObservable();
  }

  get deleted(): Observable<{
    iban?: boolean;
    publicServices?: boolean;
    automatics?: boolean;
  }> {
    return this._deleted.asObservable();
  }

  get tabChanged(): Observable<any> {
    return this._isTabChanged.asObservable();
  }

  emitIsTabChange() {
    this._isTabChanged.next();
  }

  // Emit Methods of favorites
  emitIbanAccountData(favoriteIban: FavoriteIbanAccount) {
    this._ibanAccountData.next(favoriteIban);
  }

  emitFavoritePublicServiceData(publicService: PublicServiceFavoriteByUser) {
    this._favoritesPublicService.next(publicService);
  }

  emitSchedulePaymentData(schedule: SchedulePayments) {
    this._schedulePayments.next(schedule);
  }

  emitConfirmUpdate(confirm: boolean) {
    this.__confirmUpdate.next({confirm});
  }

  updating(value = false) {
    this.__update.next(value);
  }

  emitUpdateSuccessAlert() {
    this.__updateSuccess.next();
  }

  emitDeletedSuccess(iban?: boolean, publicServices?: boolean, automatics?: boolean) {
    this._deleted.next({iban, publicServices, automatics});
  }

  @CacheBuster({
    cacheBusterNotifier: cleanIbanFavoriteAccount$
  })
  setDeleteIbanAccount(ibanId: number) {
    return this.httpService.post('canales', this.deleteIbanAccountUri, {
      IdAccountFavorite: ibanId
    });
  }

  @CacheBuster({
    cacheBusterNotifier: cleanFavoritesPublicService$
  })
  setDeletePublicService(publicId: number) {
    return this.httpService.post('canales', this.deleteFavoritePublicServiceUri, {
      publicServiceFavoriteId: publicId,
      userId: this.storageService.getCurrentUser().userId
    });
  }

  @CacheBuster({
    cacheBusterNotifier: cleanSchedulePayments$
  })
  setDeleteAutomatics(schedulerPayId: number) {
    return this.httpService.post('canales', this.deleteSchedulePaymentUri, {
      schedulerPayId
    });
  }

  getCuotaCalculator(amount: string): Observable<PaymentQuota[]>{
    return this.httpService.post('incomex', this.getQuotaCalculatorUri, {
      transaction : '1',
      amount,
      productId : 5
    }).pipe(
        map(response => {
          if ( response ) {
            return response.listQuota;
          }
        })
      );
  }

  getAmountRecharge(): Observable<any> {
    return this.httpService.post('incomex', this.getAmountRechargeUri, {
    }).pipe(
      map(response => {
        if ( response.type === 'success' ) {
          return response.amounts;
        } else {
          return [];
        }
      })
    );
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
