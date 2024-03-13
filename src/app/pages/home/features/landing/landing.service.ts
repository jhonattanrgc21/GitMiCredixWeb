import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {DatePipe} from '@angular/common';
import {Cacheable} from 'ngx-cacheable';

@Injectable()
export class LandingService {
  private readonly tagsHomeUri = 'tags/funcionalitytagshome';
  private readonly tagsHomePageUri = 'homepage/tagshomepage';
  private readonly SHOW_MODAL_INFO_URI = 'account/getinfotoshowmodal';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  @Cacheable()
  getHomeTags(): Observable<any> {
    return this.httpService.post('canales', this.tagsHomeUri);
  }

  @Cacheable({
    maxCacheCount: 3
  })
  getHomeContent(cardId: number) {
    return this.httpService.post('canales', this.tagsHomePageUri, {
      cardId,
      userId: this.storageService.getCurrentUser().userId,
      hour: new DatePipe('es').transform(new Date(), 'HH:MM')
    })
      .pipe(
        map(response => {
          if (response.type !== 'error') {
            return response.json;
          } else {
            throw new Error('Ocurrió un error');
          }
        }),
        catchError(err => {
          console.log('Error: ', err);
          return of();
        })
      );
  }

  showModalInfo(){
    return this.httpService.post('canales', this.SHOW_MODAL_INFO_URI, {
      modal: 'credixmas',
      dispositive: this.storageService.deviceIdentifier,
      hasSeen: true
    })
      .pipe(
        map(response => { return response.showModal }))
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
