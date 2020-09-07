import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FavoritesPaymentsService} from '../favorites-payments.service';
import {PublicServiceListModel} from '../../../../../../shared/models/public-service-list.model';
import {PublicServiceEnterpriseModel} from '../../../../../../shared/models/public-service-enterprise.model';

@Component({
  selector: 'app-add-favorites-payment',
  templateUrl: './add-favorites-payment.component.html',
  styleUrls: ['./add-favorites-payment.component.scss']
})
export class AddFavoritesPaymentComponent implements OnInit {

  publicServicesList: PublicServiceListModel[];
  publicEnterpriseList: PublicServiceEnterpriseModel[];
  newFavoritesPaymentForm: FormGroup = new FormGroup({
    publicServices: new FormControl(null, [Validators.required]),
    company: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    favoriteName: new FormControl(null, [Validators.required]),
    codeCredix: new FormControl(null, [Validators.required])
  });

  constructor(private favoritesPaymentsService: FavoritesPaymentsService) {
  }

  ngOnInit(): void {
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

  }

  addFavoritePayment() {

  }
}
