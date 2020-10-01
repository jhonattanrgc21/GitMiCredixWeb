import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutomaticsService} from '../automatics/automatics.service';
import {PublicServiceCategory} from '../../../../../shared/models/public-service-category';
import {PublicServiceEnterprise} from '../../../../../shared/models/public-service-enterprise';
import {FavoritesPaymentsService} from '../favorites-payments/favorites-payments.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {DatePipe} from '@angular/common';
import {PublicService} from '../../../../../shared/models/public-service';
import {Router} from '@angular/router';
import {FavoritesManagementService} from '../favorites-management.service';

@Component({
  selector: 'app-add-automatics',
  templateUrl: './add-automatics.component.html',
  styleUrls: ['./add-automatics.component.scss']
})
export class AddAutomaticsComponent implements OnInit {
  periodicityList: { description: string; id: number; }[] = [];
  publicServicesCategory: PublicServiceCategory[];
  publicCompany: PublicServiceEnterprise[];
  publicServices: PublicService[];
  today = new Date();
  result: { status: string; message: string; title: string; };
  data: {
    publicServiceCategoryId: number;
    publicServiceEnterpriseId: number;
    publicServiceId: number;
    favoriteName: string;
    phoneNumber: number
  };
  done = false;
  resultAutomatics: boolean;
  newAutomaticsForm: FormGroup = new FormGroup({
    publicServicesCategory: new FormControl(null, [Validators.required]),
    publicServiceCompany: new FormControl(null, [Validators.required]),
    publicService: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    nameOfAutomatics: new FormControl(null, [Validators.required]),
    maxAmount: new FormControl(null, [Validators.required]),
    startDate: new FormControl(new Date(), [Validators.required]),
    periodicity: new FormControl(null, [Validators.required]),
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required]);

  constructor(private automaticsService: AutomaticsService,
              private favoritesPaymentsService: FavoritesPaymentsService,
              private favoritesManagementService: FavoritesManagementService,
              private modalService: ModalService,
              private router: Router,
              public datePipe: DatePipe) {
  }

  get newAutomaticsControls() {
    return this.newAutomaticsForm.controls;
  }

  ngOnInit(): void {
    this.resultAutomatics = false;
    this.getCategoryServices();
    this.getPeriodicityList();
    this.newAutomaticsForm.controls.publicServicesCategory.valueChanges.subscribe(value => {
      this.getCompany(value);
    });
    this.newAutomaticsForm.controls.publicServiceCompany.valueChanges.subscribe(value => {
      this.getService(value);
    });

    this.getFromFavorites();
  }

  getPeriodicityList() {
    this.automaticsService.getPeriodicity().subscribe((response) => {
      this.periodicityList = response;
    });
  }

  getCategoryServices() {
    this.favoritesPaymentsService.getPublicCategoryServices()
      .subscribe((response) => {
        this.publicServicesCategory = response;
      });
  }

  getCompany(publicCategoryId: number) {
    this.favoritesPaymentsService.getPublicEnterpriseServicesByCategory(publicCategoryId).subscribe((response) => {
      this.publicCompany = response;
    });
  }

  getService(enterpriseId: number) {
    this.favoritesPaymentsService.getPublicServicesByEnterprise(enterpriseId)
      .subscribe((response) => {
        this.publicServices = response;
      });
  }

  getFromFavorites() {
    if (this.favoritesManagementService.redirect) {
      this.data = {
        publicServiceCategoryId: this.favoritesManagementService.valuesFromFavorites.publicServiceCategoryId,
        publicServiceEnterpriseId: this.favoritesManagementService.valuesFromFavorites.publicServiceEnterpriseId,
        publicServiceId: this.favoritesManagementService.valuesFromFavorites.publicServiceId,
        phoneNumber: this.favoritesManagementService.valuesFromFavorites.phoneNumber,
        favoriteName: this.favoritesManagementService.valuesFromFavorites.favoriteName
      };

      this.newAutomaticsForm.controls.publicServicesCategory
        .setValue(this.favoritesManagementService.valuesFromFavorites.publicServiceCategoryId);

      this.newAutomaticsForm.controls.publicServiceCompany
        .setValue(this.favoritesManagementService.valuesFromFavorites.publicServiceEnterpriseId);

      this.newAutomaticsForm.controls.publicService
        .setValue(this.favoritesManagementService.valuesFromFavorites.publicServiceId);

      this.newAutomaticsForm.controls.nameOfAutomatics.setValue(this.favoritesManagementService.valuesFromFavorites.favoriteName);

      this.newAutomaticsForm.controls.phoneNumber.setValue(this.favoritesManagementService.valuesFromFavorites.phoneNumber);
    }
  }

  back() {
    this.router.navigate(['/home/favorites-management/automatics']);
  }

  addAutomaticPayment() {
    const date: Date = new Date(this.newAutomaticsForm.controls.startDate.value);
    this.modalService.confirmationPopup('¿Desea añadir este pago automático?').subscribe((confirm) => {
      if (confirm) {
        this.automaticsService.setAutomaticsPayment(1,
          this.newAutomaticsControls.publicService.value,
          this.newAutomaticsControls.periodicity.value,
          this.datePipe.transform(date.toISOString(), 'yyyy-MM-dd'),
          this.newAutomaticsControls.phoneNumber.value,
          this.newAutomaticsControls.maxAmount.value,
          this.newAutomaticsControls.nameOfAutomatics.value,
          this.codeCredix.value)
          .subscribe((response) => {
            this.resultAutomatics = !this.resultAutomatics;
            this.done = true;
            this.result = {
              status: response.type,
              message: response.message || response.descriptionOne,
              title: response.titleOne
            };
          });
      }
    });
  }
}
