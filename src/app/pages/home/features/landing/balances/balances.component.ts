import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StorageService} from '../../../../../core/services/storage.service';
import {Card} from '../../../../../shared/models/card.model';
import {ConvertStringAmountToNumber} from '../../../../../shared/utils';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {AccountSummary} from '../../../../../shared/models/account-summary';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';
import {IbanAccount} from '../../../../../shared/models/iban-account';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit, OnChanges {
  @Input() accountSummary: AccountSummary;
  @Input() balancesTag = {
    creditLimitTag: 'Límite de crédito',
    consumedTag: 'Consumido',
    availableTag: 'Disponible',
    increaseCreditLimitTag: 'Aumentar límite',
    ibanAccountsTag: 'Cuentas IBAN',
    colonesTag: 'Colones',
    dollarsTag: 'Dólares',
    colonesIbanCopiedTag: 'Cuenta IBAN en colones copiada',
    dollarsIbanCopiedTag: 'Cuenta IBAN en dólares copiada',
  };
  @Output() cardChanged = new EventEmitter<number>();
  cardFormControl = new FormControl(null, []);
  cards: Card[];
  consumed: number;
  limit: number;
  available: number;
  prefix = '₡';
  isCopyingColonesIban = false;
  isCopyingDollarsIban = false;
  colonesIbanAccount: IbanAccount;
  dollarsIbanAccount: IbanAccount;

  constructor(private storageService: StorageService,
              private toastService: CredixToastService,
              public globalService: GlobalRequestsService) {
    this.cards = this.storageService.getCurrentCards();
    this.cardFormControl.setValue(this.cards.find(card => card.category === 'Principal'));
  }

  ngOnInit(): void {
    this.onCardChanged();
    this.getIbanAccounts();
  }

  onCardChanged() {
    this.cardFormControl.valueChanges.subscribe(card => {
      this.cardChanged.emit(card.cardId);
    });
  }

  formatPrincipalCard(value: string): string {
    return `${value.substr(value.length - 8, 4)} ${value.substr(value.length - 4, value.length)}`;
  }

  copyIbanAccount(text: string, crcId: 188 | 840) {
    crcId === 188 ? this.isCopyingColonesIban = true : this.isCopyingDollarsIban = true;
    this.toastService.show({text, type: 'success'});
    setTimeout(() => crcId === 188 ? this.isCopyingColonesIban = false : this.isCopyingDollarsIban = false, 3000);
  }

  getIbanAccounts() {
    this.globalService.getIbanAccounts().subscribe(ibanAccounts => {
      this.colonesIbanAccount = ibanAccounts[0];
      this.dollarsIbanAccount = ibanAccounts[1];
      console.log(ibanAccounts);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.accountSummary) {
      this.limit = ConvertStringAmountToNumber(this.accountSummary.limit);
      this.available = ConvertStringAmountToNumber(this.accountSummary.available);
      this.consumed = ConvertStringAmountToNumber(this.accountSummary.consumed);
    }
  }
}
