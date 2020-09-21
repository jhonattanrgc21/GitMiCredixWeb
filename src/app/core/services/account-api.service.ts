import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {IbanAccount} from '../../shared/models/iban-account';
import {map} from 'rxjs/operators';
import {Cacheable} from 'ngx-cacheable';

@Injectable()
export class AccountApiService {
  private readonly getIbanAccountUri = 'account/getibanaccount';

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
}
