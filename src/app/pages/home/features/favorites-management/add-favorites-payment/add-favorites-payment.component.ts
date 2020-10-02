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
  result: { status: string; message: string; title: string; };
  newFavoritesPaymentForm: FormGroup = new FormGroup({
    publicServicesCategory: new FormControl(null, [Validators.required]),
    publicServiceCompany: new FormControl(null, [Validators.required]),
    publicService: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
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
      this.publicCompany = response;
    });
  }

  getService(enterpriseId: number) {
    this.publicServiceApi.getPublicServiceByEnterprise(enterpriseId)
      .subscribe((response) => {
        this.publicServices = response;
      });
  }

  back() {
    this.router.navigate(['/home/favorites-management/favorites-payments']);
  }

  addFavoritePayment() {
    this.modalService.confirmationPopup('¿Desea añadir este pago favorito?', '', 380, 197)
      .subscribe(confirm => {
        if (confirm) {
          this.favoritesPaymentsService.setPublicServiceFavorite(
            this.newFavoritesPaymentControls.publicService.value,
            this.newFavoritesPaymentControls.phoneNumber.value,
            this.newFavoritesPaymentControls.favoriteName.value,
            +this.codeCredix.value).subscribe((response) => {
            this.done = true;
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
      favoriteName: this.newFavoritesPaymentControls.favoriteName.value,
      phoneNumber: this.newFavoritesPaymentControls.phoneNumber.value
    };
  }

  getCredixCodeError() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.codeCredix.setErrors({invalid: true});
      this.newFavoritesPaymentForm.updateValueAndValidity();
    });
  }
}
