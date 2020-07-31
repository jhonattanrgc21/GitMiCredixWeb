import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CredixFormsModule} from '../../../../shared/directives/credix-forms/credix-forms.module';
import {CredixTooltipsModule} from '../../../../shared/directives/credix-tooltips/credix-tooltips.module';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {ModalService} from '../../../../core/services/modal.service';
import {CredixResultNotificationModule} from "../../../../shared/components/credix-result-notification/credix-result-notification.module";
import {CredixCodeInputModule} from "../../../../shared/components/credix-code-input/credix-code-input.module";


const maskConfig: Partial<IConfig> = {
  validation: false,
};

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  }
];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CredixButtonModule,
    ReactiveFormsModule,
    CredixFormsModule,
    CredixTooltipsModule,
    NgxMaskModule.forRoot(maskConfig),
    CredixLinkButtonModule,
    CredixCardsModule,
    CredixResultNotificationModule,
    CredixCodeInputModule
  ],
  providers: [ModalService]
})
export class SignInModule {
}
