import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {StorageService} from "./storage.service";

@Injectable()
export class SecurityService {

  constructor(private httpService: HttpService, private storageService: StorageService) { }

  public userLogin(parametros = {}){

    console.log(parametros);
    this.httpService.post("canales", "security/userlogin", parametros,).subscribe(data=> {
        if (data.titleOne == "success") {
          console.log(data.json.accountNumber);
          this.storageService.setCurrentSession(data);
          console.log("CardlocalStorage" + this.storageService.getCurrentCard());
        }
      }
    )
  }
}

