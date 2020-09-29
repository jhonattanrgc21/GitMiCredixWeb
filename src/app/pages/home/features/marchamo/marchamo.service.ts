import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ConsultVehicle} from '../../../../shared/models/consult-vehicle';
import {BillingHistory} from '../../../../shared/models/billing-history';
import {OwnerPayer} from '../../../../shared/models/owner-payer';
import {Cacheable} from 'ngx-cacheable';
import {VehicleType} from '../../../../shared/models/vehicle-type';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {StorageService} from '../../../../core/services/storage.service';


@Injectable()
export class MarchamoService {
  private readonly getPlateTypesUri = 'pay/platetypes';
  private readonly getVehicleConsultUri = 'pay/vehicleconsult';
  private readonly getOwnerPayerInfoUri = 'owners/payerinfo';
  private readonly getCalculateComissionUri = 'pay/calculatecommission';
  consultVehicle: ConsultVehicle;
  billingHistories: BillingHistory[];
  ownerPayer: OwnerPayer;

  constructor(private httpService: HttpService,
              private toastService: CredixToastService,
              private storageService: StorageService) {
  }

  iva: number;
  commission: number;
  total: number;
  // tslint:disable-next-line:variable-name
  private _vehicleConsulted = new Subject();
  vehicleConsulted$ = this._vehicleConsulted.asObservable();
// tslint:disable-next-line:variable-name
  private _consultVehicle = new Subject();
  consultVehicle$ = this._consultVehicle.asObservable();

  // tslint:disable-next-line:variable-name
  private _amountProducts: { amounts: number; productCode: number; }[];

  get amountProducts(): { amounts: number; productCode: number; }[] {
    return this._amountProducts;
  }

  set setAmountProducts(data: { amounts: number; productCode: number; }[]) {
    this._amountProducts = data;
  }

  emitVehicleConsulted() {
    this._vehicleConsulted.next();
  }

  consultNewVehicle() {
    this._consultVehicle.next();
  }

  @Cacheable()
  getVehiclePlate(): Observable<VehicleType[]> {
    return this.httpService.post('marchamos', this.getPlateTypesUri, {})
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.plateTypesList;
          } else {
            return [];
          }
        }));
  }

  @Cacheable()
  getConsultVehicle(plateClassId: string, plateNumber: string): Observable<any> {
    return this.httpService.post('marchamos', this.getVehicleConsultUri, {
      plateClassId,
      plateNumber,
      aditionalProducts: [
        {
          productCode: 5
        },
        {
          productCode: 6
        },
        {
          productCode: 8
        }
      ]
    }).pipe(
      map((response) => {
        if (response.type === 'success') {
          return response.REQUESTRESULT.soaResultVehicleConsult;
        } else {
          this.toastService.show({text: response.message, type: 'error'});
          return [];
        }
      })
    );
  }

  @Cacheable()
  getOwnersPayerInfo(): Observable<OwnerPayer> {
    return this.httpService.post('marchamos', this.getOwnerPayerInfoUri, {
      channelId: 107,
      payerId: null,
      accountNumber: this.storageService.getCurrentUser().accountNumber
    }).pipe(
      map((response) => {
        if (response.type === 'success') {
          this.ownerPayer = response.REQUESTRESULT.soaResultPayerInfo.header;
          return response.REQUESTRESULT.soaResultPayerInfo.header;
        } else {
          return null;
        }
      })
    );
  }

  @Cacheable()
  getCommission(commissionQuotasId: number, amount: number): Observable<any> {
    return this.httpService.post('marchamos', this.getCalculateComissionUri, {
      amount,
      commissionQuotasId
    }).pipe(
      map((response) => {
        if (response.type === 'success') {
          return response;
        } else {
          return null;
        }
      })
    );
  }
}
