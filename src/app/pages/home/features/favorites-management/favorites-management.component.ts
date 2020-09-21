import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';
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
  accounts: AccountsFavoriteManagement[] = [];
  tableHeaders = [
    {label: 'Cuentas guardadas', width: '276px'},
    {label: 'Detalle de la cuenta', width: 'auto'}
  ];
  tabs = [
    {id: 1, name: 'Cuentas IBAN'},
    {id: 2, name: 'Pagos favoritos'},
    {id: 3, name: 'Automáticos'}
  ];
  tabId = 1;
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
  }

  ngOnInit(): void {
    this.getFavoritesIban();
  }

  ngAfterViewInit() {
    this.getIsUpdating();
  }

  getDetailFavorite(option) {
    this.optionSelected = this.tabId === 1 ? option.IdAccountFavorite : this.tabId === 2 ? option.publicServiceFavoriteId : option.id;

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
        this.tableHeaders[0].label = 'Cuentas guardadas';
        this.tableHeaders[1].label = 'Detalle de la cuenta';
        break;
      case 2:
        this.router.navigate(['home/favorites-management/favorites-payments']);
        this.tableHeaders[0].label = 'Pagos guardados';
        this.tableHeaders[1].label = 'Detalle del pago';
        break;
      case 3:
        this.router.navigate(['home/favorites-management/automatics']);
        this.tableHeaders[0].label = 'Cuentas guardadas';
        this.tableHeaders[1].label = 'Detalle de la cuenta';
        break;
    }

  }

  add(tabId: number) {
    switch (tabId) {
      case 1:
        this.router.navigate(['/home/favorites-management/new-account']);
        break;
      case 2:
        this.router.navigate(['/home/favorites-management/new-favorite']);
        break;
      case 3:
        this.router.navigate(['/home/favorites-management/new-automatics']);
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

  delete(tabId: number) {
    switch (tabId) {
      case 1:
        this.modalService.confirmationPopup('¿Desea eliminar esta cuenta IBAN?').subscribe((confirm) => {
          if (confirm) {
            this.favoriteManagementService.setDeleteIbanAccount(this.optionSelected)
              .subscribe((response) => {
                if (response.message === 'Operación exitosa') {
                  this.accounts = [];
                  this.getFavoritesIban();
                }
              });
          }
        });
        break;
      case 2:
        this.modalService.confirmationPopup('¿Desea eliminar este pago favorito?')
          .subscribe((confirm) => {
            if (confirm) {
              this.favoriteManagementService.setDeletePublicService(this.optionSelected)
                .subscribe((response) => {
                  if (response.message === 'Operación exitosa') {
                    this.accounts = [];
                    this.getPublicService();
                  }
                });
            }
          });
        break;
      case 3:
        this.modalService.confirmationPopup('¿Desea eliminar este pago favorito?').subscribe((confirm) => {
          if (confirm) {
            this.favoriteManagementService.setDeleteAutomatics(this.optionSelected).subscribe((response) => {
              if (response.message === 'Operación exitosa') {
                this.accounts = [];
                this.getSchedulePayment();
              }
            });
          }
        });
        break;
    }
  }

  getIsUpdating() {
    // check if module son alert to activate the button of save
    this.favoriteManagementService.update.subscribe(() => {
      this.updating = true;
    });

    this.favoriteManagementService.updateSuccess.subscribe(() => {
      this.accounts = [];
      switch (this.tabId) {
        case 1:
          this.getFavoritesIban();
          break;
        case 2:
          this.getPublicService();
          break;
        case 3:
          this.getSchedulePayment();
          break;
      }
    });
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
