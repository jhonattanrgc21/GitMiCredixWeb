import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private httpService: HttpService) { }

  public userLogin(parametros = {}){

    console.log(parametros);
    this.httpService.post("canales", "security/userlogin", parametros).subscribe(data=>{
      console.log(data);
      if (data.type == "success"){

      }
      }
    )
  }
}

