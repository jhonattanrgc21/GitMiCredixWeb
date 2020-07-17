import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpService: HttpService) { }

  public userLogin(){
    let param: {
      "username" : "114140321",
      "password" : "23cc96aaa7c2cc85d5742fd2c324e9980c611ffe817d4627a5bf730f64d736de",
      "channelId" : 116,
      "deviceIdentifier" : 1213123134,
      "typeIncome" : 2
    };
    this.httpService.post("canales", "security/userlogin", param).subscribe(data=>{
      console.log();
      if (data.type == "success"){

      }
      }
    )
  }
}

