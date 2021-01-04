import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FavoritesPaymentsService} from '../favorites-payments/favorites-payments.service';
import {PublicServiceCategory} from '../../../../../shared/models/public-service-category';
import {PublicServiceEnterprise} from '../../../../../shared/models/public-service-enterprise';
import {PublicService} from '../../../../../shared/models/public-service';
import {Router} from '@angular/router';
import {ModalService} from '../../../../../core/services/modal.service';
import {FavoritesManagementService} from '../favorites-management.service';
import {PublicServicesApiService} from '../../../../../core/services/public-services-api.service';
import {CredixCodeErrorService} from '../../../../../core/services/credix-code-error.service';
import {finalize} from 'rxjs/operators';
import {Keys} from '../../../../../shared/models/keys';

@Component({
  selector: 'app-add-favorites-payment',
  templateUrl: './add-favorites-payment.component.html',
  styleUrls: ['./add-favorites-payment.component.scss']
})
export class AddFavoritesPaymentComponent implements OnInit {
  newFavoritesPaymentForm: FormGroup = new FormGroup({
    publicServicesCategory: new FormControl(null, [Validators.required]),
    publicServiceCompany: new FormControl(null, [Validators.required]),
    publicService: new FormControl(null, [Validators.required]),
    keyType: new FormControl(null, [Validators.required]),
    contractControl: new FormControl(null, [Validators.required]),
    favoriteName: new FormControl(null, [Validators.required])
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required]);
  publicServicesCategory: PublicServiceCategory[];
  publicCompanies: PublicServiceEnterprise[];
  publicServices: PublicService[];
  done = false;
  result: { status: 'success' | 'error'; message: string; title: string; };
  keys: Keys[] = [];
  quantityOfKeys: number;
  label = 'contrato';

  constructor(private favoritesPaymentsService: FavoritesPaymentsService,
              private publicServiceApi: PublicServicesApiService,
              private favoritesManagementService: FavoritesManagementService,
              private credixCodeErrorService: CredixCodeErrorService,
              private modalService: ModalService,
              private router: Router) {
  }

  get newFavoritesPaymentControls() {
    return this.newFavoritesPaymentForm.controls;
  }

  ngOnInit(): void {
    this.getCategory();
    this.onCategoryChange();
    this.onCompanyChange();
    this.onPublicServiceChange();
    this.onKeyTypeChange();
    this.getCredixCodeError();
  }

  getCategory() {
    this.publicServiceApi.getPublicServiceCategories()
      .subscribe((response) => {
        this.publicServicesCategory = response;
      });
  }

  getCompaniesByCategory(categoryId: number) {
    this.publicServiceApi.getPublicServiceEnterpriseByCategory(categoryId).subscribe((response) => {
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

  addFavoritePayment() {
    this.modalService.confirmationPopup('¿Desea añadir este pago favorito?', '', 380, 197)
      .subscribe(confirm => {
        if (confirm) {
          this.favoritesPaymentsService.setPublicServiceFavorite(
            this.newFavoritesPaymentControls.publicService.value,
            this.newFavoritesPaymentControls.contractControl.value,
            this.newFavoritesPaymentControls.favoriteName.value,
            this.newFavoritesPaymentControls.keyType.value,
            this.codeCredix.value.toString())
            .pipe(finalize(() => this.done = !this.codeCredix.hasError('invalid')))
            .subscribe((response) => {
              this.result = {
                status: response.type || response.titleOne,
                message: response.descriptionOne,
                title: response.type === 'error' ? 'Oops...' : '¡Éxito!'
              };
            });
        }
      });
  }

  addToAutomatics() {
    this.favoritesManagementService.redirecting = true;
    this.favoritesManagementService.valuesToFavorites = {
      publicServiceCategoryId: this.newFavoritesPaymentControls.publicServicesCategory.value,
      publicServiceEnterpriseId: this.newFavoritesPaymentControls.publicServiceCompany.value,
      publicServiceId: this.newFavoritesPaymentControls.publicService.value,
      keyType: this.newFavoritesPaymentControls.keyType.value,
      favoriteName: this.newFavoritesPaymentControls.favoriteName.value,
      contractControl: this.newFavoritesPaymentControls.contractControl.value
    };
    this.router.navigate(['/home/favorites-management/new-automatics']);
  }

  onCategoryChange() {
    this.newFavoritesPaymentForm.controls.publicServicesCategory.valueChanges.subscribe(value => {
      this.publicCompanies = [];
      this.publicServices = [];
      this.keys = [];
      this.newFavoritesPaymentForm.controls.publicServiceCompany.reset(null, {onlySelf: true, emitEvent: false});
      this.newFavoritesPaymentForm.controls.publicService.reset(null, {onlySelf: true, emitEvent: false});
      this.newFavoritesPaymentForm.controls.keyType.reset(null, {onlySelf: true, emitEvent: false});
      this.getCompaniesByCategory(value);
    });
  }

  onCompanyChange() {
    this.newFavoritesPaymentForm.controls.publicServiceCompany.valueChanges.subscribe(value => {
      this.publicServices = [];
      this.keys = [];
      this.newFavoritesPaymentForm.controls.publicService.reset(null, {onlySelf: true, emitEvent: false});
      this.newFavoritesPaymentForm.controls.keyType.reset(null, {onlySelf: true, emitEvent: false});
      this.getServicesByEnterprise(value);
    });
  }

  onPublicServiceChange() {
    this.newFavoritesPaymentForm.controls.publicService.valueChanges.subscribe(value => {
      this.keys = [];
      this.label = 'contrato';
      this.newFavoritesPaymentForm.controls.keyType.reset(null, {onlySelf: true, emitEvent: false});
      this.getKeysByPublicService(value);
    });
  }

  onKeyTypeChange() {
    this.newFavoritesPaymentForm.controls.keyType.valueChanges.subscribe(value => {
      this.newFavoritesPaymentForm.controls.contractControl.reset(null, {onlySelf: true, emitEvent: false});
      this.label = this.keys.find(key => key.keyType === value).description;
    });
  }

  getCredixCodeError() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.codeCredix.setErrors({invalid: true});
      this.newFavoritesPaymentForm.updateValueAndValidity();
    });
  }
}
