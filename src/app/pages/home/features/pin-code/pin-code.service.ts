import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Cacheable} from 'ngx-cacheable';
import { CardPin } from 'src/app/shared/models/card-pin';

@Injectable()
export class ChangePinService {
  private readonly changePinUri = 'security/modifysecuritykey';
  private readonly getCardPin = 'account/findpincardbycrdid';
  private readonly newTicketPinUri = '/account/ticketunlockpin';

  public cardPin: CardPin;

  constructor(private httpService: HttpService) {
  }

  changePin(newSecurityKey: string, codeCredix: number, cardId: number):
    Observable<{ type: 'success' | 'error', status: number, message: string, title: string }> {
    return this.httpService.post('canales', this.changePinUri, {
      newSecurityKey,
      codeCredix,
      cardId,
    }).pipe(
      map(response => {
        return {type: response.type, title: response.titleOne, message: response.descriptionOne, status: response.status};
      }));
  }

  @Cacheable()
  currentPin(crdId: number): Observable<any> {
    return this.httpService.post('canales', this.getCardPin, {
      crdId,
    }).pipe(
        map((response) => {
          if ( response && ( response?.type === 'success' ) ) {
            return {type: response.type, title: response.titleOne, message: response.descriptionOne, status: response.status, pin: response.pin, pinStatus: response.pinStatus};
          } else {
            return null;
          }
        })
    );
  }
  
  @Cacheable()
  newTicketPin(crdId: number): Observable<any> {
    return this.httpService.post('canales', this.newTicketPinUri, {
      cardId: crdId,
    }).pipe(
        map((response) =>{
          return {type: response.type, title: response.titleOne, message: response.descriptionOne, status: response.status};
        })
    );
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
