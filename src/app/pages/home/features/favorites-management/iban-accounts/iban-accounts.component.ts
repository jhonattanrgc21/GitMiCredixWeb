import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FavoritesManagementService} from '../favorites-management.service';

@Component({
  selector: 'app-iban-accounts',
  templateUrl: './iban-accounts.component.html',
  styleUrls: ['./iban-accounts.component.scss']
})
export class IbanAccountsComponent implements OnInit {

  showContent = false;
  data: { ibanAccount: string; IdAccountFavorite: number; };
  ibanAccountDetailInput: FormControl = new FormControl({value: null, disabled: true});

  constructor(private favoritesManagementService: FavoritesManagementService) {
  }

  ngOnInit(): void {

  }

  getIbanAccountDetail() {
    this.favoritesManagementService.ibanAccountData.subscribe(response => {
      this.showContent = !this.showContent;
      this.data = {
        ibanAccount: response.ibanAccount,
        IdAccountFavorite: response.IdAccountFavorite
      };
      this.ibanAccountDetailInput.setValue(response.aliasName);
    });
  }
}
