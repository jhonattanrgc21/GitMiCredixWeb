import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {map} from 'rxjs/operators';

@Injectable()
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

  setIbanFavoriteAccount(aliasName: string, ibanAccount: string, typeIdentificacionId: number, identification: string, codeCredix: string) {
    return this.httpService.post('canales', 'iban/saveFavoriteAccountIBAN',
      {aliasName, ibanAccount, typeIdentificacionId, identification, codeCredix});
  }

  updateIbanAccount(IdAccountFavorite: number, name: string) {
    return this.httpService.post('canales', 'iban/updateNamePublicServiceFavorite', {
      channelId: 102,
      IdAccountFavorite,
      name
    });
  }
}
