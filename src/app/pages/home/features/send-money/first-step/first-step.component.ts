import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';
import {Currency} from '../../../../../shared/models/currency';
import {SendMoneyService} from '../send-money.service';
import {FavoriteIbanAccount} from '../../../../../shared/models/favorite-iban-account';

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit {
  @Input() favoriteAccountControl: FormControl;
  @Output() currencyPrefixEvent = new EventEmitter();
  currencies: Currency[] = [];
  favoritesAccounts: FavoriteIbanAccount[] = [];
  showSecondContent = false;
  showFavoriteAccountsSelect = false;

  constructor(private globalRequestsService: GlobalRequestsService,
              private sendMoneyService: SendMoneyService) {
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.getFavoritesAccounts();
  }

  getCurrencies() {
    this.globalRequestsService.getCurrencies().subscribe(currencies => {
      if (currencies) {
        this.currencies = currencies;
      }
    });
  }

  getFavoritesAccounts() {
    this.sendMoneyService.getFavoritesAccounts().subscribe(favoritesAccounts => {
      this.favoritesAccounts = favoritesAccounts;
    });
  }

  currencyRadioButtonChange(event: { value: Currency, checked: boolean }) {
    this.showSecondContent = true;
    this.currencyPrefixEvent.emit(event.value.currency);
  }

  accountRadioButtonChange(event: { value: string, checked: boolean }) {
    this.showFavoriteAccountsSelect = event.value === '1';
  }

}
