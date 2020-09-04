import {Component, OnInit} from '@angular/core';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';
import {TableHeadersModel} from '../../../../shared/models/table-headers.model';
import {FavoritesManagementService} from './favorites-management.service';
import {AccountsFavoriteManagement} from '../../../../shared/models/accounts-favorite-management';

@Component({
  selector: 'app-favorites-management',
  templateUrl: './favorites-management.component.html',
  styleUrls: ['./favorites-management.component.scss']
})
export class FavoritesManagementComponent implements OnInit {

  accounts: AccountsFavoriteManagement[];
  responseMessage: string;
  tableHeaders: TableHeadersModel[];
  tabs = [
    {id: 1, name: 'Cuentas IBAN'},
    {id: 2, name: 'Pagos favoritos'},
    {id: 3, name: 'Automáticos'}
  ];

  constructor(private toastService: CredixToastService,
              private router: Router,
              private favoriteManagementService: FavoritesManagementService) {
  }

  ngOnInit(): void {
    this.tableHeaders = [
      {label: 'Cuentas guardadas', width: '276px'},
      {label: 'Detalle de la cuenta', width: 'auto'}
    ];
    this.getFavoritesIban();
  }

  getDetailFavorite(accountEvent) {
    console.log(accountEvent);
  }

  tabSelected(tab) {
    switch (tab.id) {
      case 1:
        this.router.navigate(['home/favorites-management/iban-accounts']);
        break;
      case 2:
        this.router.navigate(['home/favorites-management/favorites-payments']);
        this.tableHeaders = [
          {label: 'Pagos guardados', width: '276px'},
          {label: 'Detalle del pago', width: 'auto'}
        ];
        this.favoriteManagementService.emitTabId(2);
        break;
      case 3:
        this.router.navigate(['home/favorites-management/automatics']);
        this.favoriteManagementService.emitTabId(3);
        break;
    }
  }

  initServicesEngine() {
    this.favoriteManagementService.tabId.subscribe(tab => {
      switch (tab.id) {
        case 1:
          this.getFavoritesIban();
          break;
        case 2:
          this.getPublicService();
          break;
        case 3:
          break;
      }
    });
  }

  getFavoritesIban() {
    this.favoriteManagementService.getAllAccountIbanFavoriteByUser()
      .subscribe((response) => {
        if (response.length > 0) {
          response.forEach(values => {
            this.accounts = [
              {
                name: values.aliasName,
                account: values.ibanAccount,
                IdAccountFavorite: values.IdAccountFavorite,
              }
            ];
          });
        } else {
          this.responseMessage = 'No tiene cuentas IBAN favoritas en este momento.';
        }
      });
  }

  getPublicService() {
    this.favoriteManagementService.getAllFavoritePublicServiceByUser()
      .subscribe((response) => {
        if (response.length > 0) {
          response.forEach(values => {
            this.accounts = [
              {
                name: values.publicServiceFavoriteName,
                account: values.accountNumber,
                publicServiceName: values.publicServiceName,
                publicServiceProvider: values.publicServiceProvider,
                publicServiceAccessKeyDescription: values.publicServiceAccessKeyDescription
              }
            ];
          });
        }
      });
  }
}
