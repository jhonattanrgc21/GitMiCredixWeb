import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable()
export class MovementsService {
  private getMovementsUri = 'account/movements';
  private cardSelected: Subject<number> = new Subject();
  cardSelectedObs = this.cardSelected.asObservable();

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  emitCardSelect(cardId: number) {
    this.cardSelected.next(cardId);
  }

  getMovements(cardId = this.storageService.getCurrentCards().find(card => card.category === 'Principal').cardId) {
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
