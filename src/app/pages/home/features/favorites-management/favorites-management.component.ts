import {Component, OnInit} from '@angular/core';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';
import {TableHeadersModel} from '../../../../shared/models/table-headers.model';
import {FavoritesManagementService} from './favorites-management.service';
import {AccountsFavoriteManagement} from '../../../../shared/models/accounts-favorite-management';
import {ModalService} from '../../../../core/services/modal.service';
import {IbanAccountsService} from './iban-accounts/iban-accounts.service';
import {FavoritesPaymentsService} from './favorites-payments/favorites-payments.service';
import {AutomaticsService} from './automatics/automatics.service';

@Component({
  selector: 'app-favorites-management',
  templateUrl: './favorites-management.component.html',
  styleUrls: ['./favorites-management.component.scss']
})
export class FavoritesManagementComponent implements OnInit {

  accounts: AccountsFavoriteManagement[] = [];
  tabId = 1;
  responseMessage: string;
  tableHeaders: TableHeadersModel[];
  tabs = [
    {id: 1, name: 'Cuentas IBAN'},
    {id: 2, name: 'Pagos favoritos'},
    {id: 3, name: 'Automáticos'}
  ];
  showTemplate: string;
  showContent: boolean;
  buttonText = 'Añadir cuenta IBAN';

  constructor(private toastService: CredixToastService,
              private router: Router,
              private favoriteManagementService: FavoritesManagementService,
              private modalService: ModalService,
              private ibanService: IbanAccountsService,
              private favoriteService: FavoritesPaymentsService,
              private automaticsService: AutomaticsService) {
    this.showTemplate = 'favorite-management';
  }

  ngOnInit(): void {
    this.showContent = false;
    this.tableHeaders = [
      {label: 'Cuentas guardadas', width: '276px'},
      {label: 'Detalle de la cuenta', width: 'auto'}
    ];
    this.initServicesEngine(1);
    this.buttonCMS(1);
    this.getIsAdded();
  }

  getDetailFavorite(accountEvent) {
    if (accountEvent.publicServiceCode !== undefined) {
      // tslint:disable-next-line:max-line-length
      this.favoriteManagementService.emitFavoritesPaymentsData(accountEvent.name, accountEvent.account, accountEvent.publicServiceName, accountEvent.publicServiceProvider, accountEvent.publicServiceAccessKeyDescription, accountEvent.publicServiceId);
    }

    if (accountEvent.IdAccountFavorite !== undefined) {
      this.favoriteManagementService.emitIbanAccountData(accountEvent.name, accountEvent.account, accountEvent.IdAccountFavorite);
    }

    if (accountEvent.id !== undefined) {
      // tslint:disable-next-line:max-line-length
      this.favoriteManagementService.emitAutomaticsPaymentData(accountEvent.account, accountEvent.name, accountEvent.id, accountEvent.maxAmount, accountEvent.periodicityDescription, accountEvent.startDate, accountEvent.key);
    }
  }

  tabSelected(tab) {
    this.tabId = tab.id;
    this.buttonCMS(tab.id);
    switch (tab.id) {
      case 1:
        this.router.navigate(['home/favorites-management/iban-accounts']);
        this.initServicesEngine(1);
        break;
      case 2:
        this.router.navigate(['home/favorites-management/favorites-payments']);
        this.tableHeaders = [
          {label: 'Pagos guardados', width: '276px'},
          {label: 'Detalle del pago', width: 'auto'}
        ];
        this.initServicesEngine(2);
        break;
      case 3:
        this.router.navigate(['home/favorites-management/automatics']);
        this.initServicesEngine(3);
        break;
    }
  }

  initServicesEngine(tabId: number) {
    switch (tabId) {
      case 1:
        this.getFavoritesIban();
        this.accounts = [];
        break;
      case 2:
        this.getPublicService();
        this.accounts = [];
        break;
      case 3:
        this.getSchedulePayment();
        this.accounts = [];
        break;
    }
  }

  buttonCMS(tabId: number) {
    switch (tabId) {
      case 1:
        this.buttonText = 'Añadir cuenta IBAN';
        break;
      case 2:
        this.buttonText = 'Añadir pago favorito';
        break;
      case 3:
        this.buttonText = 'Añadir pago automático';
        break;
    }
  }

  deleteButtonByTabId(tabId: number) {
    switch (tabId) {
      case 1:
        this.modalService.confirmationPopup('¿Desea eliminar esta cuenta IBAN?', '', 380, 197)
          .subscribe((response) => {
            if (response) {
              this.favoriteManagementService.emitDeleteIbanAccount(true);
            }
          });
        break;
      case 2:
        this.modalService.confirmationPopup('¿Desea eliminar este pago favorito?', '', 380, 197)
          .subscribe((response) => {
            if (response) {
              this.favoriteManagementService.emitDeleteFavorites(true);
            }
          });
        break;
      case 3:
        this.modalService.confirmationPopup('¿Desea eliminar este pago favorito?', '', 380, 197)
          .subscribe((response) => {
            if (response) {
              this.favoriteManagementService.emitDeleteAutomatics(true);
            }
          });
        break;
    }
  }

  getIsAdded() {
    this.ibanService.isAdded.subscribe((response) => {
      if (response) {
        this.getFavoritesIban();
      }
    });

    this.favoriteService.isAdded.subscribe((response) => {
      if (response) {
        this.getPublicService();
      }
    });

    this.automaticsService.isAdded.subscribe((response) => {
      if (response) {
        this.getSchedulePayment();
      }
    });
  }

  addButtonRedirect(tabId: number) {
    switch (tabId) {
      case 1:
        this.showTemplate = 'add-iban';
        break;
      case 2:
        this.showTemplate = 'add-favorites';
        break;
      case 3:
        this.showTemplate = 'add-automatics';
        break;
    }
  }

  changeTemplate(event) {
    this.showTemplate = event;
    switch (this.tabId) {
      case 1:
        this.router.navigate(['home/favorites-management/iban-accounts']);
        break;
      case 2:
        this.router.navigate(['home/favorites-management/favorites-payments']);
        break;
      case 3:
        this.router.navigate(['home/favorites-management/automatics']);
        break;

    }
  }

  getFavoritesIban() {
    this.favoriteManagementService.getAllAccountIbanFavoriteByUser()
      .subscribe((response) => {
        if (response.length > 0) {
          for (const values of response) {
            this.accounts.push({
              name: values.aliasName,
              account: values.ibanAccount,
              IdAccountFavorite: values.IdAccountFavorite,
            });
          }
          this.showContent = true;
          this.responseMessage = undefined;
        } else {
          this.responseMessage = 'No tiene cuentas IBAN favoritas en este momento.';
          this.showContent = false;
        }
      });
  }

  getPublicService() {
    this.favoriteManagementService.getAllFavoritePublicServiceByUser()
      .subscribe((response) => {
        if (response.length > 0) {
          for (const values of response) {
            this.accounts.push({
              name: values.publicServiceFavoriteName,
              account: values.accountNumber,
              publicServiceName: values.publicServiceName,
              publicServiceProvider: values.publicServiceProvider,
              publicServiceAccessKeyDescription: values.publicServiceAccessKeyDescription,
              publicServiceCode: values.publicServiceCode,
              publicServiceId: values.publicServiceId
            });
          }
          this.showContent = true;
          this.responseMessage = undefined;
        } else {
          this.responseMessage = 'No tiene pagos favoritos en este momento.';
          this.showContent = false;
        }
      });
  }

  getSchedulePayment() {
    this.favoriteManagementService.getAllSchedulersPayment()
      .subscribe((response) => {
        if (response.length > 0) {
          for (const values of response) {
            this.accounts.push({
              name: values.alias,
              account: values.publicServiceDescription,
              id: values.id,
              maxAmount: values.maxAmount,
              periodicityDescription: values.periodicityDescription,
              startDate: values.startDate,
              key: values.key
            });
          }
          this.showContent = true;
          this.responseMessage = undefined;
        } else {
          this.responseMessage = 'No tiene pagos automáticos en este momento.';
          this.showContent = false;
        }
      });
  }
}
