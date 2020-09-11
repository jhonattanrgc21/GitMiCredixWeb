import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FavoritesManagementService} from '../favorites-management.service';
import {IbanAccountsService} from './iban-accounts.service';

@Component({
  selector: 'app-iban-accounts',
  templateUrl: './iban-accounts.component.html',
  styleUrls: ['./iban-accounts.component.scss']
})
export class IbanAccountsComponent implements OnInit, AfterViewInit {

  showContent = false;
  data: { ibanAccount: string; IdAccountFavorite: number; };
  ibanAccountDetailInput: FormControl = new FormControl(null);
  isUpdating = false;

  constructor(private favoritesManagementService: FavoritesManagementService,
              private ibanAccountsService: IbanAccountsService) {
    this.data = {
      ibanAccount: '',
      IdAccountFavorite: 0
    };
  }

  ngOnInit(): void {
    this.getIbanAccountDetail();
  }

  ngAfterViewInit() {
    this.getDeleteAlert();
    this.getUpdateAlert();
  }

  getIbanAccountDetail() {
    this.favoritesManagementService.ibanAccountData.subscribe(response => {
      this.data = {
        ibanAccount: response.ibanAccount,
        IdAccountFavorite: response.IdAccountFavorite
      };
      this.ibanAccountDetailInput.setValue(response.aliasName);
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
      console.log(response);
    });
  }

  getDeleteAlert() {
    this.favoritesManagementService.deleteIbanAccount.subscribe((response) => {
      if (response.del && this.data.IdAccountFavorite !== undefined) {
        this.setDeleteIban(this.data.IdAccountFavorite);
      }
    });
  }

  setDeleteIban(ibanId: number) {
    this.ibanAccountsService.setDeleteIbanAccount(ibanId).subscribe((response) => {
      if (response.message === 'Operación exitosa') {
        this.ibanAccountsService.emitIbanIsAddOrDeleted(false, true);
      }
    });
  }

  updating(event) {
    if (event.key !== '' && event.code !== '') {
      this.ibanAccountDetailInput.valueChanges.subscribe((value) => {
        this.favoritesManagementService.updating();
        this.isUpdating = this.ibanAccountDetailInput.valid;
      });
    }
  }
}
