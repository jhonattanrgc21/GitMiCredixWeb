import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeService} from '../../home.service';
import {Menu} from '../../home.component';

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
  indexSelected = -1;
  submenuSelected = 0;
  openSubmenu = false;

  constructor(private router: Router, private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.homeService.goHomeObs.subscribe(() => {
      this.openSubmenu = false;
      this.menuSelected = 1;
      this.indexSelected = 0;
    });
  }

  menuClick(menu: Menu, index: number) {
    this.menuSelected = menu.id;
    this.openSubmenu = menu.submenus ? !this.openSubmenu : false;
    this.submenuSelected = this.indexSelected === index ? this.submenuSelected : 0;
    this.indexSelected = index;

    if (menu.route) {
      this.router.navigate([menu.route]);
    }
  }

  submenuClick(index: number, route: string) {
    this.submenuSelected = index;
    this.router.navigate([route]);
  }
}
