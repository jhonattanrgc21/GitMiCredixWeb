import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class FavoritesManagementService {

  // tslint:disable-next-line:variable-name
  private __tabId: Subject<{ id: number }> = new Subject<{ id: number }>();

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  get tabId(): Observable<{ id: number }> {
    return this.__tabId.asObservable();
  }

  emitTabId(id: number) {
    this.__tabId.next({id});
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
    return this.httpService.post('canales', 'publicservice/findallpublicservicefavoritebyuser',
      {channelId: 102, userId: this.storageService.getCurrentUser().userId})
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
}
