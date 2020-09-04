import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpService} from '../../../../core/services/http.service';
import {StorageService} from '../../../../core/services/storage.service';
import {map} from 'rxjs/operators';

@Injectable()
export class BuyWithoutCardService {
  private readonly getCardListByIdentificationUri = 'account/cardlistbyidentification';
  private readonly generatePinUri = 'touchandpay/generatepin';

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  // tslint:disable-next-line:variable-name
  private _dataGeneratePin = new Subject<{
    applicantIdentification: string,
    lifeTimePin: number,
    message: string,
    pin: string,
    printName: string
  }>();

  get dataGeneratePin(): Observable<{
    applicantIdentification: string,
    lifeTimePin: number,
    message: string,
    pin: string,
    printName: string
  }> {
    return this._dataGeneratePin.asObservable();
  }

  emitDataGeneratePin(applicantIdentification: string, lifeTimePin: number, message: string, pin: string, printName: string) {
    this._dataGeneratePin.next({applicantIdentification, lifeTimePin, message, pin, printName});
  }

  generatePin(code: string) {
    return this.httpService.post('canales', this.generatePinUri,
      {
        cardId: this.storageService.getCurrentCards().find(element => element.category === 'Principal').cardId,
        userIdCreate: this.storageService.getCurrentUser().userId,
        codeCredix: code
      });
  }

  getCardListByIdentification(identification: string) {
    return this.httpService.post('canales', this.getCardListByIdentificationUri, {identification})
      .pipe(
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
