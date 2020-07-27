import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-navigation-table',
  templateUrl: './credix-navigation-table.component.html',
  styleUrls: ['./credix-navigation-table.component.scss']
})
export class CredixNavigationTableComponent implements OnInit {
  @Input() headers = ['', ''];
  @Input() options = [];
  optionSelected = {
    id: 0, name: '', icon: '', subOptions: []
  };

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  optionClick(option) {
    this.optionSelected = option;
  }

  subOptionClick(navigation: string) {
    this.router.navigate([navigation]);
  }
}
