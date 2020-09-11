import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutomaticsService} from '../automatics/automatics.service';
import {PublicServiceCategoryModel} from '../../../../../shared/models/public-service-category.model';
import {PublicServiceEnterpriseModel} from '../../../../../shared/models/public-service-enterprise.model';
import {FavoritesPaymentsService} from '../favorites-payments/favorites-payments.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {Currency} from '../../../../../shared/models/currency';
import {DatePipe} from '@angular/common';
import {PublicServiceModel} from '../../../../../shared/models/public-service.model';

@Component({
  selector: 'app-add-automatics',
  templateUrl: './add-automatics.component.html',
  styleUrls: ['./add-automatics.component.scss']
})
export class AddAutomaticsComponent implements OnInit {

  periodicityList: { description: string; id: number; }[] = [];
  publicServicesCategory: PublicServiceCategoryModel[];
  publicCompany: PublicServiceEnterpriseModel[];
  publicServices: PublicServiceModel[];
  currencyList: Currency[];
  result: { status: string; message: string; title: string; };
  resultAutomatics: boolean;

  newAutomaticsForm: FormGroup = new FormGroup({
    publicServicesCategory: new FormControl(null, [Validators.required]),
    publicServiceCompany: new FormControl(null, [Validators.required]),
    publicService: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    nameOfAutomatics: new FormControl(null, [Validators.required]),
    maxAmount: new FormControl(null, [Validators.required]),
    startDate: new FormControl(null, [Validators.required]),
    periodicity: new FormControl(null, [Validators.required]),
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required]);


  // tslint:disable-next-line:no-output-rename
  @Output('backToTemplate') backToTemplate: EventEmitter<string> = new EventEmitter<string>();

  constructor(private automaticsService: AutomaticsService,
              private favoritesPaymentsService: FavoritesPaymentsService,
              private modalService: ModalService,
              public datePipe: DatePipe) {
  }

  get newAutomaticsControls() {
    return this.newAutomaticsForm.controls;
  }

  ngOnInit(): void {
    this.resultAutomatics = false;
    this.getServices();
    this.getPeriodicityList();
    this.newAutomaticsForm.controls.publicServicesCategory.valueChanges.subscribe(value => {
      this.getCompany(value);
    });
    this.newAutomaticsForm.controls.publicServiceCompany.valueChanges.subscribe(value => {
      this.getService(value);
    });
  }

  getPeriodicityList() {
    this.automaticsService.getPeriodicity().subscribe((response) => {
      this.periodicityList = response;
    });
  }

  getServices() {
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

  openCalendar() {
    this.modalService.calendarPopup().subscribe(modal => {
      if (modal) {
        this.newAutomaticsForm.controls.startDate.setValue(modal.date);
      }
    });
  }

  addAutomaticPayment() {
    const date: Date = new Date(this.newAutomaticsForm.controls.startDate.value);
    this.modalService.confirmationPopup('¿Desea añadir este pago automático?', '', 380, 197)
      .subscribe((confirm) => {
        if (confirm) {
          // tslint:disable-next-line:max-line-length
          this.automaticsService.setAutomaticsPayment(this.newAutomaticsControls.publicServicesCategory.value, this.newAutomaticsControls.publicService.value, this.newAutomaticsControls.periodicity.value, this.datePipe.transform(date.toISOString(), 'yyyy-MM-dd'), this.newAutomaticsControls.phoneNumber.value, this.newAutomaticsControls.maxAmount.value, this.codeCredix.value)
            .subscribe((response) => {
              this.resultAutomatics = !this.resultAutomatics;
              this.result = {
                status: response.type,
                message: response.message,
                title: response.titleOne
              };
            });
        }
      });
  }

  back() {
    this.backToTemplate.emit('favorite-management');
  }

  ready() {
    this.backToTemplate.emit('favorite-management');
    if (this.result.status === 'success') {
      this.automaticsService.emitAutomaticIsAddedOrDelete(true, false);
    }
  }
}
