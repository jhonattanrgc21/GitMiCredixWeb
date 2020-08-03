import {Component, Input, OnInit} from '@angular/core';
import {Movement} from '../../../../../shared/models/Movement';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'commerce', 'amount'];
  @Input() movements: Movement[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }
}

const DATA = [
  {id: 1, date: '29 Jul 20', commerce: 'EPA', amount: '1.500,00', currency: '₡'},
  {id: 2, date: '29 Jul 20', commerce: 'Zara Home', amount: '2.600.050,81', currency: '$'},
  {id: 3, date: '29 Jul 20', commerce: 'Aliss', amount: '100,00', currency: '₡'},
  {id: 4, date: '29 Jul 20', commerce: 'Hospital clinico San Jose', amount: '450.000,00', currency: '₡'}
];
