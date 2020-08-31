import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';

@Injectable()
export class PaymentPlacesService {
  private readonly getPaymentPlacesUri = 'paymentplace/getpaymentplace';
  private readonly getPaymentPlaceRestrinctionUri = 'paymentplace/getpaymentplacerestriction';

  constructor(private httpService: HttpService) {
  }

  getPaymentPlaces() {
    return this.httpService.post('canales', this.getPaymentPlacesUri).pipe(
      map(response => {
        if (response.type === 'success') {
          return response.paymentPlace;
        } else {
          return [];
        }
      }));
  }

  getPaymentPlaceRestriction(name: string) {
    return this.httpService.post('canales', this.getPaymentPlaceRestrinctionUri, {name}).pipe(
      map(response => {
        if (response.type === 'success') {
          return response.paymentPlace;
        } else {
          return null;
        }
      }));
  }
}
