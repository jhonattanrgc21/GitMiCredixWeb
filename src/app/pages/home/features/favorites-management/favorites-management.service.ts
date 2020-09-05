import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class FavoritesManagementService {

  // tslint:disable-next-line:variable-name max-line-length
  private __favoritesPaymentsData: Subject<{ publicServiceFavoriteName: string, accountNumber: number, publicServiceName: string, publicServiceProvider: string, publicServiceAccessKeyDescription: string }> = new Subject<{ publicServiceFavoriteName: string; accountNumber: number; publicServiceName: string; publicServiceProvider: string; publicServiceAccessKeyDescription: string }>();
  // tslint:disable-next-line:variable-name max-line-length
  private __ibanAccountData: Subject<{ aliasName: string, ibanAccount: string, IdAccountFavorite: number }> = new Subject<{ aliasName: string; ibanAccount: string; IdAccountFavorite: number }>();

  // tslint:disable-next-line:variable-name max-line-length
  private __automaticsPaymentData: Subject<{ publicServiceDescription: string, alias: string, id: number, maxAmount: number, periodicityDescription: string, startDate: string }> = new Subject<{ publicServiceDescription: string; alias: string; id: number; maxAmount: number; periodicityDescription: string; startDate: string; }>();

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  // tslint:disable-next-line:max-line-length
  get favoritesPaymentsData(): Observable<{ publicServiceFavoriteName: string, accountNumber: number, publicServiceName: string, publicServiceProvider: string, publicServiceAccessKeyDescription: string }> {
    return this.__favoritesPaymentsData.asObservable();
  }

  get ibanAccountData(): Observable<{ aliasName: string, ibanAccount: string, IdAccountFavorite: number }> {
    return this.__ibanAccountData.asObservable();
  }

  // tslint:disable-next-line:max-line-length
  get automaticsPaymentData(): Observable<{ publicServiceDescription: string, alias: string, id: number, maxAmount: number, periodicityDescription: string, startDate: string }> {
    return this.__automaticsPaymentData.asObservable();
  }

  // tslint:disable-next-line:max-line-length
  emitFavoritesPaymentsData(publicServiceFavoriteName: string, accountNumber: number, publicServiceName: string, publicServiceProvider: string, publicServiceAccessKeyDescription: string) {
    // tslint:disable-next-line:max-line-length
    this.__favoritesPaymentsData.next({
      publicServiceFavoriteName,
      accountNumber,
      publicServiceName,
      publicServiceProvider,
      publicServiceAccessKeyDescription
    });
  }

  emitIbanAccountData(aliasName: string, ibanAccount: string, IdAccountFavorite: number) {
    this.__ibanAccountData.next({aliasName, ibanAccount, IdAccountFavorite});
  }

  // tslint:disable-next-line:max-line-length
  emitAutomaticsPaymentData(publicServiceDescription: string, alias: string, id: number, maxAmount: number, periodicityDescription: string, startDate: string) {
    this.__automaticsPaymentData.next({publicServiceDescription, alias, id, maxAmount, periodicityDescription, startDate});
  }


  getAllAccountIbanFavoriteByUser() {
    return this.httpService.post('canales', 'iban/findAllAccountiBANFavoritebyUserId', {channelId: 102})
      .pipe(
        map((response) => {
          if (response.type === 'success' && response.message === 'Operación exitosa') {
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
          if (response.publicServiceFavoriteList.length > 0 && response.message === 'Operación exitosa') {
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
          if (response.scheduledPayList.length > 0 && response.message === 'Operación exitosa') {
            return response.scheduledPayList;
          } else {
            return [];
          }
        })
      );
  }
}
