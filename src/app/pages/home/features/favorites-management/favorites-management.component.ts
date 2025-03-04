import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {Router} from '@angular/router';
import {FavoritesManagementService} from './favorites-management.service';
import {AccountsFavoriteManagement} from '../../../../shared/models/accounts-favorite-management';
import {ModalService} from '../../../../core/services/modal.service';
import {AccountApiService} from '../../../../core/services/account-api.service';
import {PublicServicesApiService} from '../../../../core/services/public-services-api.service';
import {ChannelsApiService} from '../../../../core/services/channels-api.service';
import {FavoriteIbanAccount} from '../../../../shared/models/favorite-iban-account';
import {PublicServiceFavoriteByUser} from '../../../../shared/models/public-service-favorite-by-user';
import {SchedulePayments} from '../../../../shared/models/schedule-payments';
import {finalize} from 'rxjs/operators';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';
import { GlobalApiService } from 'src/app/core/services/global-api.service';

@Component({
  selector: 'app-favorites-management',
  templateUrl: './favorites-management.component.html',
  styleUrls: ['./favorites-management.component.scss']
})
export class FavoritesManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  accounts: AccountsFavoriteManagement[] = [];
  tableHeaders = [
    {label: 'Pago guardado', width: '276px'},
    {label: 'Detalle del pago', width: 'auto'}
  ];
  tabs = [
    {id: 1, name: 'Cuentas IBAN'},
    {id: 2, name: 'Pagos favoritos'},
    {id: 3, name: 'Automáticos'}
  ];
  titleTag: string;
  tabId = 1;
  buttonText = 'Añadir cuenta IBAN';
  updating = false;
  empty = false;
  optionSelected = 0;
  activeTabIndex = 0;
  tabIsChanged: boolean;

  constructor(private toastService: CredixToastService,
              private favoriteManagementService: FavoritesManagementService,
              private publicServiceApi: PublicServicesApiService,
              private accountApiService: AccountApiService,
              private channelsApiService: ChannelsApiService,
              private modalService: ModalService,
              private router: Router,
              private tagsService: TagsService,
              private cdr: ChangeDetectorRef,
            ) {
  }

  ngOnInit(): void {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>
      this.getTags(functionality.find(fun => fun.description === 'Gestionar favoritos').tags)
    );
  }

  get idParam(): number {
    return +this.router.parseUrl(this.router.url).root.children.primary.segments[3]?.path;
  }

  ngAfterViewInit() {
    this.checkIsUpdating();
    this.checkUpdateCompleted();
    this.checkUrlParam();
    this.cdr.detectChanges();
    this.favoriteManagementService.tabChanged.subscribe(() => {
      this.tabIsChanged = true;
    });
  }

  checkUrlParam() {
    this.activeTabIndex = this.idParam ? 2 : 0;
    if (this.activeTabIndex === 2) {
      this.empty = false;
      this.tabId = this.tabs[this.activeTabIndex].id;
      this.tableHeaders[0].label = 'Cuentas guardadas';
      this.tableHeaders[1].label = 'Detalle de la cuenta';
      this.getSchedulePayment();
    } else {
      this.getFavoritesIban();
    }
  }

  getDetailFavorite(option) {
    this.optionSelected = this.tabId === 1 ? option.IdAccountFavorite : this.tabId === 2 ? option.publicServiceFavoriteId : option.id;
    this.tabIsChanged = false;
    
    if (option.publicServiceFavoriteId) {
      const favoritePublicService: PublicServiceFavoriteByUser = {
        accountNumber: option.account,
        publicServiceFavoriteName: option.name,
        serviceReference: option.serviceReference,
        publicServiceCategory: option.publicServiceCategory,
        publicServiceName: option.publicServiceName,
        publicServiceAccessKeyDescription: option.publicServiceAccessKeyDescription,
        publicServiceId: option.publicServiceId,
        publicServiceEnterpriseId: option.publicServiceEnterpriseId,
        publicServiceProvider: option.publicServiceProvider,
        publicServiceProviderPrefix: option.publicServiceProviderPrefix,
        publicServiceEnterpriseDescription: option.publicServiceEnterpriseDescription,
        publicServiceAccessKeyId: option.publicServiceAccessKeyId,
        publicServiceCode: option.publicServiceCode,
        publicServiceFavoriteId: option.publicServiceFavoriteId,
        publicServiceAccessKeyType: option.publicServiceAccessKeyType,
        publicServiceEnterpriseCode: option.publicServiceEnterpriseCode,
        accountId: option.accountId
      };
      this.favoriteManagementService.emitFavoritePublicServiceData(favoritePublicService);
      this.updating = false;
    }

    if (option.IdAccountFavorite) {
      const ibanAccount: FavoriteIbanAccount = {
        aliasName: option.name,
        IdAccountFavorite: option.IdAccountFavorite,
        ibanAccount: option.account,
        ibanBank: option.ibanBank,
        identification: option.identification,
        typeIdentificacionId: option.typeIdentificacionId
      };
      this.favoriteManagementService.emitIbanAccountData(ibanAccount);
      this.updating = false;
    }

    if (option.id) {
      const schedulePayment: SchedulePayments = {
        publicServiceDescription: option.account,
        alias: option.name,
        id: option.id,
        maxAmount: option.maxAmount,
        periodicityDescription: option.periodicityDescription,
        startDate: option.startDate,
        key: option.key,
        publicServiceCategoryId: option.publicServiceCategoryId,
        publicServiceCategoryName: option.publicServiceCategoryName,
        quota: option.quota,
      };
      this.favoriteManagementService.emitSchedulePaymentData(schedulePayment);
      this.updating = false;
    }
  }

  tabSelected(tab) {
    this.tabId = tab.id;
    this.empty = false;
    this.accounts = [];
    switch (tab.id) {
      case 1:
        this.router.navigate(['home/favorites-management/iban-accounts']);
        this.tableHeaders[0].label = 'Cuentas guardadas';
        this.tableHeaders[1].label = 'Detalle del pago';
        this.getFavoritesIban();
        this.favoriteManagementService.emitIsTabChange();
        break;
      case 2:
        this.router.navigate(['home/favorites-management/favorites-payments']);
        this.tableHeaders[0].label = 'Pagos guardados';
        this.tableHeaders[1].label = 'Detalle del pago';
        this.getPublicService();
        this.favoriteManagementService.emitIsTabChange();
        break;
      case 3:
        this.router.navigate(['home/favorites-management/automatics']);
        this.tableHeaders[0].label = 'Cuentas guardadas';
        this.tableHeaders[1].label = 'Detalle del pago';
        this.getSchedulePayment();
        this.favoriteManagementService.emitIsTabChange();
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
            this.deleteIbanAccount();
          }
        });
        break;
      case 2:
        this.modalService.confirmationPopup('¿Desea eliminar este pago favorito?')
          .subscribe((confirm) => {
            if (confirm) {
              this.deleteFavoritePayment();
            }
          });
        break;
      case 3:
        this.modalService.confirmationPopup('¿Desea eliminar este pago automático?').subscribe((confirm) => {
          if (confirm) {
            this.deleteAutomatic();
          }
        });
        break;
    }
  }

  deleteIbanAccount() {
    this.favoriteManagementService.setDeleteIbanAccount(this.optionSelected).subscribe((response) => {
      if (response.type === 'success') {
        this.getFavoritesIban();
        this.favoriteManagementService.emitDeletedSuccess(true, null, null);
      }
    });
  }

  deleteFavoritePayment() {
    this.favoriteManagementService.setDeletePublicService(this.optionSelected)
      .subscribe((response) => {
        if (response.type === 'success') {
          this.getPublicService();
          this.favoriteManagementService.emitDeletedSuccess(null, true, null);
        }
      });
  }

  deleteAutomatic() {
    this.favoriteManagementService.setDeleteAutomatics(this.optionSelected)
      .subscribe((response) => {
        if (response.type === 'success') {
          this.getSchedulePayment();
          this.favoriteManagementService.emitDeletedSuccess(null, null, true);
        }
      });
  }

  checkIsUpdating() {
    this.favoriteManagementService.update.subscribe((value) => {
      this.updating = value;
    });
  }

  checkUpdateCompleted() {
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
    this.accountApiService.getAllAccountIbanFavoriteByUser()
      .subscribe((response) => {
        this.empty = response.length === 0;
        this.accounts = [];
        if (!this.empty) {
          response.forEach(values => {
            this.accounts.push({
              name: values.aliasName,
              account: values.ibanAccount,
              IdAccountFavorite: values.IdAccountFavorite,
              identification: values.identification,
              ibanBank: values.ibanBank,
              typeIdentificacionId: values.typeIdentificacionId
            });
          });
        }
      });
  }

  getPublicService() {
    this.publicServiceApi.getAllFavoritePublicServiceByUser()
      .subscribe((response) => {
        this.empty = response.length === 0;
        if (!this.empty) {
          this.accounts = [];
          response.forEach(values => {
            this.accounts.push({
              name: values.publicServiceFavoriteName,
              account: values.accountNumber,
              serviceReference: values.serviceReference,
              publicServiceCategory: values.publicServiceCategory,
              publicServiceName: values.publicServiceName,
              publicServiceAccessKeyDescription: values.publicServiceAccessKeyDescription,
              publicServiceId: values.publicServiceId,
              publicServiceEnterpriseId: values.publicServiceEnterpriseId,
              publicServiceProvider: values.publicServiceProvider,
              publicServiceProviderPrefix: values.publicServiceProviderPrefix,
              publicServiceEnterpriseDescription: values.publicServiceEnterpriseDescription,
              publicServiceAccessKeyId: values.publicServiceAccessKeyId,
              publicServiceCode: values.publicServiceCode,
              publicServiceFavoriteId: values.publicServiceFavoriteId,
              publicServiceAccessKeyType: values.publicServiceAccessKeyType,
              publicServiceEnterpriseCode: values.publicServiceEnterpriseCode,
              accountId: values.accountId
            });
          });
        }
      });
  }

  getSchedulePayment() {
    this.channelsApiService.getAllSchedulersPayment()
      .pipe(finalize(() => {
        if (this.idParam) {
          const option = this.accounts.find(acc => acc.id === this.idParam);
          this.getDetailFavorite(option);
        }
      }))
      .subscribe((response) => {
        this.empty = response.length === 0;
        this.accounts = [];
        if (!this.empty) {
          response.forEach(values => {
            this.accounts.push({
              name: values.alias,
              account: values.publicServiceDescription,
              id: values.id,
              maxAmount: values.maxAmount,
              periodicityDescription: values.periodicityDescription,
              startDate: values.startDate,
              key: values.key,
              publicServiceCategoryName: values.publicServiceCategoryName,
              publicServiceCategoryId: values.publicServiceCategoryId,
              quota: values?.quota,
            });
          });
        }
      });
  }

  getTags(tags: Tag[]) {
    this.titleTag = tags.find(tag => tag.description === 'favoritos.title')?.value;
    this.tabs = [
      {id: 1, name: tags.find(tag => tag.description === 'favoritos.tab1')?.value || 'Cuentas IBAN'},
      {id: 2, name: tags.find(tag => tag.description === 'favoritos.tab2')?.value || 'Pagos favoritos'},
      {id: 3, name: tags.find(tag => tag.description === 'favoritos.tab3')?.value || 'Automáticos'}
    ];
  }

  ngOnDestroy(): void {
    this.favoriteManagementService.unsubscribe();
  }
}
