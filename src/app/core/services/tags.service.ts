import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Functionality} from '../../shared/models/functionality';
import {Cacheable} from 'ngx-cacheable';

@Injectable()
export class TagsService {
  private readonly allTagsUri = 'tags/allfunctionalitylabels';

  enableIncreaseCreditLimit: boolean;

  constructor(private httpService: HttpService) {
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

}
