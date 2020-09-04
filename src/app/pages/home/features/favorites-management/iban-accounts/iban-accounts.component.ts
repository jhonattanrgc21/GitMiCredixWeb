import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {IbanAccountsService} from './iban-accounts.service';
import {AccountIbanFavoriteList} from '../../../../../shared/models/account-iban-favorite-list';

@Component({
  selector: 'app-iban-accounts',
  templateUrl: './iban-accounts.component.html',
  styleUrls: ['./iban-accounts.component.scss']
})
export class IbanAccountsComponent implements OnInit {

  ibanFavoritesAccounts: AccountIbanFavoriteList[];
  responseMessage: string;
  ibanDetailSelect: boolean;
  alias: string;
  accountNumber = 'CR04010200007369705450';

  tableHeaders = [
    {label: 'Cuentas guardadas', width: '276px'},
    {label: 'Detalle de la cuenta', width: 'auto'}
  ];

  favoriteName: FormControl = new FormControl(null);

  constructor(private router: Router,
              private ibanAccountsService: IbanAccountsService) {
  }

  ngOnInit(): void {
    this.getIbanAccounts();
    this.ibanDetailSelect = false;
  }

  addIbanAccount() {
    this.router.navigate(['./add-iban-account']);
  }

  getIbanAccountDetail(event) {

  }

  save() {

  }

  delete() {

  }

  getIbanAccounts() {
    this.ibanAccountsService.getAllAccountIbanFavoriteByUser()
      .subscribe((response) => {
        if (Array.isArray(response) && response !== [] || typeof response !== 'string') {
          this.ibanFavoritesAccounts = response;
        } else if (typeof response === 'string' && response === 'No existen datos.') {
          this.responseMessage = response;
        } else {
          return false;
        }
      });
  }
}
