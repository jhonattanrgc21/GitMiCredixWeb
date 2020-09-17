import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {ChangePasswordComponent} from './change-password.component';
import {CredixPopupModule} from '../../../../shared/components/credix-popup/credix-popup.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixConfirmationPopupModule} from '../../../../shared/components/credix-confirmation-popup/credix-confirmation-popup.module';
import {ModalService} from '../../../../core/services/modal.service';
import {SharedModule} from '../../../../shared/shared.module';
import {CredixFormsModule} from '../../../../shared/directives/credix-forms/credix-forms.module';
import {CredixCodeInputModule} from '../../../../shared/components/credix-code-input/credix-code-input.module';
import {CredixShareButtonModule} from '../../../../shared/components/credix-share-button/credix-share-button.module';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixTooltipsModule} from '../../../../shared/directives/credix-tooltips/credix-tooltips.module';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';

const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent
  }
];

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixPopupModule,
    CredixConfirmationPopupModule,
    CredixButtonModule,
    SharedModule,
    CredixShareButtonModule,
    CredixCardsModule,
    CredixLinkButtonModule,
    CredixFormsModule,
    CredixCodeInputModule,
    CredixInputFieldModule,
    ReactiveFormsModule,
    CredixTooltipsModule,
    CredixResultNotificationModule,
    CredixDividerModule

  ],
  providers: [ModalService]
})
export class ChangePasswordModule {
}
