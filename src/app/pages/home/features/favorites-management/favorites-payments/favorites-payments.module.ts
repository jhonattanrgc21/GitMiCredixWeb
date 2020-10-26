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
import {CredixToastService} from '../../../../../core/services/credix-toast.service';

const routes: Routes = [
  {
    path: '',
    component: FavoritesPaymentsComponent,
  }
];


@NgModule({
  declarations: [
    FavoritesPaymentsComponent],
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
  ],
  providers: [
    CredixToastService
  ]
})
export class FavoritesPaymentsModule {
}
