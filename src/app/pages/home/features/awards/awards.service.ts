import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable} from 'rxjs';
import {Challenge} from '../../../../shared/models/challenge';

@Injectable({
  providedIn: 'root'
})
export class AwardsService {
  private readonly getChallengesUri = 'messagesrewards/challenges/user/';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  getChallenges(): Observable<Challenge[]> {
    return this.httpService.post('canales', `${this.getChallengesUri}/${this.storageService.getCurrentUser().userId}`, {
      usuId: this.storageService.getCurrentUser().userId
    }).pipe(
      map((response) => {
        if (response.type === 'success') {
          return response.json;
        } else {
          return [];
        }
      })
    );
  }
}
