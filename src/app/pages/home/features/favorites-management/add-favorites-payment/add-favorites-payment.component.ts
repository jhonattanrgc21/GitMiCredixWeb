import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FavoritesPaymentsService} from '../favorites-payments/favorites-payments.service';
import {PublicServiceCategoryModel} from '../../../../../shared/models/public-service-category.model';
import {PublicServiceEnterpriseModel} from '../../../../../shared/models/public-service-enterprise.model';
import {PublicServiceModel} from '../../../../../shared/models/public-service.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-favorites-payment',
  templateUrl: './add-favorites-payment.component.html',
  styleUrls: ['./add-favorites-payment.component.scss']
})
export class AddFavoritesPaymentComponent implements OnInit {
  publicServicesCategory: PublicServiceCategoryModel[];
  publicCompany: PublicServiceEnterpriseModel[];
  publicServices: PublicServiceModel[];
  done = false;
  result: { status: string; message: string; title: string; };
  newFavoritesPaymentForm: FormGroup = new FormGroup({
    publicServicesCategory: new FormControl(null, [Validators.required]),
    PublicServiceCompany: new FormControl(null, [Validators.required]),
    publicService: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    favoriteName: new FormControl(null, [Validators.required])
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required]);

  constructor(private favoritesPaymentsService: FavoritesPaymentsService,
              private router: Router) {
  }

  get newFavoritesPaymentControls() {
    return this.newFavoritesPaymentForm.controls;
  }

  ngOnInit(): void {
    this.getCategory();

    this.newFavoritesPaymentForm.controls.publicServicesCategory.valueChanges.subscribe(value => {
      this.getCompany(value);
    });

    this.newFavoritesPaymentForm.controls.PublicServiceCompany.valueChanges.subscribe(value => {
      this.getService(value);
    });
  }

  getCategory() {
    this.favoritesPaymentsService.getPublicCategoryServices()
      .subscribe((response) => {
        this.publicServicesCategory = response;
      });
  }

  getCompany(publicServicesId: number) {
    this.favoritesPaymentsService.getPublicEnterpriseServicesByCategory(publicServicesId).subscribe((response) => {
      this.publicCompany = response;
    });
  }

  getService(enterpriseId: number) {
    this.favoritesPaymentsService.getPublicServicesByEnterprise(enterpriseId)
      .subscribe((response) => {
        this.publicServices = response;
      });
  }

  back() {
    this.router.navigate(['/home/favorites-management/favorites-payments']);
  }

  addFavoritePayment() {
    this.favoritesPaymentsService.setPublicServiceFavorite(
      this.newFavoritesPaymentControls.publicService.value,
      this.newFavoritesPaymentControls.phoneNumber.value,
      this.newFavoritesPaymentControls.favoriteName.value,
      +this.codeCredix.value).subscribe((response) => {
      this.done = true;
      this.result = {
        status: response.titleOne,
        message: response.descriptionOne,
        title: response.titleOne
      };
    });
  }
}
