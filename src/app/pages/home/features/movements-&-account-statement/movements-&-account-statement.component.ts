import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Card} from '../../../../shared/models/card.model';
import {StorageService} from '../../../../core/services/storage.service';
import {HttpService} from '../../../../core/services/http.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movements-state-account',
  templateUrl: './movements-&-account-statement.component.html',
  styleUrls: ['./movements-&-account-statement.component.scss']
})
export class MovementsAccountStatementComponent implements OnInit {
  cardFormControl = new FormControl(null, []);
  consultForm: FormGroup = new FormGroup({
    dateEdc: new FormControl('', [Validators.required])
  });
  dateEdcSelect: DateSelect[] = [];
  tabs = [
    {id: 1, name: 'Recientes'},
    {id: 2, name: 'Estados de cuenta'},
  ];
  currencyTabs = [
    {id: 1, name: '₡ '},
    {id: 2, name: '$ '},
  ];
  selectTab = 1;
  simbolCurrency = '₡ ';
  yearMonth = '';
  cards: Card[];
  cashPayment = '';
  minimumPayment = '';
  maximumPaymentDate = '';
  @Output() cardChanged = new EventEmitter<number>();
  edcDisplayedColumns: string[] = ['date', 'commerce', 'amount', 'quotas', 'saldo', 'tasa'];
  edcDataSource: StateAccount[] = [];
  edc: any;
  edcUsd: StateAccount[] = [];
  edcCrc: StateAccount[] = [];
  p = 0;
  q = 0;
  selectedYearMonth: number;
  month = '';
  year = '';

  constructor(private storageService: StorageService,
              private httpService: HttpService,
              private router: Router) {
    this.cards = this.storageService.getCurrentCards();
    this.cardFormControl.setValue(this.cards.find(card => card.category === 'Principal'));
  }

  ngOnInit(): void {
    this.onCardChanged();
  }

  onCardChanged() {
    this.cardFormControl.valueChanges.subscribe(card => {
      this.cardChanged.emit(card.cardId);
    });
  }

  formatPrincipalCard(value: string): string {
    return `${value.substr(value.length - 8, 4)} ${value.substr(value.length - 4, value.length)}`;
  }

  tabSelected(tab) {
    this.selectTab = tab.id;
    this.router.navigate([`/home/movements-&-account-statement/${tab.id === 1 ? 'movements' : 'account-statement'}`]);
    this.currencyTabSelected({id: 1, name: '₡ '});
  }

  assignDateSelect() {

  }

  currencyTabSelected(tab) {
    if (tab.id === 1) {
      this.edcDataSource = this.edcCrc;
      this.simbolCurrency = tab.name;
      this.cashPayment = this.edc.edcCrc.cashPayment;
      this.minimumPayment = this.edc.edcCrc.minimumPayment;
      this.maximumPaymentDate = this.edc.edcCrc.maximumPaymentDate;
    } else {
      this.edcDataSource = this.edcUsd;
      this.simbolCurrency = tab.name;
      this.cashPayment = this.edc.edcUsd.cashPayment;
      this.minimumPayment = this.edc.edcUsd.minimumPayment;
      this.maximumPaymentDate = this.edc.edcUsd.maximumPaymentDate;
    }
  }

  getStateAccount(month: string, year: string, setSelect: boolean) {
    this.httpService.post('canales', 'channels/getstateaccount', {
      channelId: 102,
      accountNumber: this.storageService.getCurrentUser().accountNumber,
      month,
      year
    }).subscribe(data => {
      if (data.type === 'success') {
        if (setSelect) {
          this.setMonthYearSelect(data.yearMonth, data.quantityEdc);
        }
        this.edc = data;
        this.yearMonth = data.yearMonth;
        this.cashPayment = data.edcCrc.cashPayment;
        this.minimumPayment = data.edcCrc.minimumPayment;
        this.maximumPaymentDate = data.edcCrc.maximumPaymentDate;
        this.edcCrc = data.edcCrc.movementList;
        this.edcUsd = data.edcUsd.movementList;
        this.edcDataSource = this.edcCrc;
      }
    });
  }

  setMonthYearSelect(date: string, quantityEdc: number) {
    const dateActual = new Date();
    const year = date.substr(0, 4);
    const month = date.substr(4, 2);
    dateActual.setFullYear(Number(year));
    dateActual.setMonth(Number(month));
    this.dateEdcSelect = [{
      id: 0, yearMonth: '01/' + month + '/' + year
    }];
    this.selectedYearMonth = 0;
    for (let i = 1; i < quantityEdc; i++) {
      dateActual.setMonth(dateActual.getMonth() - 1);
      const dateAux: DateSelect = {id: i, yearMonth: '01/' + dateActual.getMonth().toString() + '/' + dateActual.getFullYear().toString()};
      this.dateEdcSelect.push(dateAux);
    }
  }

  select(data) {
    const dateAux = data.source.value.yearMonth.split('/');
    this.year = dateAux[2];
    this.month = dateAux[1].length === 1 ? '0' + dateAux[1] : dateAux[1];
    this.getStateAccount(this.month, this.year, false);
  }

  downloadEdc() {
    this.httpService.post('canales', 'channels/getbankaccountstatement', {
      channelId: 102,
      accountNumber: this.storageService.getCurrentUser().accountNumber,
      month: Number(this.month),
      year: Number(this.year)
    }).subscribe(data => {
      if (data.type === 'success') {
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    });
  }
}

export interface StateAccount {
  amount: string;
  quotaNumberLiquidated: number;
  movementDate: string;
  quantityQuota: number;
  typeMovement: number;
  referenceName: string;
  RatePlanCharge: number;
  pendingCapital: string;
}

export interface DateSelect {
  id: number;
  yearMonth: string;
}
