import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FavoritesManagementService} from '../favorites-management.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AutomaticsService} from './automatics.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {DatePipe} from '@angular/common';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {ToastData} from '../../../../../shared/components/credix-toast/credix-toast-config';
import {SchedulePayments} from '../../../../../shared/models/schedule-payments';
import {CredixCodeErrorService} from '../../../../../core/services/credix-code-error.service';
import {ActivatedRoute} from '@angular/router';
import {Periodicity} from '../../../../../shared/models/periodicity';

@Component({
  selector: 'app-automatics',
  templateUrl: './automatics.component.html',
  styleUrls: ['./automatics.component.scss']
})
export class AutomaticsComponent implements OnInit, AfterViewInit {
  data: SchedulePayments;
  automaticsDetailForm: FormGroup = new FormGroup({
    favoriteName: new FormControl(null),
    maxAmount: new FormControl(null),
    startDate: new FormControl(null),
    periodicity: new FormControl(null)
  });
  codeCredix: FormControl = new FormControl(null);
  periodicityList: Periodicity[];
  idParam: number;
  today: Date;

  constructor(private favoritesManagementService: FavoritesManagementService,
              private automaticsService: AutomaticsService,
              private modalService: ModalService,
              public datePipe: DatePipe,
              private toastService: CredixToastService,
              private credixCodeErrorService: CredixCodeErrorService,
              private route: ActivatedRoute) {
  }

  get automaticsDetailControls() {
    return this.automaticsDetailForm.controls;
  }

  ngOnInit(): void {
    this.idParam = +this.route.snapshot.params?.id;
    this.getSchedulePayment();
    this.getCredixCodeError();
  }

  ngAfterViewInit() {
    this.getUpdateAlert();
    this.getDeletedSuccess();
    this.scheduleDetailFormChanged();
  }

  getSchedulePayment() {
    this.favoritesManagementService.schedulePayments.subscribe((response) => {
      this.codeCredix.reset(null, {emitEvent: false});
      this.data = response;
      this.automaticsDetailForm.controls.favoriteName.setValue(this.data?.alias, {onlySelf: false, emitEvent: false});
      this.automaticsDetailForm.controls.maxAmount.setValue(this.data?.maxAmount, {onlySelf: false, emitEvent: false});
      this.automaticsDetailForm.controls.startDate.setValue(this.data?.startDate, {onlySelf: false, emitEvent: false});
      this.automaticsDetailForm.markAsPristine();
      this.automaticsDetailControls.periodicity.markAsUntouched({onlySelf: true});
      this.today = new Date(this.data?.startDate);
      this.getPeriodicityList();
    });
  }

  getPeriodicityList() {
    this.automaticsService.getPeriodicity().subscribe((response) => {
      this.periodicityList = response;
      this.automaticsDetailForm.controls.periodicity
        .setValue(this.periodicityList?.find(elem => elem.description === this.data.periodicityDescription).id,
          {onlySelf: false, emitEvent: false});
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
        this.codeCredix.reset(null, {onlySelf: false, emitEvent: false});
      });
  }

  scheduleDetailFormChanged() {
    this.automaticsDetailForm.valueChanges
      .subscribe(() => {
        if (this.automaticsDetailControls.favoriteName.dirty ||
          this.automaticsDetailControls.maxAmount.dirty ||
          this.automaticsDetailControls.startDate.dirty ||
          this.automaticsDetailControls.periodicity.touched) {
          this.favoritesManagementService.updating();
        }
      });
  }

  getCredixCodeError() {
    this.credixCodeErrorService.credixCodeError$.subscribe(() => {
      this.codeCredix.setErrors({invalid: true});
      this.automaticsDetailForm.updateValueAndValidity();
    });
  }

  getDeletedSuccess() {
    this.favoritesManagementService.deleted.subscribe((response) => {
      if (response.automatics) {
        this.data = null;
      }
    });
  }
}

