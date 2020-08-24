import {Component, OnInit} from '@angular/core';
import {AccountStatementService} from './account-statement.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.scss']
})
export class AccountStatementComponent implements OnInit {
  accountStatementDataSource = [
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
    {date: '19/01/2020', commerce: 'Hola mundo', amount: '2.000.000', quotas: 3, balance: '1.000.000', rate: 12},
  ];
  displayColumns = ['date', 'commerce', 'amount', 'quotas', 'balance', 'rate'];
  p = 0;
  currencySymbol = '';

  constructor(private accountStatementService: AccountStatementService) {
  }

  ngOnInit(): void {
    // this.accountStatementService.dataSourceObs.subscribe(accountStatement => this.accountStatementDataSource = accountStatement);
    this.accountStatementService.currencySymbolObs.subscribe(currencySymbol => this.currencySymbol = currencySymbol);
  }
}
