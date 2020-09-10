import {Injectable} from '@angular/core';
import {map, publishReplay, refCount} from 'rxjs/operators';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Functionality} from '../../shared/models/functionality';

@Injectable()
export class TagsService {
  private readonly allTagsUri = 'tags/allfunctionalitylabels';
  private functionalities: Observable<Functionality[]>;

  constructor(private httpService: HttpService) {
  }

  getAllFunctionalitiesAndTags() {
    if (!this.functionalities) {
      this.functionalities = this.httpService.post('canales', this.allTagsUri)
        .pipe(
          publishReplay(1),
          refCount(),
          map(response => {
            if (response.type === 'success') {
              return (response.tagsByFunctionality as Functionality[]).filter(func => func.status === 1);
            }
            return [];
          }));
    }
    return this.functionalities;
  }

}
