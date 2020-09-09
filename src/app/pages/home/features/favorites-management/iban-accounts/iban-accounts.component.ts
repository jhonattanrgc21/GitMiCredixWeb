import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FavoritesManagementService} from '../favorites-management.service';
import {IbanAccountsService} from './iban-accounts.service';

@Component({
  selector: 'app-iban-accounts',
  templateUrl: './iban-accounts.component.html',
  styleUrls: ['./iban-accounts.component.scss']
})
export class IbanAccountsComponent implements OnInit {

  showContent = false;
  data: { ibanAccount: string; IdAccountFavorite: number; };
  ibanAccountDetailInput: FormControl = new FormControl({value: null, disabled: true});

  constructor(private favoritesManagementService: FavoritesManagementService,
              private ibanAccountsService: IbanAccountsService) {
  }

  ngOnInit(): void {
    this.getIbanAccountDetail();
  }

  getIbanAccountDetail() {
    this.favoritesManagementService.ibanAccountData.subscribe(response => {
      this.showContent = !this.showContent;
      this.data = {
        ibanAccount: response.ibanAccount,
        IdAccountFavorite: response.IdAccountFavorite
      };
      this.ibanAccountDetailInput.setValue(response.aliasName);
      this.getDeleteAlert();
    });
  }

  getDeleteAlert() {
    this.favoritesManagementService.deleteIbanAccount.subscribe((response) => {
      if (response && this.data.IdAccountFavorite !== undefined) {
        this.setDeleteIban(this.data.IdAccountFavorite);
      }
    });
  }

  setDeleteIban(ibanId: number) {
    this.ibanAccountsService.setDeleteIbanAccount(ibanId).subscribe((response) => {
      console.log(response);
    });
  }
}
