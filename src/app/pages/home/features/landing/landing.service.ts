import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {DatePipe} from '@angular/common';
import {map, publishReplay, refCount} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class LandingService {
  homeTags: Observable<any>;
  homeContent: Observable<any>;
  private readonly tagsHomePageUri = 'homepage/tagshomepage';
  private readonly tagsHomeUri = 'tags/funcionalitytagshome';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  getHomeTags(): Observable<any> {
    if (!this.homeTags) {
      this.homeTags = this.httpService.post('canales', this.tagsHomeUri)
        .pipe(
          publishReplay(1),
          refCount()
        );
    }
    return this.homeTags;
  }


  getHomeContent(cardId: number) {
    if (!this.homeContent) {
      this.homeContent = this.httpService.post('canales', this.tagsHomePageUri, {
        cardId,
        userId: this.storageService.getCurrentUser().userId,
        hour: new DatePipe('es').transform(new Date(), 'HH:MM')
      })
        .pipe(
          publishReplay(1),
          refCount(),
          map(response => {
            return response.json;
          }));
    }

    return this.homeContent;
  }

}
