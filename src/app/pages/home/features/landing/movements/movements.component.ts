import {Component, Input, OnInit} from '@angular/core';
import {Movement} from '../../../../../shared/models/Movement';
import {ConvertStringDateToDate} from '../../../../../shared/utils';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  @Input() movements: Movement[] = [];
  @Input() movementsTags = {
    titleTag: 'Movimientos'
  };
  displayedColumns: string[] = ['date', 'commerce', 'amount'];

  constructor() {
  }

  ngOnInit(): void {
  }

  convertStringDateToDate(value: string): Date {
    return ConvertStringDateToDate(value);
  }
}
