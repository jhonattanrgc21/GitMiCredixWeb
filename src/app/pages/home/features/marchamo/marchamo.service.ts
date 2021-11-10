import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ConsultVehicle} from '../../../../shared/models/consult-vehicle';
import {BillingHistory} from '../../../../shared/models/billing-history';
import {OwnerPayer} from '../../../../shared/models/owner-payer';
import {Cacheable} from 'ngx-cacheable';
import {VehicleType} from '../../../../shared/models/vehicle-type';
import {HttpService} from '../../../../core/services/http.service';
import {map, tap} from 'rxjs/operators';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {StorageService} from '../../../../core/services/storage.service';
import {DeliveryPlace} from '../../../../shared/models/delivery-place';
import {Item} from '../../../../shared/models/item';

@Injectable()
export class MarchamoService {
  private readonly getPlateTypesUri = 'pay/platetypes';
  private readonly getVehicleConsultUri = 'pay/vehicleconsult';
  private readonly getOwnerPayerInfoUri = 'owners/payerinfo';
  private readonly getCalculateComissionUri = 'pay/calculatecommission';
  marchamoAmount: number;
  private readonly getDeliveryPlacesUri = 'global/deliveryplace';
  consultVehicle: ConsultVehicle;
  billingHistories: BillingHistory[];
  ownerPayer: OwnerPayer;
  payments: {
    promoStatus: number;
    paymentDate: string;
  }[] = [];
  itemProduct: Item[];
  hasAdditionalProducts: boolean;

  constructor(private httpService: HttpService,
              private toastService: CredixToastService,
              private storageService: StorageService) {
  }

  iva = 0;
  commission = 0;
  total = 0;
  deliveryAmount;
  private readonly getPromoApplyUri = 'pay/promoapply';
  private readonly paySoapayUri = 'pay/soapay';
  // tslint:disable-next-line:variable-name
  private _vehicleConsulted = new Subject();
  vehicleConsulted$ = this._vehicleConsulted.asObservable();
// tslint:disable-next-line:variable-name
  private _consultVehicle = new Subject();
  consultVehicle$ = this._consultVehicle.asObservable();

  // tslint:disable-next-line:variable-name
  private _amountProducts: { amounts: string | number; productCode: number; }[];

  get amountProducts(): { amounts: string | number; productCode: number; }[] {
    return this._amountProducts;
  }

  set setAmountProducts(data: { amounts: string | number; productCode: number; }[]) {
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
    return this.httpService.post('marchamos', this.getPlateTypesUri)
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
          productCode: 9
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

  @Cacheable()
  getDeliveryPlaces(): Observable<DeliveryPlace[]> {
    return this.httpService.post('canales', this.getDeliveryPlacesUri)
      .pipe(map((response) => {
          if (response.type === 'success') {
            return response.deliveryPlace.filter(x => x.id !== 6 && x.id !== 7);
          } else {
            return [];
          }
        })
      );
  }

  @Cacheable()
  getPromoApply(): Observable<{ promoStatus: number; paymentDate: string; }[]> {
    return this.httpService.post('marchamos', this.getPromoApplyUri,
      {accountNumber: this.storageService.getCurrentUser().accountNumber.toString()})
      .pipe(
        map((response) => {
          if (response.type === 'success' && response.promoStatus.type === 'success') {
            return response.promoStatus.paymentList;
          } else {
            return [];
          }
        }),
        tap(payments => {
          this.payments = payments;
        }),
      );
  }

  setSoaPay(
    aditionalProducts: { productCode: number }[],
    deliveryPlaceId: number,
    domicilePerson: string,
    domicilePhone: string,
    domicilePlace: string,
    email: string,
    firstPayment: string,
    plateClassId: number,
    plateNumber: string,
    promoStatus: number,
    quotasId: number,
    phoneNumber: number,
    ownerEmail: string,
    codeCredix: string) {
    return this.httpService.post('marchamos', this.paySoapayUri,
      {
        aditionalProducts,
        amount: this.consultVehicle.amount,
        cardNumber: this.storageService.getCurrentCards().find(card => card.category === 'Principal').cardId,
        deliveryPlaceId,
        authenticationNumberCommission: '0000',
        authenticationNumberMarchamo1: '000000',
        domicilePerson,
        domicilePhone,
        domicilePlace,
        email,
        ownerEmail,
        extraCardStatus: '0',
        firstPayment,
        payId: this.consultVehicle.payId,
        payerId: this.ownerPayer.payerId,
        period: this.consultVehicle.period,
        phoneNumber,
        plateClassId,
        plateNumber,
        promoStatus,
        quotasId,
        transactionTypeId: 1,
        requiredBill: '1',
        codeCredix
      });
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
