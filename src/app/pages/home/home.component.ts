import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {HomeService} from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isTablet = false;
  username = 'John Doe';
  avatar = 'assets/images/avatar.png';
  menus = menus;

  constructor(private breakpointObserver: BreakpointObserver, public homeService: HomeService) {
    this.getMenus();
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 1199px)'])
      .subscribe((state: BreakpointState) => {
        this.isTablet = state.matches;
        this.homeService.isTablet(this.isTablet);
      });
  }

  getMenus() {

  }

  signOut() {

  }

}

export const menus: Menu[] = [
  {
    id: 1, name: 'Inicio', route: '/'
  }
];

export interface Menu {
  id: number;
  name: string;
  route?: string;
  submenus?: Submenu[];
}

export interface Submenu {
  id: number;
  route: string;
  name: string;
  icon: string;
}
