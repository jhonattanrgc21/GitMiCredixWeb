import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HomeSidebarService} from '../home-sidebar.service';
import {HomeService} from '../../home.service';
import {NavigationService} from '../../../../core/services/navigation.service';
import {ModalService} from '../../../../core/services/modal.service';
import {TagsService} from '../../../../core/services/tags.service';
import {Tag} from '../../../../shared/models/tag';

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
  isSchedulaExtendTermAvailable: boolean;
  questionTag: string;
  enableIncreaseCreditLimit: boolean;
  constructor(private router: Router,
              private navigationService: NavigationService,
              private tagsService: TagsService,
              private homeService: HomeService,
              private modalService: ModalService,
              private homeNavigationMenuService: HomeSidebarService) {
  }

  ngOnInit(): void {
    this.getMenus();
    this.goHomeEvents();
    this.subscribeToTags();
    this.routeChanged();
    this.homeNavigationMenuService.closeSubmenuObs.subscribe(() => this.openSubmenu = false);
  }

  routeChanged() {
    this.navigationService.submenuChanged$.subscribe(route => {
      const submenu = this.submenus.find(sub => sub.route.split('/')[2] === route);
      const menu = this.menus.find(men => men.name === submenu.parentId);
      this.menuChanged(menu.id, menu.route, this.submenus.filter(sub => sub.parentId === menu.name).length, false);
      this.submenuChanged(menu.id, submenu.id, submenu.route, false);
    });
  }

  goHomeEvents() {
    this.navigationService.goHomeObs.subscribe(() => {
      this.openSubmenu = false;
      this.activeSubmenu = 0;
      this.preActiveMenu = 0;
      this.activeMenu = 1;
    });
  }

  subscribeToTags() {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionality =>{
      if(this.enableIncreaseCreditLimit) this.getTags(functionality.find(fun => fun.description === 'Aumentar límite de crédito').tags)
      else this.questionTag = '';
    });
  }

  getMenus() {
    this.tagsService.getAllFunctionalitiesAndTags().subscribe(functionalities => {
      this.isSchedulaExtendTermAvailable = this.tagsService.isSchedulaExtendTermAvailable;
      this.enableIncreaseCreditLimit = this.tagsService.enableIncreaseCreditLimit;
      if (functionalities.length > 0) {

        this.submenus = [];
        functionalities.forEach(func => {
          if (func.level === 2) {

            if(func.link == '/home/increase-limit' && !this.enableIncreaseCreditLimit) return;

            if ( func.description === 'Cambiar PIN') {
              func.link = '/home/current-pin';
            }

            if(func.link == '/home/personal-credit'){
              this.homeNavigationMenuService.setEnableOptionPersonalCredit(true);
            }
            if(func.link == '/home/schedule-quotas' && !this.isSchedulaExtendTermAvailable) return

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
        if (menu.id !== 1) {
          menu.submenus = this.submenus.filter(sub => sub.parentId === menu.name);
        }
      });


      this.orderingMenu();
    });
  }
  validateWord(submenu){
    if(submenu == 'Plan liquidez'){
      let aux = submenu.split(" ")
      let newWord = 'prueba'+ '\n' + 'holi'
      submenu = newWord
      console.log(submenu.split(""))
    }
    return submenu

  }
  menuChanged(menuId: number, route: string, submenusSize: number, isFirst: boolean) {
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

  submenuChanged(menuId: number, submenuId: number, route: string, navigate = true) {
    if (this.activeSubmenu !== submenuId) {
      this.activeMenu = menuId;
      this.activeSubmenu = submenuId;

      if (route !== '/home/increase-limit' && navigate) {
        this.router.navigate([route]);
      }

      if (route === '/home/increase-limit') {
        this.modalService.confirmationPopup(this.questionTag || '¿Desea solicitar el aumento de límite de crédito?')
          .subscribe(confirmation => {
            if (confirmation) {
              this.router.navigate([route]);
            }
          });
      }
    }
  }

  getTags(tags: Tag[]) {
    this.questionTag = tags.find(tag => tag.description === 'aumento.question').value;
  }

  orderingMenu() {
    this.menus.forEach(menu => {
      switch (menu.name) {
        case 'Pagar':
          if (menu.submenus) {
            const payTempSubmenu = [];
            payOrdering.forEach(orderFlag => {
              const found = menu.submenus.find(submenu => submenu.name === orderFlag);
              if (found) {
                payTempSubmenu.push(found);
              }
            });
            if (payTempSubmenu.length > 0) {
              menu.submenus = payTempSubmenu;
            }
          }
          break;
        case 'Productos':
          if (menu.submenus) {
            const productTempSubmenu = [];
            productOrdering.forEach(orderFlag => {
              const found = menu.submenus.find(submenu => submenu.name === orderFlag);
              if (found) {
                productTempSubmenu.push(found);
              }
            });
            if (productTempSubmenu.length > 0) {
              menu.submenus = productTempSubmenu;
            }
          }
          break;
      }
    });
  }

}

const productOrdering = ['Crédito personal', 'Compra sin tarjeta', 'Ampliar plazo de compra','Programar cuotas' ,'Plan liquidez', 'Cancelación anticipada'];
const payOrdering = ['Servicios', 'Pagar tarjeta', 'Marchamo', 'Enviar dinero', 'Reportar transferencia', 'Lugares de pago'];

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
  {id: 10, name: 'Plan liquidez', route: '/home/extend-term-total-debt', icon: 'anticipated_canc', parentId: 'Productos'},
  {id: 11, name: 'Cancelación anticipada', route: '/home/anticipated-cancellation', icon: 'anticipated_canc', parentId: 'Productos'},
  {id: 12, name: 'Datos personales', route: '/home/personal-info', icon: 'personal_data', parentId: 'Mi Cuenta'},
  {id: 13, name: 'Gestionar favoritos', route: '/home/favorites-management', icon: 'favorites', parentId: 'Mi Cuenta'},
  {id: 14, name: 'Cambiar clave', route: '/home/change-password', icon: 'change_password', parentId: 'Mi Cuenta'},
  {id: 15, name: 'Cambiar PIN', route: '/home/change-pin', icon: 'asterisk', parentId: 'Mi Cuenta'},
  {id: 16, name: 'Aumentar límite de crédito', route: '/home/increase-limit', icon: 'cash', parentId: 'Mi Cuenta'},
  {id: 17, name: 'Tarjetas adicionales', route: '/home/additional-cards-management', icon: 'credit-card-plus', parentId: 'Mi Cuenta'},
  {id: 18, name: 'Programar cuotas', route: '/home/schedule-quotas', icon: 'calendar', parentId: 'Productos'},
  {id: 19, name: 'Suscripción Credix Más', route: '/home/credix-mas', icon: 'tabs', parentId: 'Mi Cuenta'}
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
