import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {StorageService} from './storage.service';
import {Router} from "@angular/router";

@Injectable()
export class SecurityService {

  constructor(private httpService: HttpService,
              private storageService: StorageService,
              private router: Router) {
  }

  public userLogout(parametros = {}) {
    this.httpService.post('canales', 'security/userlogin', parametros).subscribe(data => {
        if (data.titleOne === 'success') {
          this.storageService.removeCurrentSession();
          this.router.navigate(['/sing-in']).then();
        } else if (data.titleOne === 'warn') {

        } else if (data.titleOne === 'error') {

        }
      }
    );
  }
}

