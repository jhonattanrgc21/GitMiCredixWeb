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
import {NewRechargeComponent} from './new-recharge/new-recharge.component';
import {NewServiceComponent} from './new-service/new-service.component';
import {NgxMaskModule} from 'ngx-mask';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {CredixNumericBlockModule} from '../../../../shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import {MatDividerModule} from '@angular/material/divider';
import {PhoneMaskModule} from '../../../../shared/pipes/phone-mask/phone-mask.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixShareButtonModule} from '../../../../shared/components/credix-share-button/credix-share-button.module';

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
    AutomaticsServicesComponent,
    NewRechargeComponent,
    NewServiceComponent],
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
    NgxMaskModule,
    CredixButtonModule,
    DateFormatterModule,
    CredixNumericBlockModule,
    CredixResultViewModule,
    MatDividerModule,
    PhoneMaskModule,
    CredixLinkButtonModule,
    CredixShareButtonModule,
  ],
  providers: [
    PublicServicesService
  ]
})
export class PublicServicesModule {
}
