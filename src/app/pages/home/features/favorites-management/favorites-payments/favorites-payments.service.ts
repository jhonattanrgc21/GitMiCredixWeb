import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {CacheBuster} from 'ngx-cacheable';
import {cleanFavoritesPublicService$} from '../../../../../core/services/public-services-api.service';

@Injectable()
export class FavoritesPaymentsService {

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  @CacheBuster({
    cacheBusterNotifier: cleanFavoritesPublicService$
  })
  setPublicServiceFavorite(publicServiceId: number, serviceReference: string, aliasName: string, credixCode: number) {
    return this.httpService.post('canales', 'publicservice/savepublicservicefavorite', {
      accountId: this.storageService.getCurrentUser().actId,
      publicServiceId,
      serviceReference,
      paymentDay: 21,
      userId: this.storageService.getCurrentUser().userId,
      aliasName,
      publicServiceAccessKeyId: 1,
      codeCredix: credixCode
    });
  }

  @CacheBuster({
    cacheBusterNotifier: cleanFavoritesPublicService$
  })
  setUpdatePublicService(publicServiceFavoriteId: number, name: string) {
    return this.httpService.post('canales', 'publicservice/updatenamepublicservicefavorite', {
      publicServiceFavoriteId,
      name,
      userId: this.storageService.getCurrentUser().userId
    });
  }
}
