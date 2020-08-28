import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class BuyWithoutCardService {

  constructor() { }


  private _identification = new Subject<{ identification: string}>();

  
  get identification() : Observable<{identification: string}> {
    return this._identification.asObservable();
  }

  emitIdentification(identification: string){
    this._identification.next({identification});
  }
  

}
