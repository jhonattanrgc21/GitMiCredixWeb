import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
  }

}
