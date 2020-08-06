import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';

@Injectable()
export class SendMoneyService {
  getFavoritesAccountsUri = 'iban/findAllAccountiBANFavoritebyUserId';

  constructor(private httpService: HttpService) {
  }

  getFavoritesAccounts() {
    return this.httpService.post('canales', this.getFavoritesAccountsUri)
      .pipe(map(response => {
        if (response.type === 'success' && response.AccountIbanFavoriteList) {
          return response.AccountIbanFavoriteList;
        } else {
          return [];
        }
      }));
  }
}
