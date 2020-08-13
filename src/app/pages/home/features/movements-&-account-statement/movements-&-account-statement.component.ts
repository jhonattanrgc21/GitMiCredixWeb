import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movements-state-account',
  templateUrl: './movements-&-account-statement.component.html',
  styleUrls: ['./movements-&-account-statement.component.scss']
})
export class MovementsAccountStatementComponent implements OnInit {
  tabs = [
    {id: 1, name: 'Recientes'},
    {id: 2, name: 'Estados de cuenta'}
  ];
  selectTab = 1;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  tabSelected(tab) {
    this.selectTab = tab.id;
    this.router.navigate([`/home/movements-&-account-statement/${tab.id === 1 ? 'movements' : 'account-statement'}`]);
  }
}
