import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {Observable} from 'rxjs';
import * as CryptoJS from 'crypto-js';
import {map} from 'rxjs/operators';

@Injectable()
export class ChangePinService {
  private readonly changePinUri = 'security/modifysecuritykey';

  constructor(private httpService: HttpService) {
  }

  changePin(newSecurityKey: string, codeCredix: number):
    Observable<{ type: 'success' | 'error', status: number, message: string, title: string }> {
    return this.httpService.post('canales', this.changePinUri, {
      newSecurityKey: CryptoJS.SHA256(newSecurityKey),
      codeCredix
    }).pipe(
      map(response => {
        return {type: response.type, title: response.titleOne, message: response.descriptionOne, status: response.status};
      }));
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
