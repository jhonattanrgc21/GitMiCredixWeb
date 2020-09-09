import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutomaticsService} from '../automatics/automatics.service';
import {PublicServiceListModel} from '../../../../../shared/models/public-service-list.model';
import {PublicServiceEnterpriseModel} from '../../../../../shared/models/public-service-enterprise.model';
import {FavoritesPaymentsService} from '../favorites-payments/favorites-payments.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {Currency} from '../../../../../shared/models/currency';

@Component({
  selector: 'app-add-automatics',
  templateUrl: './add-automatics.component.html',
  styleUrls: ['./add-automatics.component.scss']
})
export class AddAutomaticsComponent implements OnInit {

  periodicityList: { description: string; id: number; }[] = [];
  publicServicesList: PublicServiceListModel[];
  publicEnterpriseList: PublicServiceEnterpriseModel[];
  currencyList: Currency[];

  newAutomaticsForm: FormGroup = new FormGroup({
    publicServices: new FormControl(null, [Validators.required]),
    company: new FormControl(null, [Validators.required]),
    phoneNumber: new FormControl(null, [Validators.required]),
    nameOfAutomatics: new FormControl(null, [Validators.required]),
    maxAmount: new FormControl(null, [Validators.required]),
    startDate: new FormControl(null, [Validators.required]),
    periodicity: new FormControl(null, [Validators.required]),
    currency: new FormControl(null, [Validators.required])
  });
  codeCredix: FormControl = new FormControl(null, [Validators.required]);


  // tslint:disable-next-line:no-output-rename
  @Output('backToTemplate') backToTemplate: EventEmitter<string> = new EventEmitter<string>();

  constructor(private automaticsService: AutomaticsService,
              private favoritesPaymentsService: FavoritesPaymentsService,
              private modalService: ModalService) {
  }

  get newAutomaticsControls() {
    return this.newAutomaticsForm.controls;
  }

  ngOnInit(): void {
    this.getServices();
    this.getPeriodicityList();
    this.newAutomaticsForm.controls.publicServices.valueChanges.subscribe(value => {
      this.getCompany(value);
    });
    this.getCurrencyList();
  }

  getPeriodicityList() {
    this.automaticsService.getPeriodicity().subscribe((response) => {
      this.periodicityList = response;
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

  getCurrencyList() {
    this.automaticsService.getCurrency()
      .subscribe((response) => {
        this.currencyList = response;
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
    this.modalService.confirmationPopup('¿Desea añadir este pago automático?', '', 380, 197)
      .subscribe((confirm) => {
        if (confirm) {
          // tslint:disable-next-line:max-line-length
          this.automaticsService.setAutomaticsPayment(this.newAutomaticsControls.company.value, this.newAutomaticsControls.publicServices.value, this.newAutomaticsControls.periodicity.value, this.newAutomaticsControls.startDate.value, this.newAutomaticsControls.phoneNumber.value, this.newAutomaticsControls.maxAmount.value, this.codeCredix.value)
            .subscribe((response) => {
              console.log(response);
            });
        }
      });
  }

  back() {
    this.backToTemplate.emit('favorite-management');
  }
}
