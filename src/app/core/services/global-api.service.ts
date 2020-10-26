import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Cacheable} from 'ngx-cacheable';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Currency} from '../../shared/models/currency';
import {Country} from '../../shared/models/country';
import {Province} from '../../shared/models/province';
import {Canton} from '../../shared/models/canton';
import {District} from '../../shared/models/district';
import {Occupation} from '../../shared/models/occupation';
import {IncomeType} from '../../shared/models/income-type';
import {DeliveryPlace} from '../../shared/models/delivery-place';
import {IdentificationType} from '../../shared/models/identification-type';

@Injectable()
export class GlobalApiService {
  private readonly currenciesUri = 'global/currencies';
  private readonly identificationTypesUri = 'global/identification-types';
  private readonly countriesUri = 'global/listcountries';
  private readonly provincesUri = 'global/listprovinces';
  private readonly cantonsUri = 'global/listcantons';
  private readonly districtsUri = 'global/listdistricts';
  private readonly occupationsUri = 'global/findalloccupation';
  private readonly incomeTypesUri = 'global/getTypeIncome';
  private readonly deliveryPlaceUri = 'global/deliveryplace';

  constructor(private httpService: HttpService) {
  }

  @Cacheable()
  getIdentificationTypes(): Observable<IdentificationType[]> {
    return this.httpService.post('canales', this.identificationTypesUri)
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.identificationTypes;
          } else {
            return [];
          }
        })
      );
  }

  @Cacheable()
  getCurrencies(): Observable<Currency[]> {
    return this.httpService.post('canales', this.currenciesUri)
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.currencies;
          } else {
            return [];
          }
        })
      );
  }

  @Cacheable()
  getCountries(): Observable<Country[]> {
    return this.httpService.post('canales', this.countriesUri);
  }

  @Cacheable()
  getProvinces(): Observable<Province[]> {
    return this.httpService.post('canales', this.provincesUri);
  }

  @Cacheable()
  getCantons(provinceId: number): Observable<Canton[]> {
    return this.httpService.post('canales', this.cantonsUri, {provinceId});
  }

  @Cacheable()
  getDistricts(cantonId: number): Observable<District[]> {
    return this.httpService.post('canales', this.districtsUri, {cantonId});
  }

  @Cacheable()
  getOccupations(): Observable<Occupation[]> {
    return this.httpService.post('canales', this.occupationsUri);
  }

  @Cacheable()
  getIncomeTypes(): Observable<IncomeType[]> {
    return this.httpService.post('canales', this.incomeTypesUri);
  }

  @Cacheable()
  getDeliveryPlaces(): Observable<DeliveryPlace[]> {
    return this.httpService.post('canales', this.deliveryPlaceUri)
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.deliveryPlace;
          } else {
            return [];
          }
        })
      );
  }


}
