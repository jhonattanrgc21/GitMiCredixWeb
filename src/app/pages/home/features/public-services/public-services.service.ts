import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../../core/services/http.service';
import {Observable} from 'rxjs';
import {PendingReceipts} from '../../../../shared/models/pending-receipts';
import {StorageService} from '../../../../core/services/storage.service';
import {PublicServiceFavoriteByUser} from '../../../../shared/models/public-service-favorite-by-user';
import {Cacheable} from 'ngx-cacheable';
import {SchedulePayments} from '../../../../shared/models/schedule-payments';
import {PublicService} from '../../../../shared/models/public-service';

const iconPerCategory = [
  {category: 'Recargas', icon: 'cellphone'},
  {category: 'Telefonía', icon: 'phone'},
  {category: 'Electricidad', icon: 'public_services'},
  {category: 'Agua', icon: 'water'},
  {category: 'Internet y Cable', icon: 'internet_cable'},
  {category: 'Municipalidades', icon: 'municipalidad'},
  {category: 'Mantenimiento', icon: 'municipalidad'},
  {category: 'Educación', icon: 'municipalidad'},
];

@Injectable()
export class PublicServicesService {
  private readonly getPendingReceiptsUri = 'publicservicebncr/pendingreceipts';
  private readonly payPublicServiceUri = 'publicservicebncr/servicepayment';
  private readonly getMinAmountsUri = 'channels/publicservice/recharge/rechargeamountlist';
  public readonly getSchedulerPaymentsUserUri = 'schedulerpayment/getscheduledpays';
  private readonly getPublicServiceFavoriteByUserUri = 'publicservice/findallpublicservicefavoritebyuser';
// tslint:disable-next-line:variable-name
  _publicService: PublicService;

  get publicService(): PublicService {
    return this._publicService;
  }

  set publicService(publicService: PublicService) {
    this._publicService = publicService;
  }

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  @Cacheable()
  getPublicServicesFavoritesByUser(): Observable<PublicServiceFavoriteByUser[]> {
    return this.httpService.post('canales', this.getPublicServiceFavoriteByUserUri,
      {
        userId: this.storageService.getCurrentUser().userId,
      }).pipe(
      map((response) => {
        if (response.type === 'success') {
          (response.publicServiceFavoriteList as PublicServiceFavoriteByUser[]).forEach(category => {
            category.icon = iconPerCategory.find(icon => icon.category === category.publicServiceCategory)?.icon;
          });
          return response.publicServiceFavoriteList;
        } else {
          return [];
        }
      })
    );
  }

  @Cacheable()
  getAllSchedulersPayment(): Observable<SchedulePayments[]> {
    return this.httpService.post('canales', this.getSchedulerPaymentsUserUri, {channelId: 102})
      .pipe(
        map((response) => {
          if (response.scheduledPayList?.length > 0 && response.message === 'Operación exitosa') {
            (response.scheduledPayList as SchedulePayments[]).forEach(category => {
              category.icon = iconPerCategory.find(icon => icon.category === category.publicServiceCategoryName)?.icon;
            });
            return response.scheduledPayList;
          } else {
            return [];
          }
        })
      );
  }

  checkPendingReceipts(publicServiceId: number, accessKey: number, keyType?: number): Observable<PendingReceipts> {
    return this.httpService.post('incomex', this.getPendingReceiptsUri, {publicServiceId, accessKey, keyType})
      .pipe(
        map((response) => {
          return response.type && response.type === 'error' ? null : response;
        }));
  }

  payPublicService(publicServiceId: number, serviceValue: number, amount: string, term: number, keyType: number,
                   expirationDate: string, billNumber: string | number, codeCredix?: string): Observable<any> {
    return this.httpService.post('incomex', this.payPublicServiceUri, {
      cardId: this.storageService.getCurrentCards().find(element => element.category === 'Principal').cardId.toString(),
      currencyId: '188',
      publicServiceId,
      serviceValue,
      amount,
      term,
      keyType,
      expirationDate,
      billNumber,
      codeCredix
    });
  }

  savePublicServiceFavorite(publicServiceId: number, serviceReference: string, aliasName: string, codeCredix: number):
    Observable<{ type: 'success' | 'error', status?: number, message: string, title: string }> {
    return this.httpService.post('canales', 'publicservice/savepublicservicefavorite', {
      accountId: this.storageService.getCurrentUser().actId,
      publicServiceId,
      serviceReference,
      paymentDay: 21,
      userId: this.storageService.getCurrentUser().userId,
      aliasName,
      publicServiceAccessKeyId: 1,
      codeCredix
    }).pipe(
      map(response => {
        return {type: response.type, title: response.titleOne, message: response.descriptionOne, status: response.status};
      }));
  }

  getMinAmounts() {
    return this.httpService.post('incomex', this.getMinAmountsUri).pipe(map(response => {
      if (response.type === 'success') {
        return response.rechargeAmountList;
      } else {
        return [];
      }
    }));
  }

}
