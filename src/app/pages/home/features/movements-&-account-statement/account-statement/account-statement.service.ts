import {Injectable} from '@angular/core';
import {HttpService} from '../../../../../core/services/http.service';
import {StorageService} from '../../../../../core/services/storage.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountStatementService {
  private getAccountStatementUri = 'channels/getstateaccount';
  private dataSourceSub = new Subject<any[]>();
  dataSourceObs = this.dataSourceSub.asObservable();

  constructor(private httpService: HttpService,
              private storageService: StorageService) {
  }

  setDataSource(dataSource: any[]) {
    this.dataSourceSub.next(dataSource);
  }

  getAccountStatement(month: number, year: number) {
    return this.httpService.post('canales', this.getAccountStatementUri, {
      accountNumber: this.storageService.getCurrentUser().accountNumber,
      month,
      year
    });
  }

}
