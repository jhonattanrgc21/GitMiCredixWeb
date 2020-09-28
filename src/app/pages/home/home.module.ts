import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SharedModule} from '../../shared/shared.module';
import {HomeService} from './home.service';
import {HomeNavigationMenuComponent} from './home-navigation-menu/home-navigation-menu.component';
import {MenuOptionComponent} from './home-navigation-menu/menu-option/menu-option.component';
import {MenuHeaderComponent} from './home-navigation-menu/menu-header/menu-header.component';
import {MenuMessagesComponent} from './home-navigation-menu/menu-messages/menu-messages.component';
import {HomeToolbarComponent} from './home-toolbar/home-toolbar.component';
import {HomeFooterComponent} from './home-footer/home-footer.component';
import {ModalMessagesComponent} from './home-navigation-menu/menu-messages/modal-messages/modal-messages.component';
import {CredixShareButtonModule} from '../../shared/components/credix-share-button/credix-share-button.module';
import {ModalService} from '../../core/services/modal.service';
import {CredixResultNotificationModule} from '../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixPopupAlternativeModule} from '../../shared/components/credix-popup-alternative/credix-popup-alternative.module';
import {SimplebarAngularModule} from 'simplebar-angular';
import {HomeNavigationMenuService} from './home-navigation-menu/home-navigation-menu.service';

@NgModule({
  declarations: [
    HomeComponent,
    HomeNavigationMenuComponent,
    MenuOptionComponent,
    MenuHeaderComponent,
    MenuMessagesComponent,
    ModalMessagesComponent,
    HomeToolbarComponent,
    HomeFooterComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CredixShareButtonModule,
    CredixResultNotificationModule,
    CredixPopupAlternativeModule,
    SimplebarAngularModule
  ],
  providers: [
    HomeService,
    HomeNavigationMenuService,
    ModalService
  ]
})
export class HomeModule {
}
