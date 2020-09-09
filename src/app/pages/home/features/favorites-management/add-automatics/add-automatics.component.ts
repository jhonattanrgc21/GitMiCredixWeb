import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AutomaticsService} from '../automatics/automatics.service';
import {PublicServiceListModel} from '../../../../../shared/models/public-service-list.model';
import {PublicServiceEnterpriseModel} from '../../../../../shared/models/public-service-enterprise.model';
import {FavoritesPaymentsService} from '../favorites-payments/favorites-payments.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {Currency} from '../../../../../shared/models/currency';
import {DatePipe} from '@angular/common';

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
  result: { status: string; message: string; title: string; };
  resultAutomatics: boolean;

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
    const date: Date = new Date(this.newAutomaticsForm.controls.startDate.value);
    console.log(this.datePipe.transform(date.toISOString(), 'yyyy-MM-dd').toString());
    this.modalService.confirmationPopup('¿Desea añadir este pago automático?', '', 380, 197)
      .subscribe((confirm) => {
        if (confirm) {
          // tslint:disable-next-line:max-line-length
          this.automaticsService.setAutomaticsPayment(1, this.newAutomaticsControls.publicServices.value, this.newAutomaticsControls.periodicity.value, this.datePipe.transform(date.toISOString(), 'yyyy-MM-dd'), this.newAutomaticsControls.phoneNumber.value, this.newAutomaticsControls.maxAmount.value, this.codeCredix.value)
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
      this.automaticsService.emitAutomaticIsAdded(true);
    }
  }
}
