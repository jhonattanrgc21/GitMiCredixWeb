import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Currency} from '../../../../../shared/models/currency';
import {SendMoneyService} from '../send-money.service';
import {FavoriteIbanAccount} from '../../../../../shared/models/favorite-iban-account';
import {ModalService} from '../../../../../core/services/modal.service';
import {ModalAddIbanComponent} from './modal-add-iban/modal-add-iban.component';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {GlobalApiService} from '../../../../../core/services/global-api.service';


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
  stepTag1: string;
  stepTag3: string;
  stepOpt3: string;
  stepLink: string;
  stepTag2: string;
  stepTag4: string;
  stepSubt3: string;
  stepOpt4: string;
  stepSubt2: string;

  constructor(
    private globalApiService: GlobalApiService,
    private sendMoneyService: SendMoneyService,
    private modalService: ModalService,
    private tagsService: TagsService
  ) {
  }

  ngOnInit(): void {
    this.getCurrencies();
    this.getFavoritesAccounts();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Enviar dinero').tags)
    );
  }

  getCurrencies() {
    this.globalApiService.getCurrencies().subscribe((currencies) => {
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
    if (event.value === '1') {
      this.checked1 = event.checked;
    } else {
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

  getTags(tags: Tag[]) {
    this.stepTag1 = tags.find(tag => tag.description === 'enviardinero.stepper1.tag1')?.value;
    this.stepTag3 = tags.find(tag => tag.description === 'enviardinero.stepper1.tag3')?.value;
    this.stepOpt3 = tags.find(tag => tag.description === 'enviardinero.stepper1.option3')?.value;
    this.stepLink = tags.find(tag => tag.description === 'enviardinero.stepper1.link')?.value;
    this.stepTag4 = tags.find(tag => tag.description === 'enviardinero.stepper1.tag4')?.value;
    this.stepTag2 = tags.find(tag => tag.description === 'enviardinero.stepper1.tag2')?.value;
    this.stepSubt3 = tags.find(tag => tag.description === 'enviardinero.stepper1.subtitle3')?.value;
    this.stepOpt4 = tags.find(tag => tag.description === 'enviardinero.stepper1.option4')?.value;
    this.stepSubt2 = tags.find(tag => tag.description === 'enviardinero.stepper1.subtitle2')?.value;
  }
}
