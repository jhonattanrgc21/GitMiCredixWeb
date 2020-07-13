import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  displayedColumns: string[] = ['date', 'commerce', 'amount', 'quotas'];
  dataSource = DATA;
  p = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

}

export interface TableElement {
  id: number;
  date: string;
  commerce: string;
  amount: string;
  quotas: string;
}

const DATA: TableElement[] = [
  {id: 1, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 2, date: '29 Oct 19', commerce: 'Nombre corto', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 3, date: '29 Oct 19', commerce: 'Nombre largo del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {
    id: 4,
    date: '29 Oct 19',
    commerce: 'Nombre muy extenso o largo del comercio comercio comercio',
    amount: '100.00',
    quotas: 'cuota 1 de 12'
  },
  {id: 5, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 6, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 7, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 8, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 9, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 10, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 11, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 12, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 13, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 14, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
  {id: 15, date: '29 Oct 19', commerce: 'Nombre del comercio', amount: '100.00', quotas: 'cuota 1 de 12'},
];
