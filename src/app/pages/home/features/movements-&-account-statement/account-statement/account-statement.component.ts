import {Component, OnInit} from '@angular/core';
import {AccountStatementService} from './account-statement.service';
import {Tag} from '../../../../../shared/models/tag';
import {TagsService} from '../../../../../core/services/tags.service';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.scss']
})
export class AccountStatementComponent implements OnInit {
  accountStatementDataSource = [];
  displayColumns = ['date', 'commerce', 'amount', 'quotas', 'balance', 'rate'];
  p = 0;
  currencySymbol = '';
  linkTag: string;
  columnOneTag: string;
  columnTwoTag: string;
  columnThreeTag: string;
  columnFourTag: string;

  constructor(private accountStatementService: AccountStatementService,
              private tagsService: TagsService) {
  }

  ngOnInit(): void {
    this.accountStatementService.dataSourceObs.subscribe(accountStatement => this.accountStatementDataSource = accountStatement);
    this.accountStatementService.currencySymbolObs.subscribe(currencySymbol => this.currencySymbol = currencySymbol);
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Movimientos').tags));
  }

  getTags(tags: Tag[]) {
    this.linkTag = tags.find(tag => tag.description === 'movimientos.link').value;
    this.columnOneTag = tags.find(tag => tag.description === 'movimientos.table.column1').value;
    this.columnTwoTag = tags.find(tag => tag.description === 'movimientos.table.column2').value;
    this.columnThreeTag = tags.find(tag => tag.description === 'movimientos.table.column3').value;
    this.columnFourTag = tags.find(tag => tag.description === 'movimientos.table.column4').value;
  }
}
