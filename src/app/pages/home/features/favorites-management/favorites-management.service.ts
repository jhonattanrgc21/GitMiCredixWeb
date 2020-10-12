import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable, Subject} from 'rxjs';
import {FavoriteIbanAccount} from '../../../../shared/models/favorite-iban-account';
import {PublicServiceFavoriteByUser} from '../../../../shared/models/public-service-favorite-by-user';
import {SchedulePayments} from '../../../../shared/models/schedule-payments';

@Injectable()
export class FavoritesManagementService {
  private readonly deleteIbanAccountUri = 'iban/deletePublicServiceFavorite';
  private readonly deleteFavoritePublicServiceUri = 'publicservice/deletepublicservicefavorite';
  private readonly deleteSchedulePaymentUri = 'schedulerpayment/deleteschedulerpayment';

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

  get schedulePayments(): Observable<SchedulePayments> {
    return this._schedulePayments.asObservable();
  }

  get ibanAccount(): Observable<FavoriteIbanAccount> {
    return this._ibanAccountData.asObservable();
  }

  get publicServices(): Observable<PublicServiceFavoriteByUser> {
    return this._favoritesPublicService.asObservable();
  }

  // tslint:disable-next-line:max-line-length
  get valuesFromFavorites(): {
    publicServiceCategoryId: number;
    publicServiceEnterpriseId: number;
    publicServiceId: number;
    favoriteName: string;
    phoneNumber: number;
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

  updating() {
    this.__update.next();
  }

  emitUpdateSuccessAlert() {
    this.__updateSuccess.next();
  }

  setDeleteIbanAccount(ibanId: number) {
    return this.httpService.post('canales', this.deleteIbanAccountUri, {
      IdAccountFavorite: ibanId
    });
  }

  setDeletePublicService(publicId: number) {
    return this.httpService.post('canales', this.deleteFavoritePublicServiceUri, {
      publicServiceFavoriteId: publicId,
      userId: this.storageService.getCurrentUser().userId
    });
  }

  setDeleteAutomatics(schedulerPayId: number) {
    return this.httpService.post('canales', this.deleteSchedulePaymentUri, {
      schedulerPayId
    });
  }
}
