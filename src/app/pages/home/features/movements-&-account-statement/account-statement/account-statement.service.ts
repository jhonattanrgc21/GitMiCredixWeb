import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {Subject} from 'rxjs';

@Injectable()
export class AccountStatementService {
  private getAccountStatementUri = 'channels/getstateaccount';
  private downloadAccountStatementUri = 'channels/getbankaccountstatement';
  private dataSourceSub = new Subject<any[]>();
  dataSourceObs = this.dataSourceSub.asObservable();
  private currencySymbolSub = new Subject<string>();
  currencySymbolObs = this.currencySymbolSub.asObservable();

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  setDataSource(dataSource: any[]) {
    this.dataSourceSub.next(dataSource);
  }

  setCurrencySymbol(symbol: string) {
    this.currencySymbolSub.next(symbol);
  }

  getAccountStatement(month: number, year: number) {
    return this.httpService.post('canales', this.getAccountStatementUri, {
      accountNumber: this.storageService.getCurrentUser().accountNumber,
      month,
      year
    });
  }

  downloadAccountStatement(month: number, year: number) {
    return this.httpService.post('canales', this.downloadAccountStatementUri, {
      accountNumber: this.storageService.getCurrentUser().accountNumber,
      month,
      year
    });
  }

}
