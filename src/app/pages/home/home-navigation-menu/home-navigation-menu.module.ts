import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeNavigationMenuComponent} from './home-navigation-menu.component';
import {MenuOptionComponent} from './menu-option/menu-option.component';
import {MenuHeaderComponent} from './menu-header/menu-header.component';
import {MenuMessagesComponent} from './menu-messages/menu-messages.component';
import {SharedModule} from '../../../shared/shared.module';
import {OverlayscrollbarsModule} from 'overlayscrollbars-ngx';
import {CredixResultNotificationModule} from '../../../shared/components/credix-result-notification/credix-result-notification.module';
import {ModalService} from '../../../core/services/modal.service';
import {ModalMessagesComponent} from './menu-messages/modal-messages/modal-messages.component';
import {CredixPopupAlternativeModule} from '../../../shared/components/credix-popup-alternative/credix-popup-alternative.module';
import {CredixShareButtonModule} from '../../../shared/components/credix-share-button/credix-share-button.module';


@NgModule({
  declarations: [HomeNavigationMenuComponent, MenuOptionComponent, MenuHeaderComponent, MenuMessagesComponent, ModalMessagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    OverlayscrollbarsModule,
    CredixResultNotificationModule,
    CredixPopupAlternativeModule,
    CredixShareButtonModule
  ],
  exports: [HomeNavigationMenuComponent],
  providers: [ModalService]
})
export class HomeNavigationMenuModule {
}
