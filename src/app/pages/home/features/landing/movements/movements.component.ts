import {Component, Input, OnInit} from '@angular/core';
import {Movement} from '../../../../../shared/models/movement';
import {ConvertStringDateToDate} from '../../../../../shared/utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})
export class MovementsComponent implements OnInit {
  @Input() movements: Movement[] = [];
  @Input() movementsTags: any;
  displayedColumns: string[] = ['date', 'commerce', 'amount'];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  convertStringDateToDate(value: string): Date {
    return ConvertStringDateToDate(value);
  }

  goToMovements() {
    this.router.navigate(['/home/movements-&-account-statement']);
  }

  goToStatement() {
    this.router.navigate(['/home/movements-&-account-statement/account-statement'], {
      queryParams: { TabSelectStatement: true }
    });
  }
}
