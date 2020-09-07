import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutomaticsService {

  constructor(private httpServices: HttpService) {
  }

  getPeriodicity() {
    return this.httpServices.post('canales', 'schedulerpayment/getperiodicitylist', {})
      .pipe(
        map((response) => {
          if (response.length > 0) {
            return response;
          } else {
            return [];
          }
        })
      );
  }
}
