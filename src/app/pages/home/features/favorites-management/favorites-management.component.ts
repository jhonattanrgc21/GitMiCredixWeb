import {AfterViewInit, Component, OnInit} from '@angular/core';
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
export class FavoritesManagementComponent implements OnInit, AfterViewInit {
  optionsScroll = {autoHide: false, scrollbarMinSize: 100};
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
  showContent = false;
  buttonText = 'Añadir cuenta IBAN';
  updating = false;
  empty = false;
  optionSelected = 0;

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
    this.tableHeaders = [
      {label: 'Cuentas guardadas', width: '276px'},
      {label: 'Detalle de la cuenta', width: 'auto'}
    ];
    this.setButtonText(1);
    this.getFavoritesIban();
  }

  ngAfterViewInit() {
    this.getIsAddedAndDeletedOrUpdating();
  }

  getDetailFavorite(option) {
    this.optionSelected = option.IdAccountFavorite;
    if (option.publicServiceCode !== undefined) {
      // tslint:disable-next-line:max-line-length
      this.favoriteManagementService.emitFavoritesPaymentsData(option.name, option.account, option.publicServiceName, option.publicServiceProvider, option.publicServiceAccessKeyDescription, option.publicServiceId, option.publicServiceFavoriteId, option.accountId, option.publicServiceAccessKeyId, option.publicServiceEnterpriseDescription);
    }

    if (option.IdAccountFavorite !== undefined) {
      this.favoriteManagementService.emitIbanAccountData(option.name, option.account, option.IdAccountFavorite);
    }

    if (option.id !== undefined) {
      // tslint:disable-next-line:max-line-length
      this.favoriteManagementService.emitAutomaticsPaymentData(option.account, option.name, option.id, option.maxAmount, option.periodicityDescription, option.startDate, option.key);
    }
  }

  tabSelected(tab) {
    this.tabId = tab.id;
    this.empty = false;
    this.setButtonText(tab.id);
    this.initServicesEngine(tab.id);

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
        break;
      case 3:
        this.router.navigate(['home/favorites-management/automatics']);
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

  setButtonText(tabId: number) {
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

  delete(tabId: number) {
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

  update(tabId: number) {
    switch (tabId) {
      case 1:
        this.favoriteManagementService.emitConfirmUpdate(true);
        break;
      case 2:
        this.favoriteManagementService.emitConfirmUpdate(true);
        break;
      case 3:
        this.favoriteManagementService.emitConfirmUpdate(true);
        break;
    }
  }

  getIsAddedAndDeletedOrUpdating() {
    // try in the similar method if deleted or added
    this.ibanService.isAddedOrDelete.subscribe((response) => {
      if (response.added || response.del) {
        this.accounts = [];
        this.getFavoritesIban();
      }
    });
    this.favoriteService.isAddedOrDelete.subscribe((response) => {
      if (response.added || response.del) {
        this.accounts = [];
        this.getPublicService();
      }
    });

    this.automaticsService.isAddedOrDelete.subscribe((response) => {
      if (response.added || response.del) {
        this.accounts = [];
        this.getSchedulePayment();
      }
    });
    // check if module son alert to activate the button of save
    this.favoriteManagementService.update.subscribe(() => {
      this.updating = true;
    });


    this.favoriteManagementService.updateSuccess.subscribe(() => {

      switch (this.tabId) {
        case 1:
          this.accounts = [];
          this.getFavoritesIban();
          break;
        case 2:
          this.accounts = [];
          this.getPublicService();
          break;
        case 3:
          this.accounts = [];
          this.getSchedulePayment();
          break;
      }
    });
  }

  add(tabId: number) {
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
  }

  getFavoritesIban() {
    this.favoriteManagementService.getAllAccountIbanFavoriteByUser()
      .subscribe((response) => {
        this.empty = response.length === 0;

        if (!this.empty) {
          for (const values of response) {
            this.accounts.push({
              name: values.aliasName,
              account: values.ibanAccount,
              IdAccountFavorite: values.IdAccountFavorite,
            });
          }
        }
      });
  }

  getPublicService() {
    this.favoriteManagementService.getAllFavoritePublicServiceByUser()
      .subscribe((response) => {
        this.empty = response.length === 0;

        if (!this.empty) {
          for (const values of response) {
            this.accounts.push({
              name: values.publicServiceFavoriteName,
              account: values.accountNumber,
              publicServiceName: values.publicServiceName,
              publicServiceProvider: values.publicServiceProvider,
              publicServiceAccessKeyDescription: values.publicServiceAccessKeyDescription,
              publicServiceCode: values.publicServiceCode,
              publicServiceId: values.publicServiceId,
              publicServiceFavoriteId: values.publicServiceFavoriteId,
              accountId: values.accountId,
              publicServiceAccessKeyId: values.publicServiceAccessKeyId,
              publicServiceEnterpriseDescription: values.publicServiceEnterpriseDescription
            });
          }
        }
      });
  }

  getSchedulePayment() {
    this.favoriteManagementService.getAllSchedulersPayment()
      .subscribe((response) => {
        this.empty = response.length === 0;

        if (!this.empty) {
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
        }
      });
  }
}
