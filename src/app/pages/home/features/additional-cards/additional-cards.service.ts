import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';

@Injectable()
export class AdditionalCardsService {

  constructor(private httpService: HttpService) {
  }
}
