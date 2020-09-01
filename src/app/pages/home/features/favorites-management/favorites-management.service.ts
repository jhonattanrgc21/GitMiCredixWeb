import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';

@Injectable()
export class FavoritesManagementService {

  constructor(private httpService: HttpService) {
  }
}
