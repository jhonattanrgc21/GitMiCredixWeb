import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {DatePipe} from '@angular/common';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  tagsHomePageUri = 'homepage/tagshomepage';
  accountSummaryUri = 'channels/accountsummary';

  constructor(private httpService: HttpService, private storageService: StorageService) {
  }

  getHomeContent() {
    return this.httpService.post('canales', this.tagsHomePageUri, {
      cardId: this.storageService.getCurrentCards().find(card => card.category === 'Principal').cardId,
      userId: this.storageService.getCurrentUser().userId,
      hour: new DatePipe('es').transform(new Date(), 'HH:MM')
    })
      .pipe(map(response => {
        return response.json;
      }));
  }

  getAccountSummary() {
    return this.httpService.post('canales', this.accountSummaryUri, {
      cardId: this.storageService.getCurrentCards().find(card => card.category === 'Principal').cardId,
      userId: this.storageService.getCurrentUser().userId
    })
      .pipe(map(response => {
        return response.json;
      }));
  }
}
