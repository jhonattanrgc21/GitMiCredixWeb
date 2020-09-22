import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Cacheable} from 'ngx-cacheable';
import {map} from 'rxjs/operators';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {AdditionalCard} from '../../shared/models/additional-card';
import {ThAddress} from '../../shared/models/th-address';

@Injectable()
export class ChannelsApiService {
  private readonly accountSummaryUri = 'channels/accountsummary';
  private readonly getAdditionalCardsUri = 'channels/getlistsadditionalcardsth';
  private readonly thAddressesUri = 'channels/getaddressth';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  @Cacheable({
    maxCacheCount: 3
  })

  getAccountSummary(cardId: number) {
    return this.httpService.post('canales', this.accountSummaryUri, {
      cardId,
      userId: this.storageService.getCurrentUser().userId,
    }).pipe(
      map((response) => {
        if (response.type === 'success' || response.titleOne === 'Éxito') {
          return {
            available: response.json.compracuotasdisp,
            limit: response.json.compra,
            consumed: response.json.consumed,
          };
        } else {
          return {
            available: '0',
            limit: '0',
            consumed: '0',
          };
        }
      })
    );
  }

  @Cacheable()
  getAdditionalCards(): Observable<AdditionalCard[]> {
    return this.httpService.post('canales', this.getAdditionalCardsUri)
      .pipe(
        map((response) => {
          if (response.type === 'success') {
            return response.json;
          } else {
            return [];
          }
        })
      );
  }

  @Cacheable()
  getThAddresses(): Observable<{ addresses: ThAddress[], email: string; phone: number }> {
    return this.httpService
      .post('canales', this.thAddressesUri, {identification: this.storageService.getIdentification()})
      .pipe(
        map((response) => {
          if (response.titleOne === 'success') {
            return {addresses: response.json.address, email: response.json.email, phone: response.json.phone};
          } else {
            return null;
          }
        })
      );
  }
}
