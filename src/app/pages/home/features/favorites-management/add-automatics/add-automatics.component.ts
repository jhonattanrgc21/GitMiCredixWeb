import {Component, OnInit, ViewChild} from '@angular/core';
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
import { CdkStepper } from '@angular/cdk/stepper';
import { ConvertStringAmountToNumber } from 'src/app/shared/utils';

@Component({
  selector: 'app-add-automatics',
  templateUrl: './add-automatics.component.html',
  styleUrls: ['./add-automatics.component.scss']
})
export class AddAutomaticsComponent implements OnInit {
  newAutomaticsForm: FormGroup = new FormGroup({
    publicServicesCategory: new FormControl(null, [Validators.required]),
    publicServiceCompany: new FormControl(null, [Validators.required]),
    publicService: new FormControl(null, [Validators.required]),
    keyType: new FormControl(null, [Validators.required]),
    contractControl: new FormControl(null, [Validators.required]),
    nameOfAutomatics: new FormControl(null, [Validators.required]),
    maxAmount: new FormControl(null, [Validators.required]),
    startDate: new FormControl(null, [Validators.required]),
    periodicity: new FormControl(null, [Validators.required]),
  });
  rechargeFormGroup: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.nullValidator]),
  });
  requestForm: FormGroup = new FormGroup({
    term: new FormControl(null, [Validators.required])
  });
  confirmCodeFormGroup: FormGroup = new FormGroup({
    codeCredix: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });
  buttonFormGroup: FormGroup = null;
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
  stepperIndex: number = 0;
  anotherAmount: boolean = false;
  category: any = null;
  amounts: {amount: string, id: number}[] = [];

  @ViewChild('addAutomaticsStepper') stepper: CdkStepper;

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
    this.buttonFormGroup = this.newAutomaticsForm;

    if ( this.publicServiceApi.publicService ) {
      this.newAutomaticsForm.controls.publicServicesCategory.setValue(this.publicServiceApi.publicService.categoryId);
      this.getCompaniesByCategory(this.publicServiceApi.publicService.categoryId);
      this.newAutomaticsForm.controls.publicServiceCompany.setValue(this.publicServiceApi.publicService.enterpriseId);
      this.getServicesByEnterprise(this.publicServiceApi.publicService.enterpriseId);
      this.newAutomaticsForm.controls.publicService.setValue(this.publicServiceApi.publicService.serviceId);
      this.getKeysByPublicService(this.publicServiceApi.publicService.serviceId );
      this.newAutomaticsForm.controls.keyType.setValue(this.publicServiceApi.publicService.reference);
      this.newAutomaticsForm.controls.contractControl.setValue(this.publicServiceApi.publicService.referenceNumber);
    }

    this.getCategoryServices();
    this.getPeriodicityList();
    this.onCategoryChange();
    this.onCompanyChange();
    this.onPublicServiceChange();
    this.onKeyTypeChange();
    this.getFromFavorites();
    this.getCredixCodeError();
    this.onMaxAmount();
    this.getAmountsRecharge();
  }

  getAmountsRecharge() {
    this.favoritesManagementService.getAmountRecharge()
      .subscribe(response => {
        response.forEach((value, index) => {
          this.amounts.push({
            amount: value,
            id: index + 1
          });
        });
        this.amounts.push({
          amount: 'Otro',
          id: this.amounts.length + 1
        });
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
        if ( this.publicServiceApi.publicService ) {
          this.category = this.publicServicesCategory.find(category => category.publicServiceCategoryId === this.publicServiceApi.publicService.categoryId);
          this.publicServiceApi.publicService = null;
        }
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
          +this.rechargeFormGroup.controls.amount.value,
          this.newAutomaticsControls.nameOfAutomatics.value,
          +this.confirmCodeFormGroup.controls.codeCredix.value,
          this.newAutomaticsControls.keyType.value,
          this.requestForm.controls.term.value)
          .pipe(finalize(() => {
            if (!this.confirmCodeFormGroup.controls.codeCredix.hasError('invalid')) {
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
      this.category = this.publicServicesCategory.find(category => category.publicServiceCategoryId === value);
      if ( this.category.publicServiceCategory !== 'Recargas' ) {
        this.rechargeFormGroup.controls.amount.setValidators([Validators.nullValidator]);
        this.newAutomaticsForm.controls.maxAmount.setValidators([Validators.required]);
      } else {
        this.newAutomaticsForm.controls.maxAmount.setValidators([Validators.nullValidator]);
        this.rechargeFormGroup.controls.amount.setValidators([Validators.required]);
      }
      this.rechargeFormGroup.controls.amount.updateValueAndValidity();
      this.newAutomaticsForm.controls.maxAmount.updateValueAndValidity();
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

  onMaxAmount() {
    this.newAutomaticsForm.controls.maxAmount.valueChanges.subscribe(value => {
      this.rechargeFormGroup.setValue({amount: value});
    });
  }

  getCredixCodeError() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.confirmCodeFormGroup.controls.codeCredix.setErrors({invalid: true});
      this.newAutomaticsForm.updateValueAndValidity();
    });
  }

  onAmountChanged(value) {
    if (value !== 'Otro') {
      this.anotherAmount = false;
      this.rechargeFormGroup.controls.amount.setValidators([Validators.required]);
      this.rechargeFormGroup.controls.amount.setValue(ConvertStringAmountToNumber(value).toString());
    } else {
      this.rechargeFormGroup.controls.amount.reset();
      this.rechargeFormGroup.controls.amount.setValidators([Validators.required,
        Validators.min(ConvertStringAmountToNumber(this.amounts[0].amount))]);
      this.anotherAmount = true;
    }
    this.rechargeFormGroup.controls.amount.updateValueAndValidity();
  }

  next() {
    this.stepper.next();
    this.stepperIndex = this.stepper.selectedIndex;
    this.buttonFormGroup = this.confirmCodeFormGroup;
  }

  back() {
    if ( this.stepperIndex === 1 ) {
      this.buttonFormGroup = this.newAutomaticsForm;
      this.stepper.previous();
      this.stepperIndex = this.stepper.selectedIndex;
    } else {
      this.router.navigate(['/home/favorites-management/favorites-payments'])
    }
  }

}
