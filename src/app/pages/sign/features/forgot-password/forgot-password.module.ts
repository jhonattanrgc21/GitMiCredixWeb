import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexModule} from '@angular/flex-layout';

import {ForgotPasswordComponent} from './forgot-password.component';
import {ModalService} from '../../../../core/services/modal.service';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixPopupModule} from '../../../../shared/components/credix-popup/credix-popup.module';
import {SharedModule} from '../../../../shared/shared.module';
import {CredixTooltipsModule} from '../../../../shared/directives/credix-tooltips/credix-tooltips.module';
import {CredixFormsModule} from '../../../../shared/directives/credix-forms/credix-forms.module';
import {CredixCodeInputModule} from 'src/app/shared/components/credix-code-input/credix-code-input.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixCodeLinkModule} from '../../../../shared/components/credix-code-link/credix-code-link.module';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordComponent
  }
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FlexModule,
    CredixButtonModule,
    CredixPopupModule,
    SharedModule,
    CredixTooltipsModule,
    CredixFormsModule,
    CredixCodeInputModule,
    CredixLinkButtonModule,
    CredixSelectModule,
    CredixInputFieldModule,
    CredixCodeLinkModule

  ],
  providers: [ModalService]
})
export class ForgotPasswordModule {
}
