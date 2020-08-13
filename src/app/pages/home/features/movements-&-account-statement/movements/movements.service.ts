import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Movement} from '../../../../../shared/models/Movement';

@Injectable()
export class MovementsService {
  private getMovementsUri = 'account/movements';
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
}
