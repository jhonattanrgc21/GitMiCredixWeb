import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SharedModule} from '../../shared/shared.module';
import {HomeService} from './home.service';
import {HomeSidebarComponent} from './home-sidebar/home-sidebar.component';
import {MenuOptionComponent} from './home-sidebar/menu-option/menu-option.component';
import {MenuHeaderComponent} from './home-sidebar/menu-header/menu-header.component';
import {MenuMessagesComponent} from './home-sidebar/menu-messages/menu-messages.component';
import {HomeToolbarComponent} from './home-toolbar/home-toolbar.component';
import {HomeFooterComponent} from './home-footer/home-footer.component';
import {ModalMessagesComponent} from './home-sidebar/menu-messages/modal-messages/modal-messages.component';
import {CredixShareButtonModule} from '../../shared/components/credix-share-button/credix-share-button.module';
import {ModalService} from '../../core/services/modal.service';
import {CredixResultNotificationModule} from '../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixPopupAlternativeModule} from '../../shared/components/credix-popup-alternative/credix-popup-alternative.module';
import {SimplebarAngularModule} from 'simplebar-angular';
import {HomeSidebarService} from './home-sidebar/home-sidebar.service';
import { HttpRequestsResponseInterceptor } from 'src/app/core/interceptors/http.interceptor';
import { UserIdleModule } from 'angular-user-idle';

@NgModule({
  declarations: [
    HomeComponent,
    HomeSidebarComponent,
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
    SimplebarAngularModule,
    UserIdleModule
  ],
  providers: [
    HomeService,
    HomeSidebarService,
    ModalService,
    HttpRequestsResponseInterceptor
  ]
})
export class HomeModule {
}
