import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {HomeService} from './home.service';
import {StorageService} from '../../core/services/storage.service';
import {Router} from '@angular/router';

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

  constructor(private breakpointObserver: BreakpointObserver,
              private storageService: StorageService,
              private router: Router,
              public homeService: HomeService) {
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

  getApplicantName(): string {
    return this.storageService.getCurrentUser().aplicantName;
  }

  getMenus() {

  }

  signOut() {
    this.homeService.logOut({
      deviceIdentifier: 1213123134,
      typeIncome: 2
    }).subscribe(response => {
      if (response.type === 'success') {
        this.router.navigate(['/']);
      }
    });
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
      {id: 6, name: 'Lugares de pago', route: '/home', icon: 'map-marker'},
      {id: 7, name: 'Premios', route: '/home/awards', icon: 'map-marker'}
    ]
  },
  {
    id: 3, name: 'Productos', submenus: [
      {id: 1, name: 'Crédito personal', route: '/home', icon: 'personal_credit'},
      {id: 2, name: 'Compra sin tarjeta', route: '/home', icon: 'code'},
      {id: 3, name: 'Ampliar plazo de compra', route: '/home', icon: 'anticipated_canc'},
      {id: 4, name: 'Cancelación anticipada', route: '/home', icon: 'anticipated_canc'}
    ]
  },
  {
    id: 4, name: 'Mi cuenta', submenus: [
      {id: 1, name: 'Datos personales', route: '/home', icon: 'personal_data'},
      {id: 2, name: 'Gestionar favoritos', route: '/home', icon: 'favorites'},
      {id: 3, name: 'Cambiar clave', route: '/home', icon: 'change_password'},
      {id: 4, name: 'Cambiar PIN', route: '/home', icon: 'asterisk'},
      {id: 5, name: 'Aumentar límite de crédito', route: '/home', icon: 'cash'},
      {id: 5, name: 'Tarjetas adicionales', route: '/home', icon: 'credit-card-plus'}
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
