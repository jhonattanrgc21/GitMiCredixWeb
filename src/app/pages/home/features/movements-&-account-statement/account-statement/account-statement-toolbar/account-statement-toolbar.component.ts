import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../../../../../core/services/storage.service';
import {Card} from '../../../../../../shared/models/card.model';
import {MaskCard} from '../../../../../../shared/utils/MaskCard';
import {GlobalRequestsService} from '../../../../../../core/services/global-requests.service';
import {FormControl} from '@angular/forms';
import {AccountStatementService} from '../account-statement.service';
import {finalize} from 'rxjs/operators';
import {ScrollService} from '../../../../../../core/services/scroll.service';
import {CredixToastService} from '../../../../../../core/services/credix-toast.service';

@Component({
  selector: 'app-account-statement-toolbar',
  templateUrl: './account-statement-toolbar.component.html',
  styleUrls: ['./account-statement-toolbar.component.scss']
})
export class AccountStatementToolbarComponent implements OnInit {
  hideToolbar = false;
  principalCard: Card;
  cardNumberMasked = '';
  dateControl = new FormControl(null);
  currencySymbol = '';
  currentAccountStatement: AccountStatement;
  colonesAccountStatement: AccountStatement;
  dollarAccountStatement: AccountStatement;
  accountStatementDates: [{ id: number; date: Date }?] = [];
  crcId: number;
  accountStatementQuantity = 0;
  switchValues: { id: number, name: string }[] = [
    {id: 1, name: ''},
    {id: 2, name: ''}
  ];

  constructor(private accountStatementService: AccountStatementService,
              private storageService: StorageService,
              private scrollService: ScrollService,
              private toastService: CredixToastService,
              private globalRequestsService: GlobalRequestsService) {
    this.principalCard = storageService.getCurrentCards().find(card => card.category === 'Principal');
    this.cardNumberMasked = MaskCard(this.principalCard.cardNumber);
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.getScrollEvent();
  }

  getScrollEvent() {
    this.scrollService.scrollEventObs.subscribe(offsetY => this.hideToolbar = offsetY > 10);
  }

  onDateChanges() {
    this.dateControl.valueChanges.subscribe(value => {
      const date = this.accountStatementDates[value].date;
      this.getAccountStatement(date.getMonth() + 1, date.getFullYear());
    });
  }

  getCurrencies() {
    this.globalRequestsService.getCurrencies()
      .pipe(finalize(() => this.getAccountStatement()))
      .subscribe(currencies => {
        currencies.sort(((a, b) => a.id - b.id));
        this.crcId = currencies[0].id;
        this.switchValues = [];
        currencies.forEach(currency => this.switchValues.push({
            id: currency.id,
            name: currency.currency
          }
        ));
      });
  }

  getAccountStatement(month: number = null, year: number = null) {
    this.accountStatementService.getAccountStatement(month, year).subscribe(response => {
      if (response.type === 'success') {
        this.colonesAccountStatement = response.edcCrc;
        this.dollarAccountStatement = response.edcUsd;
        this.currentAccountStatement = this.crcId === 188 ? this.colonesAccountStatement : this.dollarAccountStatement;
        this.accountStatementQuantity = +response.quantityEdc;

        if (!month && !year) {
          const maxMonth = response.yearMonth.substr(4, 2) - 1;
          const maxYear = response.yearMonth.substr(0, 4);
          this.accountStatementDates.push({id: 0, date: new Date(maxYear, maxMonth, 1)});

          for (let i = 1; i <= this.accountStatementQuantity; i++) {
            const date = new Date(maxYear, maxMonth, 1);
            date.setMonth(maxMonth - i);
            this.accountStatementDates.push({id: i, date});
          }

          this.dateControl.setValue(0);
          this.onDateChanges();
        }

        this.accountStatementService.setDataSource(this.currentAccountStatement.movementList);
      }
    });
  }

  downloadAccountStatement() {
    this.accountStatementService
      .downloadAccountStatement(this.dateControl.value.getMonth() + 1, this.dateControl.value.getFullYear())
      .subscribe(response => {
        if (response.type === 'success') {
          this.toastService.show({text: 'Estado de cuenta enviado', type: 'success'});
        }
      });
  }

  currencyChanged(event) {
    this.currencySymbol = event.name;
    this.accountStatementService.setCurrencySymbol(this.currencySymbol);
    this.crcId = event.id;
    this.currentAccountStatement = this.crcId === 188 ? this.colonesAccountStatement : this.dollarAccountStatement;
    this.accountStatementService.setDataSource(this.currentAccountStatement.movementList);
  }
}

interface AccountStatement {
  cashPayment: string;
  minimumPayment: string;
  maximumPaymentDate: string;
  movementList: any[];
}
