import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FavoritesManagementService} from '../favorites-management.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AutomaticsService} from './automatics.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-automatics',
  templateUrl: './automatics.component.html',
  styleUrls: ['./automatics.component.scss']
})
export class AutomaticsComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:max-line-length
  data: { publicServiceDescription: string; alias: string; id: number; maxAmount: number; periodicityDescription: string; startDate: string; key: number; };
  automaticsDetailForm: FormGroup = new FormGroup({
    favoriteName: new FormControl({value: null, disabled: true}),
    maxAmount: new FormControl({value: null, disabled: true}),
    startDate: new FormControl({value: null, disabled: true}),
    periodicity: new FormControl({value: null, disabled: true})
  });

  periodicityList: { description: string; id: number; }[] = [];

  constructor(private favoritesManagementService: FavoritesManagementService,
              private automaticsService: AutomaticsService,
              private modalService: ModalService,
              public datePipe: DatePipe) {
    this.data = {periodicityDescription: '', alias: '', id: 0, maxAmount: 0, publicServiceDescription: '', startDate: '', key: 0};
  }

  ngOnInit(): void {
    this.getSchedulePayment();
  }

  get automaticsDetailControls() {
    return this.automaticsDetailForm.controls;
  }

  ngAfterViewInit() {
    this.getDeleteAlert();
    this.getUpdateAlert();
  }

  getSchedulePayment() {
    this.favoritesManagementService.automaticsPaymentData.subscribe(response => {
      this.data = {
        publicServiceDescription: response.publicServiceDescription,
        alias: response.alias,
        id: response.id,
        maxAmount: response.maxAmount,
        periodicityDescription: response.periodicityDescription,
        startDate: response.startDate,
        key: response.key
      };
      this.automaticsDetailForm.controls.favoriteName.setValue(this.data.alias);
      this.automaticsDetailForm.controls.maxAmount.setValue(this.data.maxAmount);
      this.automaticsDetailForm.controls.startDate.setValue(this.data.startDate);
      this.getPeriodicityList();
    });
  }

  getPeriodicityList() {
    this.automaticsService.getPeriodicity().subscribe((response) => {
      this.periodicityList = response;
      // tslint:disable-next-line:max-line-length
      this.automaticsDetailForm.controls.periodicity.setValue(this.periodicityList.find(elem => elem.description === response.description).id);
    });
  }

  openCalendar() {
    this.modalService.calendarPopup().subscribe(modal => {
      if (modal) {
        this.automaticsDetailForm.controls.startDate.setValue(modal.date);
      }
    });
  }

  getUpdateAlert() {
    const date: Date = new Date(this.automaticsDetailControls.startDate.value);
    this.favoritesManagementService.confirmUpdate.subscribe((response) => {
      if (response.confirm && this.data.id !== undefined) {
        // tslint:disable-next-line:max-line-length
        this.setUpdateSchedule(this.automaticsDetailControls.periodicity.value, this.datePipe.transform(date.toISOString(), 'yyyy-MM-dd'), this.automaticsDetailControls.maxAmount.value, this.data.id);
      }
    });
  }

  setUpdateSchedule(periodId: number, date: string, mxAmount: number, id: number) {
    this.automaticsService.setUpdateAutomatics(periodId, date, mxAmount, id)
      .subscribe((response) => {
        if (response.message === 'Operación exitosa') {
          this.favoritesManagementService.emitUpdateSuccessAlert();
        }
      });
  }

  getDeleteAlert() {
    this.favoritesManagementService.deleteAutomatics.subscribe((response) => {
      if (response.del && this.data.id !== undefined) {
        this.setDeleteAutomatics(this.data.id);
      }
    });
  }

  setDeleteAutomatics(id: number) {
    this.automaticsService.setDeleteAutomatics(id).subscribe((response) => {
      if (response.type === 'success' && response.message === 'Operación exitosa') {
        this.automaticsService.emitAutomaticIsAddedOrDelete(false, true);
      } else {
        return false;
      }
    });
  }
}
