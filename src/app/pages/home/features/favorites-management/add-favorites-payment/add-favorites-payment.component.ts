import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FavoritesPaymentsService} from '../favorites-payments/favorites-payments.service';
import {PublicServiceListModel} from '../../../../../shared/models/public-service-list.model';
import {PublicServiceEnterpriseModel} from '../../../../../shared/models/public-service-enterprise.model';

@Component({
  selector: 'app-add-favorites-payment',
  templateUrl: './add-favorites-payment.component.html',
  styleUrls: ['./add-favorites-payment.component.scss']
})
export class AddFavoritesPaymentComponent implements OnInit {

  publicServicesList: PublicServiceListModel[];
  publicEnterpriseList: PublicServiceEnterpriseModel[];
  resultFavorites: boolean;
  result: { status: string; message: string; title: string; };
  newFavoritesPaymentForm: FormGroup = new FormGroup({
    publicServices: new FormControl(null, [Validators.required]),
    company: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    favoriteName: new FormControl(null, [Validators.required])
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required]);


  // tslint:disable-next-line:no-output-rename
  @Output('backToTemplate') backToTemplate: EventEmitter<string> = new EventEmitter<string>();

  constructor(private favoritesPaymentsService: FavoritesPaymentsService) {
  }

  ngOnInit(): void {
    this.resultFavorites = false;
    this.getServices();
    this.newFavoritesPaymentForm.controls.publicServices.valueChanges.subscribe(value => {
      this.getCompany(value);
    });
  }

  getServices() {
    this.favoritesPaymentsService.getPublicServices()
      .subscribe((response) => {
        this.publicServicesList = response;
      });
  }

  getCompany(publicServicesId: number) {
    this.favoritesPaymentsService.getPublicEnterpriseServices(publicServicesId).subscribe((response) => {
      this.publicEnterpriseList = response;
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
    this.favoritesPaymentsService.setPublicServiceFavorite(this.newFavoritesPaymentForm.controls.company.value, this.newFavoritesPaymentForm.controls.phoneNumber.value, 21, this.newFavoritesPaymentForm.controls.favoriteName.value, 1, this.codeCredix.value)
      .subscribe((response) => {
        this.resultFavorites = !this.resultFavorites;
        this.result = {
          status: response.type,
          message: response.message,
          title: response.titleOne
        };
      });
  }
}
