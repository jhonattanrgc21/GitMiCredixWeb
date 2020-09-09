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
            return response.identificationTypes;
          } else {
            return [];
          }
        })
      );
  }

  setIbanFavoriteAccount(alias: string, account: string, typeId: number, id: string, credixCode: string) {
    return this.httpService.post('canales', 'iban/saveFavoriteAccountIBAN', {
      channelId: 102,
      aliasName: alias,
      ibanAccount: account,
      typeIdentificacionId: typeId,
      identification: id,
      codeCredix: credixCode
    });
  }

  setDeleteIbanAccount(ibanId: number) {
    return this.httpService.post('canales', 'iban/deletePublicServiceFavorite', {
      channelId: 102,
      IdAccountFavorite: ibanId
    });
  }
}
