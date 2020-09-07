import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FavoritesPaymentsComponent} from './favorites-payments.component';
import {CredixNavigationTableModule} from '../../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {CredixInputFieldModule} from '../../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixButtonModule} from '../../../../../shared/components/credix-button/credix-button.module';
import {CredixSelectModule} from '../../../../../shared/components/credix-select/credix-select.module';
import {CredixLinkButtonModule} from '../../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixCodeInputModule} from '../../../../../shared/components/credix-code-input/credix-code-input.module';
import {SharedModule} from '../../../../../shared/shared.module';
import {AddFavoritesPaymentComponent} from './add-favorites-payment/add-favorites-payment.component';

const routes: Routes = [
  {
    path: '',
    component: FavoritesPaymentsComponent,
    children: [
      {
        path: 'add-favorites-payments',
        component: AddFavoritesPaymentComponent
      }
    ]
  }
];


@NgModule({
  declarations: [
    FavoritesPaymentsComponent,
    AddFavoritesPaymentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CredixNavigationTableModule,
    CredixInputFieldModule,
    CredixButtonModule,
    CredixInputFieldModule,
    CredixSelectModule,
    CredixLinkButtonModule,
    CredixCodeInputModule
  ]
})
export class FavoritesPaymentsModule {
}
