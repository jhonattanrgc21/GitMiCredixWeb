import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class BuyWithoutCardService {

  // tslint:disable-next-line:variable-name
  private _IdentificationAndName = new Subject<{ identification: string, name: string }>();

  constructor() {
  }

  get identification(): Observable<{ identification: string, name: string }> {
    return this._IdentificationAndName.asObservable();
  }

  emitIdentification(identification: string, name: string) {
    this._IdentificationAndName.next({identification, name});
  }


}
