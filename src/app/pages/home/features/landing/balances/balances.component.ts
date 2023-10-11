import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StorageService} from '../../../../../core/services/storage.service';
import {Card} from '../../../../../shared/models/card';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {AccountSummary} from '../../../../../shared/models/account-summary';
import {IbanAccount} from '../../../../../shared/models/iban-account';
import {ModalService} from '../../../../../core/services/modal.service';
import {Router} from '@angular/router';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {AccountApiService} from '../../../../../core/services/account-api.service';
import { ConvertStringAmountToNumber } from 'src/app/shared/utils';
import { Subscription } from 'rxjs';
import { HomeSidebarService } from '../../../home-sidebar/home-sidebar.service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.scss']
})
export class BalancesComponent implements OnInit {
  @Input() accountSummary: AccountSummary;
  @Input() balancesTag = {
    personalCreditAvailable: 'Disponible crédito personal',
    linkapplyforcredit: 'Solicitar crédito',
    creditLimitTag: 'Límite de crédito',
    consumedTag: 'Consumido*',
    availableTag: 'Disponible*',
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
  prefix = '₡';
  isCopyingColonesIban = false;
  isCopyingDollarsIban = false;
  colonesIbanAccount: IbanAccount;
  dollarsIbanAccount: IbanAccount;
  questionTag: string;
  disablelinkapplyforcredit: boolean = false;
  isEnablePersonalCredit: boolean;
  enablePersonalCreditSubscription: Subscription;

  constructor(private storageService: StorageService,
              private toastService: CredixToastService,
              private modalService: ModalService,
              private tagsService: TagsService,
              private accountApiService: AccountApiService,
              private router: Router,
              private homeSidebarService: HomeSidebarService) {
    this.cards = this.storageService.getCurrentCards();
    this.cardFormControl.setValue(this.cards.find(card => card.category === 'Principal'));
  }

  ngOnInit(): void {
    this.enablePersonalCreditSubscription = this.homeSidebarService.enableOptionPersonalCredit$.subscribe(isEnable => this.isEnablePersonalCredit = isEnable);
    const personalcreditavailable = ConvertStringAmountToNumber(this.accountSummary.personalcreditavailable);
    if(personalcreditavailable <= 100000){
      this.disablelinkapplyforcredit = true;
    }

    this.onCardChanged();
    this.getIbanAccounts();
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Aumentar límite de crédito').tags));
  }

  onCardChanged() {
    this.cardFormControl.valueChanges.subscribe(card => {
      this.cardChanged.emit(card.cardId);
    });
  }

  copyIbanAccount(text: string, crcId: 188 | 840) {
    crcId === 188 ? this.isCopyingColonesIban = true : this.isCopyingDollarsIban = true;
    this.toastService.show({text, type: 'success'});
    setTimeout(() => crcId === 188 ? this.isCopyingColonesIban = false : this.isCopyingDollarsIban = false, 3000);
  }

  getIbanAccounts() {
    this.accountApiService.getIbanAccounts().subscribe(ibanAccounts => {
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

  openApplyforcreditModal() {
    if (!this.disablelinkapplyforcredit && this.isEnablePersonalCredit) {
      this.router.navigate(['/home/personal-credit']);
    }
  }

  getTags(tags: Tag[]) {
    this.questionTag = tags.find(tag => tag.description === 'aumento.question').value;
  }

  ngOnDestroy(): void {
    this.enablePersonalCreditSubscription.unsubscribe()
  }
}
