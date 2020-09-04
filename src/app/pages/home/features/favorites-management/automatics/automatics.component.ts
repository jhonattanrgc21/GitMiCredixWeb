import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-automatics',
  templateUrl: './automatics.component.html',
  styleUrls: ['./automatics.component.scss']
})
export class AutomaticsComponent implements OnInit {

  tableHeaders = [
    {label: 'Pagos guardados', width: '276px'},
    {label: 'Detalle del pago', width: 'auto'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
