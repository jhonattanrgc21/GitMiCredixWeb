import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class BuyWithoutCardService {
  private readonly generatePinUri = 'touchandpay/generatepin';
  private readonly validateSeedUri = 'security/validateseed';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  checkCredixCode(credixCode: string): Observable<{ type: 'success' | 'error', status?: number, message: string, title: string }> {
    return this.httpService.post('canales', this.validateSeedUri,
      {
        identification: this.storageService.getIdentification(),
        otp: +credixCode
      }).pipe(
      map(response => {
        return {type: response.type, title: response.titleOne, message: response.descriptionOne, status: response.status};
      }));
  }

  generatePin(cardId: number) {
    return this.httpService.post('canales', this.generatePinUri,
      {
        cardId,
        userIdCreate: this.storageService.getCurrentUser().userId
      });
  }
}
