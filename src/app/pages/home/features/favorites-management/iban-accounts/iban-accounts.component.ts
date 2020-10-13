import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FavoritesManagementService} from '../favorites-management.service';
import {IbanAccountsService} from './iban-accounts.service';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {ToastData} from '../../../../../shared/components/credix-toast/credix-toast-config';
import {FavoriteIbanAccount} from '../../../../../shared/models/favorite-iban-account';

@Component({
  selector: 'app-iban-accounts',
  templateUrl: './iban-accounts.component.html',
  styleUrls: ['./iban-accounts.component.scss']
})
export class IbanAccountsComponent implements OnInit, AfterViewInit {

  data: FavoriteIbanAccount;
  ibanAccountDetailInput: FormControl = new FormControl(null);

  constructor(private favoritesManagementService: FavoritesManagementService,
              private ibanAccountsService: IbanAccountsService,
              private toastService: CredixToastService) {
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
      this.ibanAccountDetailInput.setValue(this.data?.aliasName, {emitEvent: false});
      this.ibanAccountDetailInput.markAsPristine();
    });
  }

  getUpdateAlert() {
    this.favoritesManagementService.confirmUpdate.subscribe((response) => {
      if (response.confirm && this.data.IdAccountFavorite !== undefined) {
        this.setUpdateIban(this.data.IdAccountFavorite, this.ibanAccountDetailInput.value);
      }
    });
  }

  setUpdateIban(ibanId: number, alias: string) {
    this.ibanAccountsService.updateIbanAccount(ibanId, alias).subscribe((response) => {
      const data: ToastData = {
        text: response.message,
        type: response.type,
      };
      this.toastService.show(data);

      if (response.message === 'Operación exitosa') {
        this.favoritesManagementService.emitUpdateSuccessAlert();
      }
    });
  }

  ibanAccountDetailChanged() {
    this.ibanAccountDetailInput.valueChanges.subscribe(() => {
      if (this.ibanAccountDetailInput.dirty) {
        this.favoritesManagementService.updating();
      }
      });
  }

  getDeletedSuccess() {
    this.favoritesManagementService.deleted.subscribe((response) => {
      if (response.iban) {
        this.data = null;
      }
    });
  }
}
