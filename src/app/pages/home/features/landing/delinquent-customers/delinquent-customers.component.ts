import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StorageService} from '../../../../../core/services/storage.service';
import {Card} from '../../../../../shared/models/card';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {AccountSummary} from '../../../../../shared/models/account-summary';
import {IbanAccount} from '../../../../../shared/models/iban-account';
import {Router} from '@angular/router';
import {TagsService} from '../../../../../core/services/tags.service';
import {Tag} from '../../../../../shared/models/tag';
import {AccountApiService} from '../../../../../core/services/account-api.service';
import { ConvertStringAmountToNumber } from 'src/app/shared/utils';
import { Subscription } from 'rxjs';
import { HomeSidebarService } from '../../../home-sidebar/home-sidebar.service';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-delinquent-customers',
  templateUrl: './delinquent-customers.component.html',
  styleUrls: ['./delinquent-customers.component.scss']
})
export class DelinquentCustomersComponent implements OnInit {
  @Input() accountSummary: AccountSummary;
  faWhatsapp = faWhatsapp; // Inicializa el icono de WhatsApp
  @Input() balancesTag = {
    ibanAccountsTag: 'Cuentas IBAN',
    colonesTag: 'Colones',
    dollarsTag: 'Dólares',
    colonesIbanCopiedTag: 'Cuenta IBAN en colones copiada',
    dollarsIbanCopiedTag: 'Cuenta IBAN en dólares copiada',
  };
  cardFormControl = new FormControl(null, []);
  cards: Card[];
  prefix = '₡';
  isCopyingColonesIban = false;
  isCopyingDollarsIban = false;
  colonesIbanAccount: IbanAccount;
  dollarsIbanAccount: IbanAccount;

  constructor(private storageService: StorageService,
              private toastService: CredixToastService,
              private tagsService: TagsService,
              private accountApiService: AccountApiService,
              private router: Router,
              private homeSidebarService: HomeSidebarService) {
    this.cards = this.storageService.getCurrentCards();
    this.cardFormControl.setValue(this.cards.find(card => card.category === 'Principal'));
  }

  ngOnInit(): void {

    this.getIbanAccounts();
  }


  copyIbanAccount(text: string, crcId: 188 | 840) {
    crcId === 188 ? this.isCopyingColonesIban = true : this.isCopyingDollarsIban = true;
    this.toastService.show({text, type: 'success'});
    setTimeout(() => crcId === 188 ? this.isCopyingColonesIban = false : this.isCopyingDollarsIban = false, 3000);
  }

  OpenWhatsApp() {
    const whatsappUrl = 'https://api.whatsapp.com/send?phone=50684273349&text=Hablar%20con%20un%20agente%20para%20coordinar%20mi%20pago';
    window.open(whatsappUrl, '_blank');
  }
  
  getIbanAccounts() {
    this.accountApiService.getIbanAccounts().subscribe(ibanAccounts => {
      if (ibanAccounts.length > 0) {
        this.colonesIbanAccount = ibanAccounts[0];
        this.dollarsIbanAccount = ibanAccounts[1];
      }
    });
  }

}

