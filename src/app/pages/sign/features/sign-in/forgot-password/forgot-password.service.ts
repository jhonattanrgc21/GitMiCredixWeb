import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpService} from '../../../../../core/services/http.service';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';

@Injectable()
export class ForgotPasswordService {
  private readonly changePasswordUri = 'security/user/forgetusernameandpasswordbyidentification';

  constructor(private httpService: HttpService,
              private toastService: CredixToastService) {
  }

  changePassword(codeCredix: string, typeIdentification, identification, password): Observable<void> {
    return this.httpService.post('canales', this.changePasswordUri, {
      codeCredix,
      typeIdentification,
      identification,
      password: CryptoJS.SHA256(password).toString(),
      passwordConfirmation: CryptoJS.SHA256(password).toString(),
    }).pipe(
      tap(response => {
          this.toastService.show({text: response.descriptionOne, type: response.type});
        },
        error => {
        },
        () => {
        })
    );
  }

}
