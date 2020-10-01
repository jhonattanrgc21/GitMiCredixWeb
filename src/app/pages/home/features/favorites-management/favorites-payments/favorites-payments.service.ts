import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';

@Injectable()
export class FavoritesPaymentsService {

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
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
