import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeNavigationMenuService} from '../home-navigation-menu.service';
import {HomeService} from '../../../home.service';

@Component({
  selector: 'app-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrls: ['./menu-option.component.scss']
})
export class MenuOptionComponent implements OnInit {
  menus = menus;
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

export const menus: Menu[] = [
  {
    id: 1, name: 'Inicio', route: '/home'
  },
  {
    id: 2, name: 'Pagar', submenus: [
      {id: 1, name: 'Servicios', route: '/home', icon: 'public_services'},
      {id: 2, name: 'Pagar tarjeta', route: '/home', icon: 'pay'},
      {id: 3, name: 'Marchamo', route: '/home', icon: 'car'},
      {id: 4, name: 'Enviar dinero', route: '/home', icon: 'transfer'},
      {id: 5, name: 'Reportar transferencia', route: '/home', icon: 'transfer_report'},
      {id: 6, name: 'Lugares de pago', route: '/home', icon: 'map-marker'}
    ]
  },
  {
    id: 3, name: 'Productos', submenus: [
      {id: 7, name: 'Crédito personal', route: '/home', icon: 'personal_credit'},
      {id: 8, name: 'Compra sin tarjeta', route: '/home', icon: 'code'},
      {id: 9, name: 'Ampliar plazo de compra', route: '/home', icon: 'anticipated_canc'},
      {id: 10, name: 'Cancelación anticipada', route: '/home', icon: 'anticipated_canc'}
    ]
  },
  {
    id: 4, name: 'Mi cuenta', submenus: [
      {id: 11, name: 'Datos personales', route: '/home', icon: 'personal_data'},
      {id: 12, name: 'Gestionar favoritos', route: '/home', icon: 'favorites'},
      {id: 13, name: 'Cambiar clave', route: '/home', icon: 'change_password'},
      {id: 14, name: 'Cambiar PIN', route: '/home', icon: 'asterisk'},
      {id: 15, name: 'Aumentar límite de crédito', route: '/home', icon: 'cash'},
      {id: 16, name: 'Tarjetas adicionales', route: '/home', icon: 'credit-card-plus'}
    ]
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
