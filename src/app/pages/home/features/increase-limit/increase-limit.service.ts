import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';

@Injectable()
export class IncreaseLimitService {
  private readonly increaseLimitUri = 'customerservice/limitincrease';

  constructor(private httpService: HttpService) {
  }

  increaseLimit() {
    return this.httpService.post('canales', this.increaseLimitUri);
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
