import {Component, OnInit} from '@angular/core';
import {MovementsService} from './movements.service';
import {Movement} from '../../../../../shared/models/Movement';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'commerce', 'amount', 'quotas', 'extend'];
  movementDataSource: Movement[] = [];
  p = 0;

  constructor(private movementsService: MovementsService) {
  }

  ngOnInit(): void {
    this.movementsService.dataSourceObs.subscribe(movements => this.movementDataSource = movements);
  }


}
