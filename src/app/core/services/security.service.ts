import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {StorageService} from './storage.service';

@Injectable()
export class SecurityService {

  constructor(private httpService: HttpService, private storageService: StorageService) {
  }

  public userLogin(parametros = {}) {
    this.httpService.post('canales', 'security/userlogin', parametros).subscribe(data => {
        if (data.titleOne === 'success') {
          this.storageService.setCurrentSession(data);
          console.log('CardlocalStorage' + this.storageService.getCurrentCard());
        } else if (data.titleOne === 'warn') {
          this.storageService.setCurrentSession(data);
          console.log('CardlocalStorage' + this.storageService.getCurrentCard());
        } else if (data.titleOne === 'error') {
          this.storageService.setCurrentSession(data);
          console.log('CardlocalStorage' + this.storageService.getCurrentCard());
        }
      }
    );
  }

  public userLogout(parametros = {}) {
    this.httpService.post('canales', 'security/userlogin', parametros).subscribe(data => {
        if (data.titleOne === 'success') {
          this.storageService.setCurrentSession(data);
          console.log('CardlocalStorage' + this.storageService.getCurrentCard());
        } else if (data.titleOne === 'warn') {
          this.storageService.setCurrentSession(data);
          console.log('CardlocalStorage' + this.storageService.getCurrentCard());
        } else if (data.titleOne === 'error') {
          this.storageService.setCurrentSession(data);
          console.log('CardlocalStorage' + this.storageService.getCurrentCard());
        }
      }
    );
  }

  public closeSessionActivate(parametros = {}) {
    this.httpService.post('canales', 'security/logoutbyusername', parametros).subscribe(data => {
        console.log(data);
        if (data.type === 'success') {
          this.storageService.removeCurrentSession();
          this.userLogin(parametros);
        } else if (data.type === 'error') {

        }
      }
    );
  }
}

