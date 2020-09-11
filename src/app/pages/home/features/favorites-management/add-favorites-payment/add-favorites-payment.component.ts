import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FavoritesPaymentsService} from '../favorites-payments/favorites-payments.service';
import {PublicServiceCategoryModel} from '../../../../../shared/models/public-service-category.model';
import {PublicServiceEnterpriseModel} from '../../../../../shared/models/public-service-enterprise.model';
import {PublicServiceModel} from '../../../../../shared/models/public-service.model';

@Component({
  selector: 'app-add-favorites-payment',
  templateUrl: './add-favorites-payment.component.html',
  styleUrls: ['./add-favorites-payment.component.scss']
})
export class AddFavoritesPaymentComponent implements OnInit {

  publicServicesCategory: PublicServiceCategoryModel[];
  publicCompany: PublicServiceEnterpriseModel[];
  publicServices: PublicServiceModel[];
  resultFavorites: boolean;
  result: { status: string; message: string; title: string; };
  newFavoritesPaymentForm: FormGroup = new FormGroup({
    publicServicesCategory: new FormControl(null, [Validators.required]),
    PublicServiceCompany: new FormControl(null, [Validators.required]),
    PublicService: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    favoriteName: new FormControl(null, [Validators.required])
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required]);


  // tslint:disable-next-line:no-output-rename
  @Output('backToTemplate') backToTemplate: EventEmitter<string> = new EventEmitter<string>();

  constructor(private favoritesPaymentsService: FavoritesPaymentsService) {
  }

  get newFavoritesPaymentControls() {
    return this.newFavoritesPaymentForm.controls;
  }

  ngOnInit(): void {
    this.resultFavorites = false;
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
    this.backToTemplate.emit('favorite-management');
  }

  ready() {
    this.backToTemplate.emit('favorite-management');
    if (this.result.status === 'success') {
      this.favoritesPaymentsService.emitFavoritesIsAdded(true);
    }
  }

  addFavoritePayment() {
    // tslint:disable-next-line:max-line-length
    this.favoritesPaymentsService.setPublicServiceFavorite(this.newFavoritesPaymentControls.PublicService.value, this.newFavoritesPaymentControls.phoneNumber.value, 21, this.newFavoritesPaymentControls.favoriteName.value, this.newFavoritesPaymentControls.PublicServiceCompany.value, Number(this.codeCredix.value))
      .subscribe((response) => {
        console.log(response);
        this.resultFavorites = !this.resultFavorites;
        this.result = {
          status: response.type,
          message: response.message,
          title: response.titleOne
        };
      });
  }
}
