import {Component, Input, OnInit} from '@angular/core';
import {Menu} from '../home.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-home-navigation-menu',
  templateUrl: './home-navigation-menu.component.html',
  styleUrls: ['./home-navigation-menu.component.scss']
})
export class HomeNavigationMenuComponent implements OnInit {
  @Input() username: string;
  @Input() avatar: string;
  @Input() menus: Menu[];

  constructor() {
  }

  ngOnInit(): void {
  }
}
