import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeNavigationMenuService} from '../home-navigation-menu.service';
import {HomeService} from '../../../home.service';
import {GoHomeService} from '../../../../../core/services/go-home.service';

@Component({
  selector: 'app-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrls: ['./menu-option.component.scss']
})
export class MenuOptionComponent implements OnInit {
  menus = menus;
  options = {autoHide: false, scrollbarMinSize: 100};
  openSubmenu = false;
  activeMenu = 1;
  preActiveMenu = 0;
  activeSubmenu = 0;

  constructor(private router: Router,
              private goHomeService: GoHomeService,
              private homeService: HomeService,
              private homeNavigationMenuService: HomeNavigationMenuService) {
  }

  ngOnInit(): void {
    this.goHomeService.goHomeObs.subscribe(() => {
      this.openSubmenu = false;
      this.activeSubmenu = 0;
      this.activeMenu = 1;
    });

    this.homeNavigationMenuService.closeSubmenuObs.subscribe(() => this.openSubmenu = false);
  }

  menuClick(menuId: number, route: string, submenus: number, isFirst: boolean) {
    this.homeNavigationMenuService.closeMessages();
    this.openSubmenu = this.preActiveMenu === menuId ? !this.openSubmenu : !isFirst;
    this.preActiveMenu = menuId;

    if (submenus === null || submenus === 0) {
      this.activeMenu = menuId;
      this.activeSubmenu = 0;
    }

    if (route) {
      this.router.navigate([route]);
    }
  }

  submenuClick(menuId: number, submenuId: number, route: string) {
    this.activeMenu = menuId;
    this.activeSubmenu = submenuId;
    this.router.navigate([route]);
  }
}

export const menus: Menu[] = [
  {
    id: 1, name: 'Inicio', route: '/home'
  },
  {
    id: 2, name: 'Pagar', submenus: [
      {id: 1, name: 'Servicios', route: '/home/public-services', icon: 'public_services'},
      {id: 2, name: 'Pagar tarjeta', route: '/home', icon: 'pay'},
      {id: 3, name: 'Marchamo', route: '/home/marchamos', icon: 'car'},
      {id: 4, name: 'Enviar dinero', route: '/home/send-money', icon: 'transfer'},
      {id: 5, name: 'Reportar transferencia', route: '/home/report-transference', icon: 'transfer_report'},
      {id: 6, name: 'Lugares de pago', route: '/home/payment-places', icon: 'map-marker'}
    ]
  },
  {
    id: 3, name: 'Productos', submenus: [
      {id: 7, name: 'Crédito personal', route: '/home/personal-credit', icon: 'personal_credit'},
      {id: 8, name: 'Compra sin tarjeta', route: '/home', icon: 'code'},
      {id: 9, name: 'Ampliar plazo de compra', route: '/home/extend-term', icon: 'anticipated_canc'},
      {id: 10, name: 'Cancelación anticipada', route: '/home/anticipated-cancellation', icon: 'anticipated_canc'}
    ]
  },
  {
    id: 4, name: 'Mi cuenta', submenus: [
      {id: 11, name: 'Datos personales', route: '/home/personal-info', icon: 'personal_data'},
      {id: 12, name: 'Gestionar favoritos', route: '/home', icon: 'favorites'},
      {id: 13, name: 'Cambiar clave', route: '/home', icon: 'change_password'},
      {id: 14, name: 'Cambiar PIN', route: '/home/change-pin', icon: 'asterisk'},
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
