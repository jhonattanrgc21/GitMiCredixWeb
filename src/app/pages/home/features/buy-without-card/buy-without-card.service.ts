import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {map} from 'rxjs/operators';

@Injectable()
export class BuyWithoutCardService {

  private getCardListByIdentificationUri = 'account/cardlistbyidentification';
  private generatePinUri = 'touchandpay/generatepin';

  constructor(
    private httpService: HttpService,
    private storageService: StorageService) {
  }

  // tslint:disable-next-line:variable-name max-line-length
  private _dataGeneratePin = new Subject<{ applicantIdentification: string, lifeTimePin: number, message: string, pin: string, printName: string }>();

  // tslint:disable-next-line:max-line-length
  get dataGeneratePin(): Observable<{ applicantIdentification: string, lifeTimePin: number, message: string, pin: string, printName: string }> {
    return this._dataGeneratePin.asObservable();
  }

  emitDataGeneratePin(applicantIdentification: string, lifeTimePin: number, message: string, pin: string, printName: string) {
    this._dataGeneratePin.next({applicantIdentification, lifeTimePin, message, pin, printName});
  }

  // tslint:disable-next-line:variable-name

  generatePin(code: string) {
    return this.httpService.post('canales', this.generatePinUri,
      {
        channelId: 102,
        // tslint:disable-next-line:no-shadowed-variable
        cardId: this.storageService.getCurrentCards().find(element => element.category === 'Principal').cardId,
        userIdCreate: this.storageService.getCurrentUser().userId,
        codeCredix: code
      });
  }

  getCardListByIdentification(iden: string) {
    return this.httpService.post('canales', this.getCardListByIdentificationUri,
      {
        identification: iden,
        // tslint:disable-next-line:indent
        channelId: 102
      }).pipe(
      map(response => {
        if (response.type === 'success') {
          return response.cardNumberList;
        } else {
          return [];
        }
      })
    );
  }

}
