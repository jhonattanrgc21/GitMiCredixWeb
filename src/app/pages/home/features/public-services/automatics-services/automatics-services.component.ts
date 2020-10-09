import {Component, OnInit} from '@angular/core';
import {PublicServicesService} from '../public-services.service';
import {SchedulePayments} from '../../../../../shared/models/schedule-payments';
import {getMontByMonthNumber} from '../../../../../shared/utils/getMonthByMonthNumber';

@Component({
  selector: 'app-automatics-services',
  templateUrl: './automatics-services.component.html',
  styleUrls: ['./automatics-services.component.scss', '../public-services.component.scss']
})
export class AutomaticsServicesComponent implements OnInit {
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

  constructor(private publicServicesService: PublicServicesService) {
    this.dataToDetail = null;
  }

  ngOnInit(): void {
    this.getAllSchedule();
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
        this.schedulePayments = response;
      });
  }
}
