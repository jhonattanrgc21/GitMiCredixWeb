import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-favorites-payments',
  templateUrl: './favorites-payments.component.html',
  styleUrls: ['./favorites-payments.component.scss']
})
export class FavoritesPaymentsComponent implements OnInit {

  tableHeaders = [
    {label: 'Pagos guardados', width: '276px'},
    {label: 'Detalle del pago', width: 'auto'}
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
