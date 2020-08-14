import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';

@Injectable()
export class SendMoneyService {
  getFavoritesAccountsUri = 'iban/findAllAccountiBANFavoritebyUserId';
  getQuotaByProductUri = 'customerservice/listquotabyproduct';


  constructor(private httpService: HttpService) {
  }

  getFavoritesAccounts() {
    return this.httpService.post('canales', this.getFavoritesAccountsUri).pipe(
      map((response) => {
        if (response.type === 'success' && response.AccountIbanFavoriteList) {
          return response.AccountIbanFavoriteList;
        } else {
          return [];
        }
      })
    );
  }

  getQuotaByProduct() {
    return this.httpService
      .post('canales', this.getQuotaByProductUri, {
        channelId: 102,
        productId: 3,
      })
      .pipe(
        map((response) => {
          if (response.type === 'success' && response.listQuota) {
            return response.listQuota;
          } else {
            return [];
          }
        })
      );
  }

  addFavAccount(name, account, identType, ident, code){
    return this.httpService.post('canales', 'iban/saveFavoriteAccountIBAN', {
      aliasName : name,
      ibanAccount : account,
      typeIdentificacionId : identType,
      identification : ident,
      codeCredix : code,
      channelId : 102
    })
    .pipe(
      map((response) => {
        if (response.type === 'success' && response.listQuota) {
          return response.listQuota;
        } else {
          return [];
        }
      })
    );
  }

}
