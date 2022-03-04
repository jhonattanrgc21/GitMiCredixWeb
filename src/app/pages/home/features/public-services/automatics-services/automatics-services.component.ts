import {Component, OnDestroy, OnInit} from '@angular/core';
import {PublicServicesService} from '../public-services.service';
import {SchedulePayments} from '../../../../../shared/models/schedule-payments';
import {getMontByMonthNumber} from '../../../../../shared/utils/get-month-by-month-number';
import {NavigationService} from '../../../../../core/services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-automatics-services',
  templateUrl: './automatics-services.component.html',
  styleUrls: ['./automatics-services.component.scss', '../public-services.component.scss']
})
export class AutomaticsServicesComponent implements OnInit, OnDestroy {
  tableHeaders = [
    {label: 'Servicios', width: '283px'},
    {label: 'Datos del pago', width: 'auto'}
  ];
  optionSelected = 0;

  schedulePayments: SchedulePayments[] = [];
  dataToDetail: {
    id: number;
    alias: string;
    startDate: string;
    monthToCharge: string;
    periodicity: string;
    maxAmount: number;
    publicServiceDescription: string
  };
  empty = false;

  constructor(private publicServicesService: PublicServicesService,
              private navigationService: NavigationService,
              private router: Router,
              ) {
    this.dataToDetail = null;
  }

  ngOnInit(): void {

    if ( this.publicServicesService.tabIndex === 'Automáticos' ) {
      this.getAllSchedule();
    } else {
      this.router.navigate(['/home/public-services']);
    }
  }

  schedulePaymentsDetail(data) {
    this.optionSelected = data.id;
    const date: Date = new Date(data.startDate);
    this.dataToDetail = {
      id: data.id,
      alias: data.alias,
      monthToCharge: getMontByMonthNumber(date.getMonth()),
      maxAmount: data.maxAmount,
      periodicity: data.periodicityDescription,
      startDate: data.startDate,
      publicServiceDescription: data.publicServiceDescription
    };
  }

  getAllSchedule() {
    this.publicServicesService.getAllSchedulersPayment()
      .subscribe((response) => {
        this.empty = response.length === 0;
        this.schedulePayments = response;
      });
  }

  onSubmenuChanged() {
    this.navigationService.submenuChanged('favorites-management');
  }

  ngOnDestroy(): void {
    this.publicServicesService.unsubscribe();
  }
}
