import {Component, OnInit} from '@angular/core';
import {AccountStatementService} from './account-statement.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.scss']
})
export class AccountStatementComponent implements OnInit {
  accountStatementDataSource: AccountStatement[] = [];
  displayColumns = ['date', 'commerce', 'amount', 'quotas', 'balance', 'rate'];
  p = 0;
  currencySymbol = '';

  constructor(private accountStatementService: AccountStatementService) {
  }

  ngOnInit(): void {
    this.accountStatementService.dataSourceObs.subscribe(accountStatement => this.accountStatementDataSource = accountStatement);
  }


}
