import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AllowedMovement} from '../../../../shared/models/allowed-movement';
import {StorageService} from '../../../../core/services/storage.service';
import {ExtendTermQuota} from '../../../../shared/models/extend-term-quota';

@Injectable()
export class ExtendTermService {
  private readonly getAllowedMovementsUri = 'channels/allowedmovements';
  private readonly calculateQuotaUri = 'channels/quotacalculator';
  private readonly saveNewQuotaUri = 'channels/savequotification';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  getAllowedMovements(): Observable<AllowedMovement[]> {
    return this.httpService.post('canales', this.getAllowedMovementsUri, {
      accountId: this.storageService.getCurrentUser().actId,
      cardId: this.storageService.getCurrentCards().find(element => element.category === 'Principal').cardId
    })
      .pipe(
        map((response) => {
            if (response.result) {
              return response.result;
            } else {
              return [];
            }
          }
        ));
  }

  calculateQuotaByMovement(movementId: string): Observable<ExtendTermQuota[]> {
    return this.httpService.post('canales', this.calculateQuotaUri, {movementId})
      .pipe(
        map((response) => {
            if (response.type === 'success') {
              return response.listQuota;
            } else {
              return [];
            }
          }
        ));
  }

  saveNewQuota(cardId: number, feeAmount: number, newQuota: number, movementId: string): Observable<any> {
    return this.httpService.post('canales', this.saveNewQuotaUri, {
      cardId,
      feeAmount,
      newQuota,
      movementId,
      statusId: 1,
      userIdCreate: this.storageService.getCurrentUser().userId,
    });
  }
}
