import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {menus} from '../../core/menus';

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

  constructor(private breakpointObserver: BreakpointObserver) {
    this.getMenus();
  }

  ngOnInit() {
    this.breakpointObserver
      .observe(['(max-width: 1199px)'])
      .subscribe((state: BreakpointState) => {
        this.isTablet = state.matches;
      });
  }

  getMenus() {

  }

  signOut() {

  }

}
