import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IbanAccountsService {

  // tslint:disable-next-line:variable-name
  private __createDelete: Subject<{ added: boolean; del: boolean; }> = new Subject<{ added: boolean; del: boolean; }>();

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  get isAddedOrDelete(): Observable<{ added: boolean; del: boolean; }> {
    return this.__createDelete.asObservable();
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

  setDeleteIbanAccount(ibanId: number) {
    return this.httpService.post('canales', 'iban/deletePublicServiceFavorite', {
      channelId: 102,
      IdAccountFavorite: ibanId
    });
  }

  updateIbanAccount(ibanId: number, alias: string) {
    return this.httpService.post('canales', 'iban/updateNamePublicServiceFavorite', {
      channelId: 102,
      IdAccountFavorite: ibanId,
      name: alias
    });
  }

  emitIbanIsAddOrDeleted(added: boolean, del: boolean) {
    this.__createDelete.next({added, del});
  }
}
