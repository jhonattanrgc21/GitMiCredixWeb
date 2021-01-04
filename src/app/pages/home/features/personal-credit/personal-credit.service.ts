import {Injectable} from '@angular/core';
import {HttpService} from '../../../../core/services/http.service';
import {map} from 'rxjs/operators';
import {PersonalCreditSummary} from '../../../../shared/models/personal-credit-summary';
import {Subject} from 'rxjs';
import {StorageService} from '../../../../core/services/storage.service';

@Injectable()
export class PersonalCreditService {
  private readonly personalCreditCommissionUri = 'customerservice/personalcreditcommission';
  private readonly savePersonalCreditUri = 'customerservice/savePersonalCredit';
  private readonly getIbanAccountInfoUri = 'account/getinformationibanaccount';
  private errorIbanAccountSub = new Subject();
  errorIbanAccount$ = this.errorIbanAccountSub.asObservable();
  personalCreditSummary: PersonalCreditSummary;
  amount: number;

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  emitErrorIbanAccount() {
    this.errorIbanAccountSub.next();
  }

  getPersonalCreditsSummaries(amount: number, typeId: number = 2) {
    return this.httpService.post('canales', this.personalCreditCommissionUri, {typeId, amount})
      .pipe(
        map(response => {
          if (response.type === 'success') {
            return response.commissionList;
          } else {
            return [];
          }
        }));
  }

  checkIbanColonesAccount(ibanAccount: string) {
    return this.httpService.post('canales', this.getIbanAccountInfoUri, {
      identification: this.storageService.getCurrentUser().identification,
      ibanAccount,
      currencyValidationTag: 'L',
      bankValidationTag: '1'
    });
  }

  savePersonalCredit(personalCredit) {
    return this.httpService.post('canales', this.savePersonalCreditUri, personalCredit);
  }

  unsubscribe() {
    this.httpService.unsubscribeHttpCall();
  }
}
