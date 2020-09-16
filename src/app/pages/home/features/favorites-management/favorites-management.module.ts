import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FavoritesManagementComponent} from './favorites-management.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {ModalService} from '../../../../core/services/modal.service';
import {FavoritesManagementService} from './favorites-management.service';
import {CredixTabModule} from '../../../../shared/components/credix-tab/credix-tab.module';
import {SharedModule} from '../../../../shared/shared.module';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {CredixNavigationTableModule} from '../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixCodeInputModule} from '../../../../shared/components/credix-code-input/credix-code-input.module';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {NgxMaskModule} from 'ngx-mask';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {AddIbanAccountComponent} from './add-iban-account/add-iban-account.component';
import {AddAutomaticsComponent} from './add-automatics/add-automatics.component';
import {AddFavoritesPaymentComponent} from './add-favorites-payment/add-favorites-payment.component';
import {SimplebarAngularModule} from 'simplebar-angular';

const routes: Routes = [
  {
    path: '',
    component: FavoritesManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'iban-accounts',
        pathMatch: 'full'
      },
      {
        path: 'iban-accounts',
        loadChildren: () => import('./iban-accounts/iban-accounts.module').then(m => m.IbanAccountsModule)
      },
      {
        path: 'favorites-payments',
        // tslint:disable-next-line:max-line-length
        loadChildren: () => import('./favorites-payments/favorites-payments.module').then(m => m.FavoritesPaymentsModule)
      },
      {
        path: 'automatics',
        loadChildren: () => import('./automatics/automatics.module').then(m => m.AutomaticsModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    FavoritesManagementComponent,
    AddIbanAccountComponent,
    AddAutomaticsComponent,
    AddFavoritesPaymentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FlexModule,
    CredixTabModule,
    SharedModule,
    CredixCardsModule,
    CredixNavigationTableModule,
    CredixButtonModule,
    CredixResultNotificationModule,
    CredixCodeInputModule,
    CredixInputFieldModule,
    CredixSelectModule,
    CredixLinkButtonModule,
    CredixDividerModule,
    NgxMaskModule,
    DateFormatterModule,
    SimplebarAngularModule,
  ],
  providers: [
    FavoritesManagementService,
    ModalService,
    DatePipe
  ],
  exports: [
    MatCardModule,
    FlexModule,
    CredixTabModule,
    SharedModule
  ]
})
export class FavoritesManagementModule {
}
