import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {map} from 'rxjs/operators';

@Injectable()
export class GlobalRequestsService {
  currenciesUri = 'global/currencies';
  identificationTypesUri = 'global/identification-types';

  constructor(private httpService: HttpService) {
  }

  getCurrencies() {
    return this.httpService.post('canales', this.currenciesUri)
      .pipe(map(response => {
        if (response.type === 'success') {
          return response.currencies;
        } else {
          return [];
        }
      }));
  }

  getIdentificationTypes() {
    return this.httpService.post('canales', this.identificationTypesUri);
  }

}
