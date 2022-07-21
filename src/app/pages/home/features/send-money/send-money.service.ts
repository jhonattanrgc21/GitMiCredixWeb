import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class SendMoneyService {
  private readonly getFavoritesAccountsUri = 'iban/findAllAccountiBANFavoritebyUserId';
  private readonly sendMoneyUri = 'channels/senddirect';
  private readonly getAccountByIbanNumberUri = 'account/getinformationibanaccount';
  private readonly getSendMoneyLimit = 'channels/getvailabledolarlimitsendmoney';
  
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
            nameDestination, period, commissionAmount, totalAmount, identification, credixCode):
    Observable<{ type: 'success' | 'error', status?: number, message: string, title: string }> {
    return this.httpService
      .post('canales', this.sendMoneyUri, {
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
      }).pipe(
        map(response => {
          return {type: response.type, title: response.titleOne, message: response.descriptionOne, status: response.status};
        }));
  }

  getAccountByIbanNumber(identification, ibanAccount, currencyValidationTag) {
    return this.httpService.post('canales', this.getAccountByIbanNumberUri, {
      channelId: 102,
      identification,
      ibanAccount,
      currencyValidationTag,
      bankValidationTag: 1
    });
  }

  getvailabledolarlimitsendmoney( amountAvailable: number ){
    return this.httpService.post('canales',this.getSendMoneyLimit,{
      amountAvailable,
	    currency : 188,
	    channelId : 101


    })
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
