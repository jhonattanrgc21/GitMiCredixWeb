import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable, Subject} from 'rxjs';
import {FavoriteIbanAccount} from '../../../../shared/models/favorite-iban-account';
import {PublicServiceFavoriteByUser} from '../../../../shared/models/public-service-favorite-by-user';
import {SchedulePayments} from '../../../../shared/models/schedule-payments';

@Injectable()
export class FavoritesManagementService {

  // tslint:disable-next-line:variable-name max-line-length
  private _favoritesPublicService: PublicServiceFavoriteByUser;
  // tslint:disable-next-line:variable-name
  private __update = new Subject();

  // tslint:disable-next-line:variable-name
  private _ibanAccountData: FavoriteIbanAccount;

  // tslint:disable-next-line:variable-name

  set ibanAccountData(data: FavoriteIbanAccount) {
    this._ibanAccountData = data;
  }
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

  // tslint:disable-next-line:variable-name
  private _schedulePayments: SchedulePayments;

  get schedulePayments(): SchedulePayments {
    return this._schedulePayments;
  }

  get ibanAccount(): FavoriteIbanAccount {
    return this._ibanAccountData;
  }

  get publicServices(): PublicServiceFavoriteByUser {
    return this._favoritesPublicService;
  }

  set publicServicesData(data: PublicServiceFavoriteByUser) {
    this._favoritesPublicService = data;
  }

  set schedulePaymentsData(data: SchedulePayments) {
    this._schedulePayments = data;
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
