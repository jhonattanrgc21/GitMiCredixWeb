import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {publishReplay, refCount} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable()
export class LandingService {
  homeTags: Observable<any>;
  homeContent: Observable<any>;
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

}
