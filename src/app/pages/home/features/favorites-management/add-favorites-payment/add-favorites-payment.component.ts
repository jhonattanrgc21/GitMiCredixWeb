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
  publicServicesCategory: PublicServiceCategory[];
  publicCompany: PublicServiceEnterprise[];
  publicServices: PublicService[];
  done = false;
  result: { status: 'success' | 'error'; message: string; title: string; };
  keys: Keys[] = [];
  label: string;
  mask: string;
  quantityOfKeys: number;
  newFavoritesPaymentForm: FormGroup = new FormGroup({
    publicServicesCategory: new FormControl(null, [Validators.required]),
    publicServiceCompany: new FormControl(null, [Validators.required]),
    publicService: new FormControl(null, [Validators.required]),
    keyType: new FormControl(null, [Validators.required]),
    contractControl: new FormControl(null, [Validators.required]),
    favoriteName: new FormControl(null, [Validators.required])
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required]);

  constructor(private favoritesPaymentsService: FavoritesPaymentsService,
              private publicServiceApi: PublicServicesApiService,
              private router: Router,
              private modalService: ModalService,
              private favoritesManagementService: FavoritesManagementService,
              private credixCodeErrorService: CredixCodeErrorService) {
  }

  get newFavoritesPaymentControls() {
    return this.newFavoritesPaymentForm.controls;
  }

  ngOnInit(): void {
    this.getCategory();

    this.newFavoritesPaymentForm.controls.publicServicesCategory.valueChanges.subscribe(value => {
      this.getCompany(value);
    });

    this.newFavoritesPaymentForm.controls.publicServiceCompany.valueChanges.subscribe(value => {
      this.getService(value);
    });

    this.newFavoritesPaymentForm.controls.publicService.valueChanges.subscribe(value => {
      this.getKeysByPublicService(value);
    });

    this.newFavoritesPaymentForm.controls.keyType.valueChanges.subscribe(value => {
      this.label = this.keys.find(elem => elem.keyType === value).description;
      this.getMaskByKeyType(value);
    });
    this.getCredixCodeError();
  }

  getCategory() {
    this.publicServiceApi.getPublicServiceCategories()
      .subscribe((response) => {
        this.publicServicesCategory = response;
      });
  }

  getCompany(categoryId: number) {
    this.publicServiceApi.getPublicServiceEnterpriseByCategory(categoryId).subscribe((response) => {
      console.log(response);
      this.publicCompany = response;
    });
  }

  getService(enterpriseId: number) {
    this.publicServiceApi.getPublicServiceByEnterprise(enterpriseId)
      .subscribe((response) => {
        console.log(response);
        this.publicServices = response;
      });
  }

  getKeysByPublicService(publicServiceId: number) {
    this.keys = this.publicServices.find(elem => elem.publicServiceId === publicServiceId).keys;
    this.quantityOfKeys = this.publicServices.find(elem => elem.publicServiceId === publicServiceId).quantityOfKeys;
  }

  getMaskByKeyType(keyType: number) {
    switch (keyType) {
      case 52:
        this.mask = '0000-0000';
        break;
      case 99:
        this.mask = '0-0000-0000';
        break;
      default:
        this.mask = '';
        break;
    }
  }

  back() {
    this.router.navigate(['/home/favorites-management/favorites-payments']);
  }

  addFavoritePayment() {
    this.modalService.confirmationPopup('¿Desea añadir este pago favorito?', '', 380, 197)
      .subscribe(confirm => {
        if (confirm) {
          this.favoritesPaymentsService
            .setPublicServiceFavorite(this.newFavoritesPaymentControls.publicService.value,
              this.newFavoritesPaymentControls.contractControl.value,
            this.newFavoritesPaymentControls.favoriteName.value,
              this.newFavoritesPaymentControls.keyType.value,
            +this.codeCredix.value)
            .pipe(finalize(() => {
              if (!this.codeCredix.hasError('invalid')) {
                this.done = true;
              }
            })).subscribe((response) => {
            this.result = {
              status: response.type || response.titleOne,
              message: response.descriptionOne,
              title: response.type === 'error' ? 'Opss...' : '¡Éxito!'
            };
          });
        }
      });
  }

  addToAutomatics() {
    this.router.navigate(['/home/favorites-management/new-automatics']);
    this.favoritesManagementService.redirecting = true;
    this.favoritesManagementService.valuesToFavorites = {
      publicServiceCategoryId: this.newFavoritesPaymentControls.publicServicesCategory.value,
      publicServiceEnterpriseId: this.newFavoritesPaymentControls.publicServiceCompany.value,
      publicServiceId: this.newFavoritesPaymentControls.publicService.value,
      keyType: this.newFavoritesPaymentControls.keyType.value,
      favoriteName: this.newFavoritesPaymentControls.favoriteName.value,
      contractControl: this.newFavoritesPaymentControls.contractControl.value
    };
  }

  getCredixCodeError() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.codeCredix.setErrors({invalid: true});
      this.newFavoritesPaymentForm.updateValueAndValidity();
    });
  }
}
