import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ConsultVehicle} from '../../../../shared/models/consult-vehicle';
import {BillingHistory} from '../../../../shared/models/billing-history';
import {OwnerPayer} from '../../../../shared/models/owner-payer';


@Injectable()
export class MarchamoService {
  consultVehicle: ConsultVehicle;
  billingHistories: BillingHistory[];
  ownerPayer: OwnerPayer;
  amountProducts: { amounts: number; productCode: number; }[] = [];
  iva: number;
  commission: number;
  total: number;
  // tslint:disable-next-line:variable-name
  private _vehicleConsulted = new Subject();
  vehicleConsulted$ = this._vehicleConsulted.asObservable();
// tslint:disable-next-line:variable-name
  private _consultVehicle = new Subject();
  consultVehicle$ = this._consultVehicle.asObservable();

  constructor() {
  }

  emitVehicleConsulted() {
    this._vehicleConsulted.next();
  }

  consultNewVehicle() {
    this._consultVehicle.next();
  }
}
