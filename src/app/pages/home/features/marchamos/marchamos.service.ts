import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ConsultVehicle} from '../../../../shared/models/consultVehicle.models';
import {BillingHistory} from '../../../../shared/models/billingHistory.models';
import {OwnerPayer} from '../../../../shared/models/ownerPayer.model';


@Injectable()
export class MarchamosService {
  constructor() {
  }


  // tslint:disable-next-line:variable-name
  private _consultMarchamos = new Subject();

  get consultMarchamos(): Observable<any> {
    return this._consultMarchamos.asObservable();
  }



  private _amountItemsProducts = new Subject<{ responsabilityCivilAmount: number, roadAsistanceAmount: number, moreProtectionAmount: number }>();

  get amountItemsProducts(): Observable<{ responsabilityCivilAmount: number, roadAsistanceAmount: number, moreProtectionAmount: number }>{
    return this._amountItemsProducts.asObservable();
  }

  private _ownerPayerInfo = new Subject<{ ownerPayer: OwnerPayer}>();

  get ownerPayerInfo() {
    return this._ownerPayerInfo.asObservable();
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
  private _domicileDescription = new Subject<{ name: string, number: number, email:string, detail?:string, province?: number,canton?: number,distric?: number}>();


  get domicileDescription(): Observable <{ name: string, number: number, email:string, detail?:string, province?: number,canton?: number,distric?: number}>{
    return this._domicileDescription.asObservable();
  }

  private _newDeliveryDirection = new Subject<{ personReceive: string, phoneNumber: number, exactlyDirection?:string, province?: number,canton?: number,distric?: number, email:string }>();

  get newDeliveryDirection(): Observable <{ personReceive: string, phoneNumber: number, email:string, exactlyDirection?:string, province?: number,canton?: number,distric?: number }> {
    return this._newDeliveryDirection.asObservable();
  }

  private _pickUpStoreId =  new Subject<{ pickUpId:number}>();

  get pickUpStoreId() : Observable<{ pickUpId:number}>{
    return this._pickUpStoreId.asObservable();
  }

consult() {
    this._consultMarchamos.next();
  }


  emitConsultVehicleAndHistory(consultVehicle: ConsultVehicle, billingHistories: BillingHistory[]) {
    this._consultVehicleAndBillingHistory.next({consultVehicle, billingHistories});
  }

  emitOwnerPayerInfo(ownerPayer: OwnerPayer){
    this._ownerPayerInfo.next({ownerPayer});
  }

  emitIvaAndCommission(iva: number, commission: number) {
    this._ivaAndCommission.next({iva, commission});
  }

  emitDomicileDescription(name: string, number: number, email:string, detail?:string, province?: number,canton?: number,distric?: number){
    this._domicileDescription.next({name, number, email , detail, province, canton, distric});
  }

  emitNewDeliveryDirection(personReceive: string, phoneNumber: number, email:string, exactlyDirection?:string, province?: number,canton?: number,distric?: number){
    this._newDeliveryDirection.next({ personReceive, phoneNumber, exactlyDirection, province,canton,distric, email});
  }

  emitPickUpStoreId(pickUpId:number){
    this._pickUpStoreId.next({pickUpId});
  }

  emitAmountItemsProducts(responsabilityCivilAmount: number, roadAsistanceAmount: number, moreProtectionAmount: number ){
    this._amountItemsProducts.next({responsabilityCivilAmount, roadAsistanceAmount, moreProtectionAmount});
  }
}
