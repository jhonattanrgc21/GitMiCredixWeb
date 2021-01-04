import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable} from 'rxjs';
import * as CryptoJS from 'crypto-js';
import {map} from 'rxjs/operators';

@Injectable()
export class ChangePasswordService {
  private readonly changePasswordUri = 'security/user/forgetusernameandpasswordbyidentification';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  changePassword(codeCredix: string, password: string):
    Observable<{ type: 'success' | 'error', status?: number, message: string, title: string }> {
    return this.httpService.post('canales', this.changePasswordUri, {
      typeIdentification: this.storageService.getCurrentUser().typeIdentification,
      identification: this.storageService.getCurrentUser().identification,
      username: this.storageService.getCurrentUser().identification,
      codeCredix,
      password: CryptoJS.SHA256(password).toString(),
      passwordConfirmation: CryptoJS.SHA256(password).toString()
    })
      .pipe(
        map(response => {
          return {type: response.type, title: response.titleOne, message: response.descriptionOne, status: response.status || 200};
        }));
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
