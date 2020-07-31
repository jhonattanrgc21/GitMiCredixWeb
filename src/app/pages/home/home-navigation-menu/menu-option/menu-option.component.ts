import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from '../../home.service';
import {Menu} from '../../home.component';
import {HomeNavigationMenuService} from '../home-navigation-menu.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrls: ['./menu-option.component.scss']
})
export class MenuOptionComponent implements OnInit {
  @Input() menus: Menu[];
  scrollBarOptions = {
    overflowBehavior: {
      x: 'hidden',
      y: 'scroll'
    }
  };
  menuSelected = 1;
  submenuSelected = 0;
  openSubmenu = false;

  constructor(private router: Router,
              private homeService: HomeService,
              private homeNavigationMenuService: HomeNavigationMenuService) {
  }

  ngOnInit(): void {
    this.homeService.goHomeObs.subscribe(() => {
      this.openSubmenu = false;
      this.menuSelected = 1;
    });

    this.homeNavigationMenuService.closeSubmenuObs.subscribe(() => this.openSubmenu = false);
  }

  menuClick(menu: Menu, index: number) {
    this.openSubmenu = menu.submenus && this.menuSelected === menu.id ? !this.openSubmenu : true;
    this.menuSelected = menu.id;

    this.homeNavigationMenuService.closeMessages();

    if (menu.route) {
      this.router.navigate([menu.route]);
    }
  }

  submenuClick(id: number, route: string) {
    this.submenuSelected = id;
    this.router.navigate([route]);
  }
}
