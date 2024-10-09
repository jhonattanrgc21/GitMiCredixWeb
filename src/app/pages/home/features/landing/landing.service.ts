import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {Observable} from 'rxjs';
import {Cacheable} from 'ngx-cacheable';

@Injectable()
export class LandingService {
  private readonly tagsHomeUri = 'tags/funcionalitytagshome';

  constructor(private httpService: HttpService) {}

  @Cacheable()
  getHomeTags(): Observable<any> {
    return this.httpService.post('canales', this.tagsHomeUri);
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
