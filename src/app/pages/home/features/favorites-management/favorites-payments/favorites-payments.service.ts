import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../../core/services/storage.service';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesPaymentsService {

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  // tslint:disable-next-line:variable-name
  private __IsAdded: Subject<{ added: boolean }> = new Subject<{ added: boolean }>();

  get isAdded(): Observable<{ added: boolean }> {
    return this.__IsAdded.asObservable();
  }

  emitFavoritesIsAdded(added: boolean) {
    this.__IsAdded.next({added});
  }

  getPublicServices() {
    return this.httpService.post('canales', 'publicservice/publicservicecategory')
      .pipe(
        map((response) => {
          if (response.type === 'success' && response.message === 'Operación exitosa') {
            return response.publicServiceCategoryList;
          } else {
            return [];
          }
        })
      );
  }

  getPublicEnterpriseServices(publicServiceId: number) {
    return this.httpService.post('canales', 'publicservice/publicserviceenterpriselistbycategory', {
      publicServiceCategoryId: publicServiceId,
      channelId: 102
    }).pipe(
      map((response) => {
        if (response.type === 'success' && response.message === 'Operación exitosa') {
          return response.publicServiceEnterpriseList;
        } else {
          return [];
        }
      })
    );
  }

  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  setPublicServiceFavorite(publicId: number, servReference: string, payDay: number, alias: string, publicSrvcAccssKId: number, credixCode: number) {
    return this.httpService.post('canales', 'publicservice/savepublicservicefavorite', {
      accountId: this.storageService.getCurrentUser().actId,
      publicServiceId: publicId,
      serviceReference: servReference,
      paymentDay: payDay,
      userId: this.storageService.getCurrentUser().userId,
      channelId: 102,
      aliasName: alias,
      publicServiceAccessKeyId: publicSrvcAccssKId,
      codeCredix: credixCode
    });
  }

  setDeletePublicService(publicId: number) {
    return this.httpService.post('canales', 'publicservice/deletepublicservicefavorite', {
      publicServiceFavoriteId: publicId,
      channelId: 102,
      userId: this.storageService.getCurrentUser().userId
    });
  }
}
