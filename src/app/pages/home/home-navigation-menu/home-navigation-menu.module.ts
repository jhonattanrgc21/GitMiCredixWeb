import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeNavigationMenuComponent} from './home-navigation-menu.component';
import {MenuOptionComponent} from './menu-option/menu-option.component';
import {MenuHeaderComponent} from './menu-header/menu-header.component';
import {MenuMessagesComponent} from './menu-messages/menu-messages.component';
import {SharedModule} from '../../../shared/shared.module';
import {OverlayscrollbarsModule} from 'overlayscrollbars-ngx';


@NgModule({
  declarations: [HomeNavigationMenuComponent, MenuOptionComponent, MenuHeaderComponent, MenuMessagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    OverlayscrollbarsModule
  ],
  exports: [HomeNavigationMenuComponent]
})
export class HomeNavigationMenuModule {
}
