import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IbanAccountsComponent} from './iban-accounts.component';
import {Routes} from '@angular/router';
import {FavoritesManagementModule} from '../favorites-management.module';
import {CredixNavigationTableModule} from '../../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {ModalService} from '../../../../../core/services/modal.service';
import {IbanAccountsService} from './iban-accounts.service';
import {CredixInputFieldModule} from '../../../../../shared/components/credix-input-field/credix-input-field.module';
import {AddIbanAccountComponent} from './add-iban-account/add-iban-account.component';
import {CredixButtonModule} from '../../../../../shared/components/credix-button/credix-button.module';
import {CredixSelectModule} from '../../../../../shared/components/credix-select/credix-select.module';
import {CredixLinkButtonModule} from '../../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixCodeInputModule} from '../../../../../shared/components/credix-code-input/credix-code-input.module';

const routes: Routes = [
  {
    path: '',
    component: IbanAccountsComponent,
    children: [
      {
        path: 'add-iban-account',
        component: AddIbanAccountComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    IbanAccountsComponent,
    AddIbanAccountComponent
  ],
  imports: [
    CommonModule,
    FavoritesManagementModule,
    CredixNavigationTableModule,
    CredixInputFieldModule,
    CredixButtonModule,
    CredixInputFieldModule,
    CredixSelectModule,
    CredixLinkButtonModule,
    CredixCodeInputModule
  ],
  providers: [
    ModalService,
    IbanAccountsService
  ]
})
export class IbanAccountsModule {
}
