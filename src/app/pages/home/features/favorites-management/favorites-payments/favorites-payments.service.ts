import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../../core/services/storage.service';

@Injectable()
export class FavoritesPaymentsService {

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
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

  setUpdatePublicService(publicServiceFavoriteId: number, name: string) {
    return this.httpService.post('canales', 'publicservice/updatenamepublicservicefavorite', {
      publicServiceFavoriteId,
      name,
      channelId: 102,
      userId: this.storageService.getCurrentUser().userId
    });
  }
}
