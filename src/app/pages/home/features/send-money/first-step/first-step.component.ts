import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';
import {Currency} from '../../../../../shared/models/currency';
import {SendMoneyService} from '../send-money.service';
import {FavoriteIbanAccount} from '../../../../../shared/models/favorite-iban-account';
import {ModalService} from '../../../../../core/services/modal.service';
import {ModalAddIbanComponent} from './modal-add-iban/modal-add-iban.component';


@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
})
export class FirstStepComponent implements OnInit {
  @Input() favoriteAccountControl: FormControl;
  @Output() currencyPrefixEvent = new EventEmitter();
  @Output() typeDestinationEvent = new EventEmitter();
  currencies: Currency[] = [];
  favoritesAccounts: FavoriteIbanAccount[] = [];
  showSecondContent = false;
  showFavoriteAccountsSelect = false;
  info;
  showDetails = false;

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
      .subscribe((favoritesAccounts) => {
        this.favoritesAccounts = favoritesAccounts;
      });
  }

  currencyRadioButtonChange(event: { value: Currency; checked: boolean }) {
    this.showSecondContent = true;
    this.currencyPrefixEvent.emit(event.value.currency);
  }

  accountRadioButtonChange(event: { value: string; checked: boolean }) {
    this.typeDestinationEvent.emit(event.value);
    this.showFavoriteAccountsSelect = event.value === '1';
    if (event.value === '2') {
      this.showDetails = true;
      this.openModal(this.info);

    } else {
      this.showDetails = false;
    }
  }

  openModal(info) {
    const modal = this.modalService.open(
      {
        component: ModalAddIbanComponent,
        title: 'Añadir cuenta IBAN',
        data: {info}
      },
      {
        width: 380,
        height: 584,
        disableClose: false,
        panelClass: 'add-account-panel',
      },
      1
    );

    this.modalService.addAccountChange.subscribe(info => {
      console.log(info);
      this.info = info;
      this.favoriteAccountControl.setValue(info);
    });
  }
}
