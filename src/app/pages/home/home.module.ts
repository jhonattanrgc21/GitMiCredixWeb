import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SharedModule} from '../../shared/shared.module';
import {OverlayscrollbarsModule} from 'overlayscrollbars-ngx';
import {HomeService} from './home.service';
import {HomeNavigationMenuComponent} from './home-components/home-navigation-menu/home-navigation-menu.component';
import {MenuOptionComponent} from './home-components/home-navigation-menu/menu-option/menu-option.component';
import {MenuHeaderComponent} from './home-components/home-navigation-menu/menu-header/menu-header.component';
import {MenuMessagesComponent} from './home-components/home-navigation-menu/menu-messages/menu-messages.component';
import {HomeToolbarComponent} from './home-components/home-toolbar/home-toolbar.component';
import {HomeFooterComponent} from './home-components/home-footer/home-footer.component';
import {ModalMessagesComponent} from './home-components/home-navigation-menu/menu-messages/modal-messages/modal-messages.component';
import {CredixShareButtonModule} from '../../shared/components/credix-share-button/credix-share-button.module';
import {ModalService} from '../../core/services/modal.service';
import {CredixResultNotificationModule} from '../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixPopupAlternativeModule} from '../../shared/components/credix-popup-alternative/credix-popup-alternative.module';
import {SimplebarAngularModule} from 'simplebar-angular';
import {SendMoneyService} from './features/send-money/send-money.service';


@NgModule({
  declarations: [
    HomeComponent,
    HomeNavigationMenuComponent, MenuOptionComponent, MenuHeaderComponent, MenuMessagesComponent, ModalMessagesComponent,
    HomeToolbarComponent,
    HomeFooterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    OverlayscrollbarsModule,
    CredixShareButtonModule,
    CredixResultNotificationModule,
    CredixPopupAlternativeModule,
    SimplebarAngularModule
  ],
  providers: [
    HomeService,
    ModalService,
    SendMoneyService
  ]
})
export class HomeModule {
}
