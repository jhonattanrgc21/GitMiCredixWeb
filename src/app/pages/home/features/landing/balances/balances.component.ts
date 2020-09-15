import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StorageService} from '../../../../../core/services/storage.service';
import {Card} from '../../../../../shared/models/card.model';
import {ConvertStringAmountToNumber} from '../../../../../shared/utils';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {AccountSummary} from '../../../../../shared/models/account-summary';
import {GlobalRequestsService} from '../../../../../core/services/global-requests.service';
import {IbanAccount} from '../../../../../shared/models/iban-account';
import {ModalService} from '../../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';

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
  questionTag: string;

  constructor(private storageService: StorageService,
              private toastService: CredixToastService,
              private modalService: ModalService,
              private tagsService: TagsService,
              public globalService: GlobalRequestsService,
              private router: Router) {
    this.cards = this.storageService.getCurrentCards();
    this.cardFormControl.setValue(this.cards.find(card => card.category === 'Principal'));
  }

  ngOnInit(): void {
    this.onCardChanged();
    this.getIbanAccounts();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Aumentar límite de crédito').tags));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.accountSummary) {
      this.limit = ConvertStringAmountToNumber(this.accountSummary.limit);
      this.available = ConvertStringAmountToNumber(this.accountSummary.available);
      this.consumed = ConvertStringAmountToNumber(this.accountSummary.consumed);
    }
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
      if (ibanAccounts.length > 0) {
        this.colonesIbanAccount = ibanAccounts[0];
        this.dollarsIbanAccount = ibanAccounts[1];
      }
    });
  }

  openIncreaseLimitModal() {
    this.modalService.confirmationPopup(this.questionTag || '¿Desea solicitar el aumento de límite de crédito?').subscribe(response => {
      if (response) {
        this.router.navigate(['/home/increase-limit']);
      }
    });
  }

  getTags(tags: Tag[]) {
    this.questionTag = tags.find(tag => tag.description === 'aumento.question"').value;
  }
}
