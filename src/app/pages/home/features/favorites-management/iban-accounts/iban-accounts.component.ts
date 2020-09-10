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

  getDeleteAlert() {
    this.favoritesManagementService.deleteIbanAccount.subscribe((response) => {
      if (response && this.data.IdAccountFavorite !== undefined) {
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
    console.log(event);
    this.ibanAccountDetailInput.valueChanges.subscribe((value) => {
      this.favoritesManagementService.updating();
      this.isUpdating = this.ibanAccountDetailInput.valid;
    });
  }
}
