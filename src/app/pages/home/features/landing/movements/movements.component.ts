import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'commerce', 'amount'];
  dataSource = DATA;

  constructor() {
  }

  ngOnInit(): void {
  }

}

const DATA = [
  {id: 1, date: '29 Jul 20', commerce: 'EPA', amount: '100.00', currency: '₡'},
  {id: 2, date: '29 Jul 20', commerce: 'Zara Home', amount: '100.00', currency: '$'},
  {id: 3, date: '29 Jul 20', commerce: 'Aliss', amount: '100.00', currency: '₡'},
  {id: 4, date: '29 Jul 20', commerce: 'Hospital clinico San Jose', amount: '100.00', currency: '₡'}
];
