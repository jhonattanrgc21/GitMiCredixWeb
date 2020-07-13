import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {SharedModule} from '../../shared/shared.module';
import {HomeToolbarComponent} from './home-toolbar/home-toolbar.component';
import {HomeFooterComponent} from './home-footer/home-footer.component';
import {HomeNavigationMenuModule} from './home-navigation-menu/home-navigation-menu.module';


@NgModule({
  declarations: [HomeComponent, HomeToolbarComponent, HomeFooterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    HomeNavigationMenuModule
  ]
})
export class HomeModule {
}
