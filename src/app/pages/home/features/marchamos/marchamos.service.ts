import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ConsultVehicle} from '../../../../shared/models/consultVehicle.models';
import {BillingHistory} from '../../../../shared/models/billingHistory.models';

@Injectable()
export class MarchamosService {
  constructor() {
  }

  // tslint:disable-next-line:variable-name
  private _consultMarchamos = new Subject();

  get consultMarchamos(): Observable<any> {
    return this._consultMarchamos.asObservable();
  }

  // tslint:disable-next-line:variable-name
  private _consultVehicleAndBillingHistory = new Subject<{ consultVehicle: ConsultVehicle, billingHistories: BillingHistory[] }>();

  get consultVehicleAndBillingHistory(): Observable<{ consultVehicle: ConsultVehicle, billingHistories: BillingHistory[] }> {
    return this._consultVehicleAndBillingHistory.asObservable();
  }

  // tslint:disable-next-line:variable-name
  private _ivaAndCommission = new Subject<{ iva: number, commission: number }>();

  get ivaAndCommission(): Observable<{ iva: number, commission: number }> {
    return this._ivaAndCommission.asObservable();
  }

  consult() {
    this._consultMarchamos.next();
  }

  emitConsultVehicleAndHistory(consultVehicle: ConsultVehicle, billingHistories: BillingHistory[]) {
    this._consultVehicleAndBillingHistory.next({consultVehicle, billingHistories});
  }

  emitIvaAndCommission(iva: number, commission: number) {
    this._ivaAndCommission.next({iva, commission});
  }
}
