import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FavoritesManagementService} from '../favorites-management.service';
import {IbanAccountsService} from './iban-accounts.service';
import {FavoriteIbanAccount} from '../../../../../shared/models/favorite-iban-account';

@Component({
  selector: 'app-iban-accounts',
  templateUrl: './iban-accounts.component.html',
  styleUrls: ['./iban-accounts.component.scss']
})
export class IbanAccountsComponent implements OnInit, AfterViewInit {
  ibanAccountDetailControl: FormControl = new FormControl(null);
  data: FavoriteIbanAccount;
  errorMessage: string;
  deleted = false;

  constructor(private favoritesManagementService: FavoritesManagementService,
              private ibanAccountsService: IbanAccountsService) {
  }

  ngOnInit(): void {
    this.getIbanAccountDetail();
  }

  ngAfterViewInit() {
    this.getUpdateAlert();
    this.getDeletedSuccess();
    this.ibanAccountDetailChanged();
  }

  getIbanAccountDetail() {
    this.favoritesManagementService.ibanAccount.subscribe((response) => {
      this.data = response;
      this.deleted = false;
      this.ibanAccountDetailControl.setValue(this.data?.aliasName, {emitEvent: false});
      this.ibanAccountDetailControl.markAsPristine();
    });
  }

  getUpdateAlert() {
    this.favoritesManagementService.confirmUpdate.subscribe(response => {
      if (response.confirm && this.data.IdAccountFavorite) {
        this.setUpdateIban(this.data.IdAccountFavorite, this.ibanAccountDetailControl.value);
      }
    });
  }

  setUpdateIban(ibanId: number, alias: string) {
    this.ibanAccountsService.updateIbanAccount(ibanId, alias).subscribe((response) => {
      if (response.type === 'success') {
        this.favoritesManagementService.emitUpdateSuccessAlert();
      } else {
        this.errorMessage = response.message;
        this.ibanAccountDetailControl.setErrors({invalid: true});
      }
    });
  }

  ibanAccountDetailChanged() {
    this.ibanAccountDetailControl.valueChanges.subscribe(() => {
      if (this.ibanAccountDetailControl.dirty) {
        this.favoritesManagementService.updating();
      }
    });
  }

  getDeletedSuccess() {
    this.favoritesManagementService.deleted.subscribe((response) => {
      this.deleted = response.iban;
    });
  }


}
