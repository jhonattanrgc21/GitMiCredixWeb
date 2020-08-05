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
  @Input() details = [];
  optionSelected = {
    id: 0,
    name: '',
    icon: '',
    img: '',
    subOptions: [],
    restrictions: {linkFacebook: '', name: '', paymentPlaceRestriction: [], webPage: ''},
  };

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  optionClick(option) {
    this.optionSelected = option;
    // console.log(this.optionSelected);
  }

  subOptionClick(navigation: string) {
    this.router.navigate([navigation]);
  }
}
