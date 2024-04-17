import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {map} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Movement} from '../../../../../shared/models/movement';

@Injectable()
export class MovementsService {
  private getMovementsUri = 'account/movements';
  private getMovementDetailsUri = 'account/movementdetails';
  private dataSourceSub: Subject<Movement[]> = new Subject();
  dataSourceObs = this.dataSourceSub.asObservable();

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  setDataSource(movements: Movement[]) {
    this.dataSourceSub.next(movements);
  }

  getMovements(cardId) {
    return this.httpService.post('canales', this.getMovementsUri, {
      cardId,
      range1: '',
      range2: '',
      userId: this.storageService.getCurrentUser().userId
    }).pipe(
      map(response => {
        if (response.json.type === 'success') {
          return response.json.movements;
        }
        return [];
      }));
  }

  getMovementDetails(originDate: number, accountId: number, originAmount: string, quota: number): Observable<any> {
    return this.httpService.post('canales', this.getMovementDetailsUri, {
      accountId,
      originDate,
      originAmount,
      quota
    }).pipe( map((response) => {
      return response.json;
    }));
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }

}
