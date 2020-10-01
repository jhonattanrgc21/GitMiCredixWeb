import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FavoritesManagementService} from '../favorites-management.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AutomaticsService} from './automatics.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {DatePipe} from '@angular/common';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {ToastData} from '../../../../../shared/components/credix-toast/credix-toast-config';
import {SchedulePayments} from '../../../../../shared/models/schedule-payments';

@Component({
  selector: 'app-automatics',
  templateUrl: './automatics.component.html',
  styleUrls: ['./automatics.component.scss']
})
export class AutomaticsComponent implements OnInit, AfterViewInit {
  isUpdating = false;
  data: SchedulePayments;
  automaticsDetailForm: FormGroup = new FormGroup({
    favoriteName: new FormControl(null),
    maxAmount: new FormControl(null),
    startDate: new FormControl(null),
    periodicity: new FormControl(null)
  });
  codeCredix: FormControl = new FormControl(null);
  periodicityList: { description: string; id: number; }[] = [];

  constructor(private favoritesManagementService: FavoritesManagementService,
              private automaticsService: AutomaticsService,
              private modalService: ModalService,
              public datePipe: DatePipe,
              private toastService: CredixToastService) {
  }

  get automaticsDetailControls() {
    return this.automaticsDetailForm.controls;
  }

  ngOnInit(): void {
    this.getSchedulePayment();
  }

  ngAfterViewInit() {
    this.getUpdateAlert();
  }

  getSchedulePayment() {
    this.data = this.favoritesManagementService.schedulePayments;
    this.automaticsDetailForm.controls.favoriteName.setValue(this.data.alias);
    this.automaticsDetailForm.controls.maxAmount.setValue(this.data.maxAmount);
    this.automaticsDetailForm.controls.startDate.setValue(this.data.startDate);
    this.getPeriodicityList();
  }

  getPeriodicityList() {
    this.automaticsService.getPeriodicity().subscribe((response) => {
      this.periodicityList = response;
      this.automaticsDetailForm.controls.periodicity
        .setValue(this.periodicityList.find(elem => elem.description === this.data.periodicityDescription).id);
    });
  }

  getUpdateAlert() {
    const date: Date = new Date(this.automaticsDetailControls.startDate.value);
    this.favoritesManagementService.confirmUpdate.subscribe((response) => {
      if (response.confirm && this.data.id !== undefined) {
        // tslint:disable-next-line:max-line-length
        this.setUpdateSchedule(
          this.automaticsDetailControls.periodicity.value,
          this.datePipe.transform(date.toISOString(), 'yyyy-MM-dd'),
          this.automaticsDetailControls.maxAmount.value,
          this.data.id,
          this.codeCredix.value);
      }
    });
  }

  setUpdateSchedule(periodId: number, date: string, mxAmount: number, id: number, codeCredix: string) {
    this.automaticsService.setUpdateAutomatics(periodId, date, mxAmount, id, codeCredix)
      .subscribe((response) => {
        const data: ToastData = {
          text: response.message,
          type: response.type,
        };
        this.toastService.show(data);
        if (response.message === 'Operación exitosa') {
          this.favoritesManagementService.emitUpdateSuccessAlert();
        }
        this.codeCredix.reset(null, {emitEvent: false});
      });
  }

  updating(event) {
    if (event.key !== '' && event.code !== '') {
      this.automaticsDetailForm.controls.favoriteName.valueChanges.subscribe(value => {
        this.favoritesManagementService.updating();
        this.isUpdating = this.automaticsDetailForm.valid;
      });
      this.automaticsDetailForm.controls.maxAmount.valueChanges.subscribe(value => {
        this.favoritesManagementService.updating();
        this.isUpdating = this.automaticsDetailForm.valid;
      });
    }
    this.automaticsDetailForm.controls.startDate.valueChanges.subscribe(value => {
      this.favoritesManagementService.updating();
      this.isUpdating = this.automaticsDetailForm.valid;
    });

    this.automaticsDetailForm.controls.periodicity.valueChanges.subscribe(value => {
      this.favoritesManagementService.updating();
      this.isUpdating = this.automaticsDetailForm.valid;
    });
  }
}
