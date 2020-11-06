import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutomaticsService} from '../automatics/automatics.service';
import {PublicServiceCategory} from '../../../../../shared/models/public-service-category';
import {PublicServiceEnterprise} from '../../../../../shared/models/public-service-enterprise';
import {ModalService} from '../../../../../core/services/modal.service';
import {DatePipe} from '@angular/common';
import {PublicService} from '../../../../../shared/models/public-service';
import {Router} from '@angular/router';
import {FavoritesManagementService} from '../favorites-management.service';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {CredixCodeErrorService} from '../../../../../core/services/credix-code-error.service';
import {finalize} from 'rxjs/operators';
import {Keys} from '../../../../../shared/models/keys';

@Component({
  selector: 'app-add-automatics',
  templateUrl: './add-automatics.component.html',
  styleUrls: ['./add-automatics.component.scss']
})
export class AddAutomaticsComponent implements OnInit, OnDestroy {
  newAutomaticsForm: FormGroup = new FormGroup({
    publicServicesCategory: new FormControl(null, [Validators.required]),
    publicServiceCompany: new FormControl(null, [Validators.required]),
    publicService: new FormControl(null, [Validators.required]),
    keyType: new FormControl(null, [Validators.required]),
    contractControl: new FormControl(null, [Validators.required]),
    nameOfAutomatics: new FormControl(null, [Validators.required]),
    maxAmount: new FormControl(null, [Validators.required]),
    startDate: new FormControl(new Date(), [Validators.required]),
    periodicity: new FormControl(null, [Validators.required]),
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required]);
  periodicityList: { description: string; id: number; }[] = [];
  publicServicesCategory: PublicServiceCategory[];
  publicCompanies: PublicServiceEnterprise[];
  publicServices: PublicService[];
  keys: Keys[] = [];
  today = new Date();
  label = 'referencia';
  result: { status: 'success' | 'error'; message: string; title: string; };
  quantityOfKeys: number;
  data: {
    publicServiceCategoryId: number;
    publicServiceEnterpriseId: number;
    publicServiceId: number;
    keyType: number;
    favoriteName: string;
    contractControl: number;
  };
  done = false;
  resultAutomatics: boolean;
  invalidCodeCredix = true;

  constructor(private automaticsService: AutomaticsService,
              private favoritesManagementService: FavoritesManagementService,
              private modalService: ModalService,
              private router: Router,
              public datePipe: DatePipe,
              private publicServiceApi: PublicServicesApiService,
              private credixCodeErrorService: CredixCodeErrorService) {
  }

  get newAutomaticsControls() {
    return this.newAutomaticsForm.controls;
  }

  ngOnInit(): void {
    this.resultAutomatics = false;
    this.getCategoryServices();
    this.getPeriodicityList();
    this.onCategoryChange();
    this.onCompanyChange();
    this.onPublicServiceChange();
    this.onKeyTypeChange();
    this.getFromFavorites();
    this.getCredixCodeError();
    this.codeCredix.valueChanges.subscribe(value => {
      this.invalidCodeCredix = this.codeCredix.invalid;
    });
  }

  getPeriodicityList() {
    this.automaticsService.getPeriodicity().subscribe((response) => {
      this.periodicityList = response;
    });
  }

  getCategoryServices() {
    this.publicServiceApi.getPublicServiceCategories()
      .subscribe((response) => {
        this.publicServicesCategory = response;
      });
  }

  getCompaniesByCategory(publicCategoryId: number) {
    this.publicServiceApi.getPublicServiceEnterpriseByCategory(publicCategoryId).subscribe((response) => {
      this.publicCompanies = response;
    });
  }

  getServicesByEnterprise(enterpriseId: number) {
    this.publicServiceApi.getPublicServiceByEnterprise(enterpriseId)
      .subscribe((response) => {
        this.publicServices = response;
      });
  }

  getKeysByPublicService(publicServiceId: number) {
    this.keys = this.publicServices.find(elem => elem.publicServiceId === publicServiceId).keys;
    this.quantityOfKeys = this.publicServices.find(elem => elem.publicServiceId === publicServiceId).quantityOfKeys;
  }


  getFromFavorites() {
    if (this.favoritesManagementService.redirect) {
      this.data = {
        publicServiceCategoryId: this.favoritesManagementService.valuesFromFavorites.publicServiceCategoryId,
        publicServiceEnterpriseId: this.favoritesManagementService.valuesFromFavorites.publicServiceEnterpriseId,
        publicServiceId: this.favoritesManagementService.valuesFromFavorites.publicServiceId,
        keyType: this.favoritesManagementService.valuesFromFavorites.keyType,
        contractControl: this.favoritesManagementService.valuesFromFavorites.contractControl,
        favoriteName: this.favoritesManagementService.valuesFromFavorites.favoriteName
      };

      this.newAutomaticsForm.controls.publicServicesCategory
        .setValue(this.favoritesManagementService.valuesFromFavorites.publicServiceCategoryId);

      this.newAutomaticsForm.controls.publicServiceCompany
        .setValue(this.favoritesManagementService.valuesFromFavorites.publicServiceEnterpriseId);

      this.newAutomaticsForm.controls.publicService
        .setValue(this.favoritesManagementService.valuesFromFavorites.publicServiceId);

      this.newAutomaticsForm.controls.keyType
        .setValue(this.favoritesManagementService.valuesFromFavorites.keyType);

      this.newAutomaticsForm.controls.nameOfAutomatics.setValue(this.favoritesManagementService.valuesFromFavorites.favoriteName);

      this.newAutomaticsForm.controls.contractControl.setValue(this.favoritesManagementService.valuesFromFavorites.contractControl);
    }
  }

  addAutomaticPayment() {
    const date: Date = new Date(this.newAutomaticsForm.controls.startDate.value);
    this.modalService.confirmationPopup('¿Desea añadir este pago automático?').subscribe((confirm) => {
      if (confirm) {
        this.automaticsService.setAutomaticsPayment(1,
          this.newAutomaticsControls.publicService.value,
          this.newAutomaticsControls.periodicity.value,
          this.datePipe.transform(date.toISOString(), 'yyyy-MM-dd'),
          +this.newAutomaticsControls.contractControl.value,
          +this.newAutomaticsControls.maxAmount.value,
          this.newAutomaticsControls.nameOfAutomatics.value,
          +this.codeCredix.value,
          this.newAutomaticsControls.keyType.value)
          .pipe(finalize(() => {
            if (!this.codeCredix.hasError('invalid')) {
              this.done = true;
            }
          }))
          .subscribe((response) => {
            this.resultAutomatics = !this.resultAutomatics;

            this.result = {
              status: response.type,
              message: response.descriptionOne || response.message,
              title: response.titleOne
            };
          });
      }
    });
  }


  onCategoryChange() {
    this.newAutomaticsForm.controls.publicServicesCategory.valueChanges.subscribe(value => {
      this.publicCompanies = [];
      this.publicServices = [];
      this.keys = [];
      this.newAutomaticsForm.controls.publicServiceCompany.reset(null, {onlySelf: true, emitEvent: false});
      this.newAutomaticsForm.controls.publicService.reset(null, {onlySelf: true, emitEvent: false});
      this.newAutomaticsForm.controls.keyType.reset(null, {onlySelf: true, emitEvent: false});
      this.getCompaniesByCategory(value);
    });
  }

  onCompanyChange() {
    this.newAutomaticsForm.controls.publicServiceCompany.valueChanges.subscribe(value => {
      this.publicServices = [];
      this.keys = [];
      this.newAutomaticsForm.controls.publicService.reset(null, {onlySelf: true, emitEvent: false});
      this.newAutomaticsForm.controls.keyType.reset(null, {onlySelf: true, emitEvent: false});
      this.getServicesByEnterprise(value);
    });
  }

  onPublicServiceChange() {
    this.newAutomaticsForm.controls.publicService.valueChanges.subscribe(value => {
      this.keys = [];
      this.label = 'contrato';
      this.newAutomaticsForm.controls.keyType.reset(null, {onlySelf: true, emitEvent: false});
      this.getKeysByPublicService(value);
    });
  }

  onKeyTypeChange() {
    this.newAutomaticsForm.controls.keyType.valueChanges.subscribe(value => {
      this.newAutomaticsForm.controls.contractControl.reset(null, {onlySelf: true, emitEvent: false});
      this.label = this.keys.find(key => key.keyType === value).description;
    });
  }

  getCredixCodeError() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.codeCredix.setErrors({invalid: true});
      this.newAutomaticsForm.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    this.favoritesManagementService.unsubscribe();
  }
}
