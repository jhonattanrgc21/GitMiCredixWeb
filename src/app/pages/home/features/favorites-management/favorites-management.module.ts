import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesManagementComponent} from './favorites-management.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {ModalService} from '../../../../core/services/modal.service';
import {FavoritesManagementService} from './favorites-management.service';
import {CredixTabModule} from '../../../../shared/components/credix-tab/credix-tab.module';
import {FavoritesPaymentsComponent} from './favorites-payments/favorites-payments.component';
import {AutomaticsComponent} from './automatics/automatics.component';
import {SharedModule} from '../../../../shared/shared.module';

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
        loadChildren: () => import('../favorites-management/iban-accounts/iban-accounts.module').then(m => m.IbanAccountsModule)
      },
      {
        path: 'favorites-payments',
        component: FavoritesPaymentsComponent
      },
      {
        path: 'automatics',
        component: AutomaticsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    FavoritesManagementComponent,
    FavoritesPaymentsComponent,
    AutomaticsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FlexModule,
    CredixTabModule,
    SharedModule
  ],
  providers: [
    FavoritesManagementService,
    ModalService
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
