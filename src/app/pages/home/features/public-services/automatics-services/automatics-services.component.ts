import {Component, OnInit} from '@angular/core';
import {PublicServicesService} from '../public-services.service';
import {SchedulePayments} from '../../../../../shared/models/schedule-payments';

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

  schedulePayments: SchedulePayments[] = [];

  constructor(private publicServicesService: PublicServicesService) {
  }

  ngOnInit(): void {
    this.getAllSchedule();
  }

  schedulePaymentsDetail(data) {
    console.log(data);

  }

  getAllSchedule() {
    this.publicServicesService.getAllSchedulersPayment()
      .subscribe((response) => {
        this.schedulePayments = response;
      });
  }
}
