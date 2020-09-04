import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesManagementComponent} from './favorites-management.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {ModalService} from '../../../../core/services/modal.service';
import {FavoritesManagementService} from './favorites-management.service';
import {CredixTabModule} from '../../../../shared/components/credix-tab/credix-tab.module';
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
    FavoritesManagementComponent
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
