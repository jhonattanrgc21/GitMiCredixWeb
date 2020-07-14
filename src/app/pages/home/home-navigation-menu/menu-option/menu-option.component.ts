import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Menu} from '../../home.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrls: ['./menu-option.component.scss']
})
export class MenuOptionComponent implements OnInit {
  @Input() menus: Menu[];
  menuSelected = 1;
  indexSelected = -1;
  submenuSelected = 0;
  openSubmenu = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  menuClick(id: number, index: number, route?: string) {
    this.openSubmenu = this.menuSelected === id ? !this.openSubmenu : true;
    this.submenuSelected = this.menuSelected === id ? this.submenuSelected : 0;
    this.indexSelected = index;
    this.menuSelected = id;

    if (route) {
      this.router.navigate([route]);
    }
  }

  submenuClick(index: number, route: string) {
    this.submenuSelected = index;
    this.router.navigate([route]);
  }
}
