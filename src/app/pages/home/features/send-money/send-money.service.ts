import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';

@Injectable()
export class SendMoneyService {
  getFavoritesAccountsUri = 'iban/findAllAccountiBANFavoritebyUserId';
  getQuotaByProductUri = 'customerservice/listquotabyproduct';
  getIbanAccountUri = 'account/getibanaccount';
  sendMoneyUri = 'channels/senddirect';


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

  getIbanAccount() {
    return this.httpService.post('canales', this.getIbanAccountUri, {channelId: 102});
  }

  addFavAccount(name, account, identType, ident, code) {
    return this.httpService.post('canales', 'iban/saveFavoriteAccountIBAN', {
      aliasName: name,
      ibanAccount: account,
      typeIdentificacionId: identType,
      identification: ident,
      codeCredix: code,
      channelId: 102
    });
  }

  sendMoney(ibanOrigin, crcId, creationDate, amountTransfer, ibanDestinity, typeDestinationId,
            nameDestination, period, commissionAmount, totalAmount, identification, credixCode) {
    return this.httpService
      .post('canales', this.sendMoneyUri, {
        channelId: 102,
        ibanOrigin,
        crcId,
        esbId: 50126,
        creationDate,
        amountTransfer,
        ibanDestinity,
        typeDestinationId,
        nameDestination,
        period,
        detail: 'Transacción pendiente.',
        commissionAmount,
        totalAmount,
        identification,
        trsId: 1,
        credixCode
      });
  }

}
