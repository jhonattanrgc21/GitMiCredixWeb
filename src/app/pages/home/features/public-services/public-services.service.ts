import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpService} from '../../../../core/services/http.service';
import {Observable} from 'rxjs';

@Injectable()
export class PublicServicesService {
  private readonly getReferenceNameUri = 'publicservicebncr/namereferencebypublicservicecategory';

  constructor(private httpService: HttpService) {
  }

  getReferenceName(publicServiceCategoryId: number): Observable<string> {
    return this.httpService.post('incomex', this.getReferenceNameUri, {publicServiceCategoryId})
      .pipe(
        map((response) => {
            if (response.type === 'success') {
              return response.nombreReferencia;
            } else {
              return '';
            }
          }
        ));
  }
}
