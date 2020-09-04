import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IbanAccountsService {

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  getIdentificationTypes() {
    return this.httpService.post('canales', 'global/identification-types', {channelId: 102})
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response;
          } else {
            return [];
          }
        })
      );
  }

  getAllAccountIbanFavoriteByUser() {
    return this.httpService.post('canales', 'iban/findAllAccountiBANFavoritebyUserId', {channelId: 102})
      .pipe(
        map((response) => {
          if (response.type === 'success' && response.message === 'Operación exitosa') {
            return response.AccountIbanFavoriteList;
          } else if (response.type === 'success' && response.message === 'No existen datos.') {
            return response.message;
          } else {
            return [];
          }
        })
      );
  }
}
