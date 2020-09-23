import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';

@Injectable()
export class BuyWithoutCardService {
  private readonly generatePinUri = 'touchandpay/generatepin';
  private readonly validateSeedUri = 'security/validateseed';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  checkCredixCode(credixCode: string) {
    return this.httpService.post('canales', this.validateSeedUri,
      {
        identification: this.storageService.getIdentification(),
        otp: +credixCode
      });
  }

  generatePin(cardId: number) {
    return this.httpService.post('canales', this.generatePinUri,
      {
        cardId,
        userIdCreate: this.storageService.getCurrentUser().userId
      });
  }
}
