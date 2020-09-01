import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';
import {Currency} from '../../../../../shared/models/currency';
import {SendMoneyService} from '../send-money.service';
import {FavoriteIbanAccount} from '../../../../../shared/models/favorite-iban-account';
import {ModalService} from '../../../../../core/services/modal.service';
import {ModalAddIbanComponent} from './modal-add-iban/modal-add-iban.component';


@Component({
  selector: 'app-send-money-first-step',
  templateUrl: './send-money-first-step.component.html',
  styleUrls: ['./send-money-first-step.component.scss'],
})
export class SendMoneyFirstStepComponent implements OnInit {
  @Input() favoriteAccountControl: FormControl;
  @Output() currencyPrefixEvent = new EventEmitter();
  @Output() typeDestinationEvent = new EventEmitter();
  currencies: Currency[] = [];
  favoritesAccounts: FavoriteIbanAccount[] = [];
  showSecondContent = false;
  showFavoriteAccountsSelect = false;
  info;
  showDetails = false;
  currency;
  checked1 = false;
  checked2 = false;

  constructor(
    private globalRequestsService: GlobalRequestsService,
    private sendMoneyService: SendMoneyService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.getFavoritesAccounts();
  }

  getCurrencies() {
    this.globalRequestsService.getCurrencies().subscribe((currencies) => {
      if (currencies) {
        this.currencies = currencies;
      }
    });
  }

  getFavoritesAccounts() {
    this.sendMoneyService
      .getFavoritesAccounts()
      .subscribe((favoritesAccounts) => this.favoritesAccounts = favoritesAccounts);
  }

  currencyRadioButtonChange(event: { value: Currency; checked: boolean }) {
    this.showSecondContent = true;
    this.currencyPrefixEvent.emit(event.value.currency);
    this.currency = event.value.currency;
    this.checked1 = false;
    this.checked2 = false;
  }

  accountRadioButtonChange(event: { value: string; checked: boolean }) {
    this.favoriteAccountControl.reset();
    this.typeDestinationEvent.emit(+event.value);
    this.showFavoriteAccountsSelect = event.value === '1';
    if(event.value === '1'){
      this.checked1 = event.checked;
    }else{
      this.checked2 = event.checked;
    }


    if (event.value === '2') {
      this.showDetails = true;
      this.openModal(this.info);

    } else {
      this.showDetails = false;
    }
  }

  openModal(info) {
    const modal = this.modalService
      .open({component: ModalAddIbanComponent, title: 'Añadir cuenta IBAN', data: {info, currency: this.currency}},
        {width: 380, height: 535, disableClose: false, panelClass: 'add-account-panel'}, 1);

    modal.afterClosed().subscribe(ibanAccount => {
      if (ibanAccount) {
        this.info = ibanAccount;
        this.favoriteAccountControl.setValue(ibanAccount);
      }
    });

  }
}
