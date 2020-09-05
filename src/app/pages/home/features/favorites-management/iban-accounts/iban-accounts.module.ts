import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IbanAccountsComponent} from './iban-accounts.component';
import {RouterModule, Routes} from '@angular/router';
import {CredixNavigationTableModule} from '../../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {ModalService} from '../../../../../core/services/modal.service';
import {IbanAccountsService} from './iban-accounts.service';
import {CredixInputFieldModule} from '../../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixButtonModule} from '../../../../../shared/components/credix-button/credix-button.module';
import {CredixSelectModule} from '../../../../../shared/components/credix-select/credix-select.module';
import {CredixLinkButtonModule} from '../../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixCodeInputModule} from '../../../../../shared/components/credix-code-input/credix-code-input.module';
import {SharedModule} from '../../../../../shared/shared.module';
// tslint:disable-next-line:max-line-length
import {CredixResultNotificationModule} from '../../../../../shared/components/credix-result-notification/credix-result-notification.module';

const routes: Routes = [
  {
    path: '',
    component: IbanAccountsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    IbanAccountsComponent
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
    CredixCodeInputModule,
    CredixResultNotificationModule
  ],
  providers: [
    ModalService,
    IbanAccountsService
  ]
})
export class IbanAccountsModule {
}
