import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { Observable, of } from 'rxjs';
import { Functionality } from '../../shared/models/functionality';
import { Cacheable } from 'ngx-cacheable';
import { StorageService } from './storage.service';
import { DatePipe } from '@angular/common';
@Injectable()
export class TagsService {
  private readonly tagsHomePageUri = 'homepage/tagshomepage';
  private readonly allTagsUri = 'tags/allfunctionalitylabels';

  enableIncreaseCreditLimit: boolean;
  titularCardNotActive: boolean = null;

  constructor(private httpService: HttpService, private storageService: StorageService) {
  }

  @Cacheable()
  getAllFunctionalitiesAndTags(): Observable<Functionality[]> {
    return this.httpService.post('canales', this.allTagsUri)
      .pipe(
        map(response => {
          if (response.type === 'success') {
            this.enableIncreaseCreditLimit = response.enableIncreaseCreditLimit;
            return (response.tagsByFunctionality as Functionality[]).filter(func => func.status === 1);
          }
          return [];
        }));
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
            this.titularCardNotActive = !!response.json.titularCardNotActive
            return response.json;
          } else {
            throw new Error('Ocurrió un error');
          }
        }),
        catchError(err => {
          console.log('Error: ', err);
          return of();
        })
      )
  }

}
