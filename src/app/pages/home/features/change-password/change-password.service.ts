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
      typeIdentification: this.storageService.getCurrentUser().idtId,
      identification: this.storageService.getCurrentUser().identification,
      username: this.storageService.getIdentification(),
      codeCredix,
      password: CryptoJS.SHA256(password),
      passwordConfirmation: CryptoJS.SHA256(password)
    })
      .pipe(
        map(response => {
          return {type: response.type, title: response.titleOne, message: response.descriptionOne, status: response.status};
        }));
  }

}
