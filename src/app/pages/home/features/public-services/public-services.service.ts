import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../../core/services/http.service';
import {Observable, Subject} from 'rxjs';
import {PendingReceipts} from '../../../../shared/models/pending-receipts';
import {StorageService} from '../../../../core/services/storage.service';
import {PublicServiceFavoriteByUser} from '../../../../shared/models/public-service-favorite-by-user';
import {Cacheable} from 'ngx-cacheable';
import {SchedulePayments} from '../../../../shared/models/schedule-payments';
import {PublicService} from '../../../../shared/models/public-service';
import {ConvertStringAmountToNumber} from '../../../../shared/utils';
import {Voucher} from '../../../../shared/models/voucher';
import {cleanSchedulePayments$} from '../../../../core/services/channels-api.service';
import {Keys} from '../../../../shared/models/keys';
import {cleanFavoritesPublicService$} from '../../../../core/services/public-services-api.service';

const iconPerCategory = [
  {category: 'Recargas', icon: 'recargas'},
  {category: 'Telefonía', icon: 'telefonia'},
  {category: 'Electricidad', icon: 'electricidad'},
  {category: 'Agua', icon: 'agua'},
  {category: 'Internet y Cable', icon: 'tv_cable_satelite'},
  {category: 'Cable', icon: 'tv_cable_satelite'},
  {category: 'Internet', icon: 'internet'},
  {category: 'TV por cable y satélite', icon: 'tv_cable_satelite'},
  {category: 'Otros servicios', icon: 'otros_servicios'},
  {category: 'Venta por catálogo', icon: 'venta_catalogo'},
  {category: 'Seguridad Vial y CTP', icon: 'seguridad_vial_ctp'},
  {category: 'Seguros', icon: 'seguros'},
  {category: 'CCSS', icon: 'ccss'},
  {category: 'Colegios profesionales', icon: 'educacion'},
  {category: 'Cuotas', icon: 'cuotas'},
  {category: 'Ministerio de Salud', icon: 'ministerio_de_salud'},
  {category: 'Municipalidades', icon: 'municipalidades'},
  {category: 'Mantenimiento', icon: 'municipalidades'},
  {category: 'Educación', icon: 'educacion'},
  {category: 'Empresas de seguridad', icon: 'empresas_seguridad'}
];

@Injectable()
export class PublicServicesService {
  private readonly getPendingReceiptsUri = 'publicservicebncr/pendingreceipts';
  private readonly payPublicServiceUri = 'publicservicebncr/servicepayment';
  private readonly getMinAmountsUri = 'channels/publicservice/recharge/rechargeamountlist';
  public readonly getSchedulerPaymentsUserUri = 'schedulerpayment/getscheduledpays';
  private readonly getPublicServiceFavoriteByUserUri = 'publicservice/findallpublicservicefavoritebyuser';
  company: string;
  publicServiceIdByFavorite: number;
  phoneNumberByFavorite: string;
  keyTypeByFavorite: Keys[] = [];

  // tslint:disable-next-line:variable-name
  private _isTabChanged = new Subject();
// tslint:disable-next-line:variable-name
  _publicService: PublicService;
  get publicService(): PublicService {
    return this._publicService;
  }

  set publicService(publicService: PublicService) {
    this._publicService = publicService;
  }

  // tslint:disable-next-line:variable-name
  _voucher: Voucher;
  get voucher(): Voucher {
    return this._voucher;
  }

  set voucher(voucher: Voucher) {
    this._voucher = voucher;
  }

  // tslint:disable-next-line:variable-name
  _result: { status: 'success' | 'error'; message: string; title: string };
  get result(): { status: 'success' | 'error'; message: string; title: string } {
    return this._result;
  }

  set result(result: { status: 'success' | 'error'; message: string; title: string }) {
    this._result = result;
  }

  // tslint:disable-next-line:variable-name
  _payment: { currencySymbol: string; amount: string; contract: string, type: 'Recarga' | 'Servicio' };
  get payment(): { currencySymbol: string; amount: string; contract: string, type: 'Recarga' | 'Servicio' } {
    return this._payment;
  }

  set payment(payment: { currencySymbol: string; amount: string; contract: string, type: 'Recarga' | 'Servicio' }) {
    this._payment = payment;
  }

  // tslint:disable-next-line:variable-name
  _pendingReceipt: PendingReceipts;
  get pendingReceipt(): PendingReceipts {
    return this._pendingReceipt;
  }

  set pendingReceipt(pendingReceipt: PendingReceipts) {
    this._pendingReceipt = pendingReceipt;
  }

  get tabChanged(): Observable<any> {
    return this._isTabChanged.asObservable();
  }

  emitIsTabChange() {
    this._isTabChanged.next();
  }

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  @Cacheable({
    cacheBusterObserver: cleanFavoritesPublicService$.asObservable()
  })
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

  @Cacheable({
    cacheBusterObserver: cleanSchedulePayments$.asObservable()
  })
  getAllSchedulersPayment(): Observable<SchedulePayments[]> {
    return this.httpService.post('canales', this.getSchedulerPaymentsUserUri)
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

  checkPendingReceipts(publicServiceId: number, accessKey: number, keyType: number): Observable<PendingReceipts> {
    return this.httpService.post('incomex', this.getPendingReceiptsUri, {publicServiceId, accessKey, keyType})
      .pipe(
        map((response) => {
          if (response.type && response.type === 'error') {
            return null;
          } else {
            if (response.receipts && response.receipts.totalAmount) {
              response.receipts.totalAmount = ConvertStringAmountToNumber(response.receipts?.totalAmount).toString();
            }
            return response;
          }
        }));
  }

  payPublicService(clientName: string, publicServiceId: number, serviceValue: number, currencyCode: string, amount: string,
                   term: number, keyType: number, expirationDate: string, billNumber: string | number, credixCode?: string):
    Observable<any> {
    return this.httpService.post('incomex', this.payPublicServiceUri, {
      cardId: this.storageService.getCurrentCards().find(element => element.category === 'Principal').cardId.toString(),
      currencyId: currencyCode === 'COL' ? '188' : '840',
      amount: amount.split('.').length === 1 ? `${amount}.00` : amount,
      billNumber: +billNumber,
      clientName,
      publicServiceId,
      serviceValue,
      term,
      keyType,
      expirationDate,
      credixCode
    });
  }

  savePublicServiceFavorite(publicServiceId: number, serviceReference: string, aliasName: string, keyType: number, codeCredix: number):
    Observable<{ type: 'success' | 'error', status?: number, message: string, title: string }> {
    return this.httpService.post('canales', 'publicservice/savepublicservicefavorite', {
      accountId: this.storageService.getCurrentUser().actId,
      publicServiceId,
      serviceReference,
      paymentDay: 21,
      userId: this.storageService.getCurrentUser().userId,
      aliasName,
      publicServiceAccessKeyId: keyType,
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

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
