import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {map} from 'rxjs/operators';
import {CacheBuster} from 'ngx-cacheable';
import {cleanIbanFavoriteAccount$} from '../../../../../core/services/account-api.service';

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

  @CacheBuster({
    cacheBusterNotifier: cleanIbanFavoriteAccount$
  })
  setIbanFavoriteAccount(aliasName: string, ibanAccount: string, typeIdentificacionId: number, identification: string, codeCredix: string) {
    return this.httpService.post('canales', 'iban/saveFavoriteAccountIBAN',
      {aliasName, ibanAccount, typeIdentificacionId, identification, codeCredix});
  }

  @CacheBuster({
    cacheBusterNotifier: cleanIbanFavoriteAccount$
  })
  updateIbanAccount(IdAccountFavorite: number, name: string) {
    return this.httpService.post('canales', 'iban/updateNamePublicServiceFavorite', {
      channelId: 102,
      IdAccountFavorite,
      name
    });
  }
}
