import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable, Subject} from 'rxjs';
import {IbanAccount} from '../../shared/models/iban-account';
import {map} from 'rxjs/operators';
import {Cacheable} from 'ngx-cacheable';
import {FavoriteIbanAccount} from '../../shared/models/favorite-iban-account';

export const cleanIbanFavoriteAccount$ = new Subject();


@Injectable()
export class AccountApiService {
  private readonly getIbanAccountUri = 'account/getibanaccount';
  private readonly getIbanAccountsByUserIdUri = 'iban/findAllAccountiBANFavoritebyUserId';

  constructor(private httpService: HttpService) {
  }

  @Cacheable()
  getIbanAccounts(): Observable<IbanAccount[]> {
    return this.httpService.post('canales', this.getIbanAccountUri)
      .pipe(
        map((response) => {
          if (response.type === 'success' && response.ibanAccountList) {
            return response.ibanAccountList;
          } else {
            return [];
          }
        }));
  }

  @Cacheable({
    cacheBusterObserver: cleanIbanFavoriteAccount$.asObservable()
  })
  getAllAccountIbanFavoriteByUser(): Observable<FavoriteIbanAccount[]> {
    return this.httpService.post('canales', this.getIbanAccountsByUserIdUri)
      .pipe(
        map((response) => {
          if (response.AccountIbanFavoriteList?.length > 0 && response.message === 'Operación exitosa') {
            return response.AccountIbanFavoriteList;
          } else {
            return [];
          }
        })
      );
  }
}
