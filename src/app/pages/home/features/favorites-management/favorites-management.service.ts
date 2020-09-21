import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class FavoritesManagementService {

  // tslint:disable-next-line:variable-name max-line-length
  private __favoritesPaymentsData: Subject<{
    publicServiceFavoriteName: string;
    accountNumber: number;
    publicServiceName: string;
    publicServiceProvider: string;
    publicServiceAccessKeyDescription: string,
    publicServiceId?: number,
    publicServiceFavoriteId: number,
    accountId: number,
    publicServiceAccessKeyId: number,
    publicServiceEnterpriseDescription: string
  }> = new Subject<{ publicServiceFavoriteName: string; accountNumber: number; publicServiceName: string; publicServiceProvider: string; publicServiceAccessKeyDescription: string; publicServiceId?: number; publicServiceFavoriteId: number; accountId: number; publicServiceAccessKeyId: number; publicServiceEnterpriseDescription: string }>();
  // tslint:disable-next-line:variable-name max-line-length
  private __ibanAccountData: Subject<{ aliasName: string, ibanAccount: string, IdAccountFavorite: number, del?: boolean }> = new Subject<{ aliasName: string; ibanAccount: string; IdAccountFavorite: number; }>();

  // tslint:disable-next-line:variable-name
  private __automaticsPaymentData: Subject<{
    publicServiceDescription: string,
    alias: string;
    id: number;
    maxAmount: number;
    periodicityDescription: string;
    startDate: string;
    key: number;
  }> = new Subject<{
    publicServiceDescription: string;
    alias: string;
    id: number;
    maxAmount: number;
    periodicityDescription: string;
    startDate: string;
    key: number
  }>(); // tslint:disable-next-line:variable-name
  private __update = new Subject();
  // tslint:disable-next-line:variable-name
  private __updateSuccess = new Subject();
  // tslint:disable-next-line:variable-name
  private __confirmUpdate: Subject<{ confirm: boolean }> = new Subject<{ confirm: boolean }>();
  // tslint:disable-next-line:variable-name
  private _redirectToAutomatics: boolean;

  // tslint:disable-next-line:variable-name max-line-length
  private _valuesFromFavorites: {
    publicServiceCategoryId: number;
    publicServiceEnterpriseId: number;
    publicServiceId: number;
    favoriteName: string;
    phoneNumber: number;
  };

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  // tslint:disable-next-line:max-line-length
  get valuesFromFavorites(): { publicServiceCategoryId: number; publicServiceEnterpriseId: number; publicServiceId: number; favoriteName: string; phoneNumber: number; } {
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
    favoriteName: string; phoneNumber: number;
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

  // tslint:disable-next-line:max-line-length
  get favoritesPaymentsData(): Observable<{ publicServiceFavoriteName: string; accountNumber: number; publicServiceName: string; publicServiceProvider: string; publicServiceAccessKeyDescription: string; publicServiceId?: number; publicServiceFavoriteId: number; accountId: number; publicServiceAccessKeyId: number; publicServiceEnterpriseDescription: string; }> {
    return this.__favoritesPaymentsData.asObservable();
  }

  get ibanAccountData(): Observable<{ aliasName: string, ibanAccount: string, IdAccountFavorite: number, del?: boolean }> {
    return this.__ibanAccountData.asObservable();
  }


  // tslint:disable-next-line:max-line-length
  get automaticsPaymentData(): Observable<{ publicServiceDescription: string, alias: string, id: number, maxAmount: number, periodicityDescription: string, startDate: string, key: number, del?: boolean }> {
    return this.__automaticsPaymentData.asObservable();
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

  emitIbanAccountData(aliasName: string, ibanAccount: string, IdAccountFavorite: number) {
    this.__ibanAccountData.next({aliasName, ibanAccount, IdAccountFavorite});
  }

  // tslint:disable-next-line:max-line-length
  emitAutomaticsPaymentData(publicServiceDescription: string, alias: string, id: number, maxAmount: number, periodicityDescription: string, startDate: string, key: number) {
    this.__automaticsPaymentData.next({publicServiceDescription, alias, id, maxAmount, periodicityDescription, startDate, key});
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

  setDeleteIbanAccount(ibanId: number) {
    return this.httpService.post('canales', 'iban/deletePublicServiceFavorite', {
      channelId: 102,
      IdAccountFavorite: ibanId
    });
  }

  setDeletePublicService(publicId: number) {
    return this.httpService.post('canales', 'publicservice/deletepublicservicefavorite', {
      publicServiceFavoriteId: publicId,
      channelId: 102,
      userId: this.storageService.getCurrentUser().userId
    });
  }

  setDeleteAutomatics(schedulerPayId: number) {
    return this.httpService.post('canales', 'schedulerpayment/deleteschedulerpayment', {
      channelId: 102,
      schedulerPayId
    });
  }
}
