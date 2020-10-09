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
  private personalCreditSummaryChangedSub: Subject<any> = new Subject<any>();
  private amountChangedSub: Subject<any> = new Subject<any>();

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  // tslint:disable-next-line:variable-name
  private _personalCreditSummary: PersonalCreditSummary;

  get personalCreditSummary(): PersonalCreditSummary {
    return this._personalCreditSummary;
  }

  set personalCreditSummary(personalCreditSummary: PersonalCreditSummary) {
    this._personalCreditSummary = personalCreditSummary;
  }

  // tslint:disable-next-line:variable-name
  private _amount: number;

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
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
}
