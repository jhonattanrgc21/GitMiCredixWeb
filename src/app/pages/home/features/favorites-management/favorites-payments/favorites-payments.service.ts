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
  private __createDelete: Subject<{ added: boolean; del: boolean; }> = new Subject<{ added: boolean; del: boolean; }>();

  get isAddedOrDelete(): Observable<{ added: boolean; del: boolean; }> {
    return this.__createDelete.asObservable();
  }

  emitFavoritesIsAddedOrDelete(added: boolean, del: boolean) {
    this.__createDelete.next({added, del});
  }


  getPublicCategoryServices() {
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

  getPublicEnterpriseServicesByCategory(categoryId: number) {
    return this.httpService.post('canales', 'publicservice/publicserviceenterpriselistbycategory', {
      publicServiceCategoryId: categoryId,
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

  getPublicServicesByEnterprise(eId: number) {
    return this.httpService.post('canales', 'publicservice/publicservicelistbyenterpriseid', {
      channelId: 102,
      enterpriseId: eId
    }).pipe(
      map((response) => {
        if (response.type === 'success' && response.message === 'Operación exitosa') {
          return response.publicServiceList;
        } else {
          return [];
        }
      })
    );
  }


  // @ts-ignore
  // tslint:disable-next-line:max-line-length
  setPublicServiceFavorite(publicServiceId: number, serviceReference: string, aliasName: string, credixCode: number) {
    return this.httpService.post('canales', 'publicservice/savepublicservicefavorite', {
      accountId: this.storageService.getCurrentUser().actId,
      publicServiceId,
      serviceReference,
      paymentDay: 21,
      userId: this.storageService.getCurrentUser().userId,
      channelId: 102,
      aliasName,
      publicServiceAccessKeyId: 1,
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

  setUpdatePublicService(publicServiceFavoriteId: number, name: string) {
    return this.httpService.post('canales', 'publicservice/updatenamepublicservicefavorite', {
      publicServiceFavoriteId,
      name,
      channelId: 102,
      userId: this.storageService.getCurrentUser().userId
    });
  }
}
