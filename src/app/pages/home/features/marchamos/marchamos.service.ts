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

  // 3er paso de marchamo
  private _domicileDescription = new Subject<{ name: string, detail?:string, province?: number,canton?: number,distric?: number, number: number}>();


  get domicileDescription(): Observable <{ name: string, number: number, detail?:string, province?: number,canton?: number,distric?: number}>{
    return this._domicileDescription.asObservable();
  }

  private _newDeliveryDirection = new Subject<{ personReceive: string, phoneNumber: number, exactlyDirection?:string, province?: number,canton?: number,distric?: number }>();

  get newDeliveryDirection(): Observable <{ personReceive: string, phoneNumber: number, exactlyDirection?:string, province?: number,canton?: number,distric?: number }> {
    return this._newDeliveryDirection.asObservable();
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

  emitDomicileDescription(name: string, number: number, detail?:string, province?: number,canton?: number,distric?: number){
    this._domicileDescription.next({name, detail , province, canton, distric, number});
  }

  emitNewDeliveryDirection(personReceive: string, phoneNumber: number, exactlyDirection?:string, province?: number,canton?: number,distric?: number){
    this._newDeliveryDirection.next({ personReceive, phoneNumber, exactlyDirection, province,canton,distric});
  }
}
