import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Cacheable} from 'ngx-cacheable';
import {Observable} from 'rxjs';
import {Quota} from '../../shared/models/quota';
import {map} from 'rxjs/operators';

@Injectable()
export class CustomerApiService {
  private readonly getQuotasUri = 'customerservice/listquotabyproduct';

  constructor(private httpService: HttpService) {
  }

  @Cacheable()
  getQuotas(productId: number): Observable<Quota[]> {
    return this.httpService
      .post('canales', this.getQuotasUri, {productId})
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.listQuota;
          } else {
            return [];
          }
        })
      );
  }
}
