import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PublicServicesComponent} from './public-services.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {MatCardModule} from '@angular/material/card';
import {CredixTabModule} from '../../../../shared/components/credix-tab/credix-tab.module';
import {AllServicesComponent} from './all-services/all-services.component';
import {FavoriteServicesComponent} from './favorite-services/favorite-services.component';
import {AutomaticsServicesComponent} from './automatics-services/automatics-services.component';
import {PublicServicesService} from './public-services.service';
import {CredixNavigationTableModule} from '../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {SimplebarAngularModule} from 'simplebar-angular';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: PublicServicesComponent,
    children: [
      {
        path: '',
        component: AllServicesComponent
      },
      {
        path: 'favorites',
        component: FavoriteServicesComponent
      },
      {
        path: 'automatics',
        component: AutomaticsServicesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    PublicServicesComponent,
    AllServicesComponent,
    FavoriteServicesComponent,
    AutomaticsServicesComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixCardsModule,
    MatCardModule,
    CredixTabModule,
    CredixNavigationTableModule,
    SimplebarAngularModule,
    MatIconModule,
  ],
  providers: [
    PublicServicesService
  ]
})
export class PublicServicesModule {
}
