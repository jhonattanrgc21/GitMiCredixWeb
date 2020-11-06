import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpService} from '../../../../../core/services/http.service';

@Injectable()
export class ForgotPasswordService {
  private readonly changePasswordUri = 'security/user/forgetusernameandpasswordbyidentification';

  constructor(private httpService: HttpService) {
  }

  changePassword(codeCredix: string, typeIdentification, identification, password):
    Observable<{ type: 'success' | 'error', status?: number, message: string, title: string }> {
    return this.httpService.post('canales', this.changePasswordUri, {
      codeCredix,
      typeIdentification,
      identification,
      password: CryptoJS.SHA256(password).toString(),
      passwordConfirmation: CryptoJS.SHA256(password).toString(),
    }).pipe(
      map(response => {
        return {type: response.type, title: response.titleOne, message: response.json, status: response.status};
      }));
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
