import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class FavoritesManagementService {

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  // tslint:disable-next-line:variable-name max-line-length
  private __favoritesPaymentsData: Subject<{ publicServiceFavoriteName: string; accountNumber: number; publicServiceName: string; publicServiceProvider: string; publicServiceAccessKeyDescription: string, publicServiceId?: number, publicServiceFavoriteId: number, accountId: number, publicServiceAccessKeyId: number, publicServiceEnterpriseDescription: string }> = new Subject<{ publicServiceFavoriteName: string; accountNumber: number; publicServiceName: string; publicServiceProvider: string; publicServiceAccessKeyDescription: string; publicServiceId?: number; publicServiceFavoriteId: number; accountId: number; publicServiceAccessKeyId: number; publicServiceEnterpriseDescription: string }>();
  // tslint:disable-next-line:variable-name max-line-length
  private __deleteFavoritesPayments: Subject<{ del: boolean; }> = new Subject<{ del: boolean }>();
  // tslint:disable-next-line:variable-name max-line-length
  private __ibanAccountData: Subject<{ aliasName: string, ibanAccount: string, IdAccountFavorite: number, del?: boolean }> = new Subject<{ aliasName: string; ibanAccount: string; IdAccountFavorite: number; }>();
  // tslint:disable-next-line:variable-name max-line-length
  private __deleteIbanAccount: Subject<{ del: boolean; }> = new Subject<{ del: boolean }>();
  // tslint:disable-next-line:variable-name max-line-length
  private __automaticsPaymentData: Subject<{ publicServiceDescription: string, alias: string, id: number, maxAmount: number, periodicityDescription: string, startDate: string, key: number, del?: boolean }> = new Subject<{ publicServiceDescription: string; alias: string; id: number; maxAmount: number; periodicityDescription: string; startDate: string; key: number; }>();
  // tslint:disable-next-line:variable-name
  private __deleteAutomatics: Subject<{ del: boolean; }> = new Subject<{ del: boolean }>();
  // tslint:disable-next-line:variable-name
  private __update = new Subject();
  // tslint:disable-next-line:variable-name
  private __updateSuccess = new Subject();

  // tslint:disable-next-line:variable-name
  private __confirmUpdate: Subject<{ confirm: boolean }> = new Subject<{ confirm: boolean }>();

  get confirmUpdate(): Observable<{ confirm: boolean }> {
    return this.__confirmUpdate.asObservable();
  }

  get update(): Observable<any> {
    return this.__update.asObservable();
  }

  get updateSuccess(): Observable<any> {
    return this.__updateSuccess.asObservable();
  }

  emitConfirmUpdate(confirm: boolean) {
    this.__confirmUpdate.next({confirm});
  }

  updating() {
    this.__update.next();
  }

  emitUpdateSuccessAlert() {
    this.__updateSuccess.next();
  }

  // tslint:disable-next-line:max-line-length
  get favoritesPaymentsData(): Observable<{ publicServiceFavoriteName: string; accountNumber: number; publicServiceName: string; publicServiceProvider: string; publicServiceAccessKeyDescription: string; publicServiceId?: number; publicServiceFavoriteId: number; accountId: number; publicServiceAccessKeyId: number; publicServiceEnterpriseDescription: string; }> {
    return this.__favoritesPaymentsData.asObservable();
  }

  get deleteFavorites(): Observable<{ del: boolean }> {
    return this.__deleteFavoritesPayments.asObservable();
  }

  get ibanAccountData(): Observable<{ aliasName: string, ibanAccount: string, IdAccountFavorite: number, del?: boolean }> {
    return this.__ibanAccountData.asObservable();
  }

  get deleteIbanAccount(): Observable<{ del: boolean }> {
    return this.__deleteIbanAccount.asObservable();
  }

  // tslint:disable-next-line:max-line-length
  get automaticsPaymentData(): Observable<{ publicServiceDescription: string, alias: string, id: number, maxAmount: number, periodicityDescription: string, startDate: string, key: number, del?: boolean }> {
    return this.__automaticsPaymentData.asObservable();
  }

  get deleteAutomatics(): Observable<{ del: boolean }> {
    return this.__deleteAutomatics.asObservable();
  }

  // tslint:disable-next-line:max-line-length
  emitFavoritesPaymentsData(publicServiceFavoriteName: string, accountNumber: number, publicServiceName: string, publicServiceProvider: string, publicServiceAccessKeyDescription: string, publicServiceId?: number, publicServiceFavoriteId?: number, accountId?: number, publicServiceAccessKeyId?: number, publicServiceEnterpriseDescription?: string) {
    // tslint:disable-next-line:max-line-length
    // @ts-ignore
    this.__favoritesPaymentsData.next({
      publicServiceFavoriteName,
      accountNumber,
      publicServiceName,
      publicServiceProvider,
      publicServiceAccessKeyDescription,
      publicServiceId,
      accountId,
      publicServiceAccessKeyId,
      publicServiceFavoriteId,
      publicServiceEnterpriseDescription
    });
  }

  emitDeleteFavorites(del: boolean) {
    this.__deleteFavoritesPayments.next({del});
  }

  emitIbanAccountData(aliasName: string, ibanAccount: string, IdAccountFavorite: number) {
    this.__ibanAccountData.next({aliasName, ibanAccount, IdAccountFavorite});
  }

  emitDeleteIbanAccount(del: boolean) {
    this.__deleteIbanAccount.next({del});
  }

  // tslint:disable-next-line:max-line-length
  emitAutomaticsPaymentData(publicServiceDescription: string, alias: string, id: number, maxAmount: number, periodicityDescription: string, startDate: string, key: number) {
    this.__automaticsPaymentData.next({publicServiceDescription, alias, id, maxAmount, periodicityDescription, startDate, key});
  }

  emitDeleteAutomatics(del: boolean) {
    this.__deleteAutomatics.next({del});
  }

  getAllAccountIbanFavoriteByUser() {
    return this.httpService.post('canales', 'iban/findAllAccountiBANFavoritebyUserId', {channelId: 102})
      .pipe(
        map((response) => {
          if (response.AccountIbanFavoriteList?.length > 0 && response.message === 'Operación exitosa') {
            return response.AccountIbanFavoriteList;
          } else {
            return [];
          }
        })
      );
  }

  getAllFavoritePublicServiceByUser() {
    // tslint:disable-next-line:max-line-length
    return this.httpService.post('canales', 'publicservice/findallpublicservicefavoritebyuser', {
      channelId: 102,
      userId: this.storageService.getCurrentUser().userId
    })
      .pipe(
        map((response) => {
          if (response.publicServiceFavoriteList?.length > 0 && response.message === 'Operación exitosa') {
            return response.publicServiceFavoriteList;
          } else {
            return [];
          }
        })
      );
  }

  getAllSchedulersPayment() {
    return this.httpService.post('canales', 'schedulerpayment/getscheduledpays', {channelId: 102})
      .pipe(
        map((response) => {
          if (response.scheduledPayList?.length > 0 && response.message === 'Operación exitosa') {
            return response.scheduledPayList;
          } else {
            return [];
          }
        })
      );
  }
}
