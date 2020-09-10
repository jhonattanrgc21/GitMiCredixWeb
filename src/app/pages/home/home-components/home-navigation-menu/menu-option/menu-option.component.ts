import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeNavigationMenuService} from '../home-navigation-menu.service';
import {HomeService} from '../../../home.service';
import {GoHomeService} from '../../../../../core/services/go-home.service';
import {ModalService} from '../../../../../core/services/modal.service';
import {TagsService} from '../../../../../core/services/tags.service';

@Component({
  selector: 'app-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrls: ['./menu-option.component.scss']
})
export class MenuOptionComponent implements OnInit {
  menus: Menu[] = menus;
  submenus: Submenu[] = submenus;
  options = {autoHide: false, scrollbarMinSize: 100};
  openSubmenu = false;
  activeMenu = 1;
  preActiveMenu = 0;
  activeSubmenu = 0;

  constructor(private router: Router,
              private goHomeService: GoHomeService,
              private tagsService: TagsService,
              private homeService: HomeService,
              private modalService: ModalService,
              private homeNavigationMenuService: HomeNavigationMenuService) {
  }

  ngOnInit(): void {
    this.getMenus();
    this.goHomeService.goHomeObs.subscribe(() => {
      this.openSubmenu = false;
      this.activeSubmenu = 0;
      this.preActiveMenu = 0;
      this.activeMenu = 1;
    });
    this.homeNavigationMenuService.closeSubmenuObs.subscribe(() => this.openSubmenu = false);
  }

  getMenus() {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionalities => {
      if (functionalities.length > 0) {
        this.submenus = [];
        functionalities.forEach(func => {
          if (func.level === 2) {
            this.submenus.push({
              id: func.id,
              name: func.description,
              route: func.link,
              icon: func.iconAddress,
              parentId: func.superiorFuncionality
            });
          }
        });
      }

      this.menus.forEach(menu => {
        menu.submenus = this.submenus.filter(sub => sub.parentId === menu.name);
      });
    });
  }

  menuClick(menuId: number, route: string, submenusSize: number, isFirst: boolean) {
    this.homeNavigationMenuService.closeMessages();
    this.openSubmenu = this.preActiveMenu === menuId ? !this.openSubmenu : !isFirst;
    this.preActiveMenu = menuId;

    if (submenusSize === null || submenusSize === 0) {
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

    if (this.activeSubmenu !== 15) {
      this.router.navigate([route]);
    } else {
      this.modalService.confirmationPopup('¿Desea solicitar el aumento de límite de crédito?').subscribe(response => {
        if (response) {
          this.router.navigate([route]);
        }
      });
    }
  }

}

export const menus: Menu[] = [
  {id: 1, name: 'Inicio', route: '/home'},
  {id: 2, name: 'Pagar'},
  {id: 3, name: 'Productos'},
  {id: 4, name: 'Mi Cuenta'}
];

export const submenus = [
  {id: 1, name: 'Servicios', route: '/home/public-services', icon: 'public_services', parentId: 'Pagar'},
  {id: 2, name: 'Pagar tarjeta', route: '/home', icon: 'pay', parentId: 'Pagar'},
  {id: 3, name: 'Marchamo', route: '/home/marchamos', icon: 'car', parentId: 'Pagar'},
  {id: 4, name: 'Enviar dinero', route: '/home/send-money', icon: 'transfer', parentId: 'Pagar'},
  {id: 5, name: 'Reportar transferencia', route: '/home/report-transference', icon: 'transfer_report', parentId: 'Pagar'},
  {id: 6, name: 'Lugares de pago', route: '/home/payment-places', icon: 'map-marker', parentId: 'Pagar'},
  {id: 7, name: 'Crédito personal', route: '/home/personal-credit', icon: 'personal_credit', parentId: 'Productos'},
  {id: 8, name: 'Compra sin tarjeta', route: '/home/buy-without-card', icon: 'code', parentId: 'Productos'},
  {id: 9, name: 'Ampliar plazo de compra', route: '/home/extend-term', icon: 'anticipated_canc', parentId: 'Productos'},
  {id: 10, name: 'Cancelación anticipada', route: '/home/anticipated-cancellation', icon: 'anticipated_canc', parentId: 'Productos'},
  {id: 11, name: 'Datos personales', route: '/home/personal-info', icon: 'personal_data', parentId: 'Mi Cuenta'},
  {id: 12, name: 'Gestionar favoritos', route: '/home/favorites-management', icon: 'favorites', parentId: 'Mi Cuenta'},
  {id: 13, name: 'Cambiar clave', route: '/home/change-password', icon: 'change_password', parentId: 'Mi Cuenta'},
  {id: 14, name: 'Cambiar PIN', route: '/home/change-pin', icon: 'asterisk', parentId: 'Mi Cuenta'},
  {id: 15, name: 'Aumentar límite de crédito', route: '/home/increase-limit', icon: 'cash', parentId: 'Mi Cuenta'},
  {id: 16, name: 'Tarjetas adicionales', route: '/home/additional-cards-management', icon: 'credit-card-plus', parentId: 'Mi Cuenta'}
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
  parentId: string;
}
