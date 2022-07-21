import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CredixTooltipsModule} from '../../../../shared/directives/credix-tooltips/credix-tooltips.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {ModalService} from '../../../../core/services/modal.service';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixCodeInputModule} from '../../../../shared/components/credix-code-input/credix-code-input.module';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {SignInService} from './sign-in.service';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {CredixStepperSignUpComponent} from '../../../../shared/components/credix-stepper-sign-up/credix-stepper-sign-up.component';
import {ForgotPasswordService} from './forgot-password/forgot-password.service';
import {SignUpService} from './sign-up/sign-up.service';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {CredixCodeLinkModule} from '../../../../shared/components/credix-code-link/credix-code-link.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {StepperModule} from '../../../../shared/directives/stepper/stepper.module';
import {MatStepperModule} from '@angular/material/stepper';
import {PopupCompletedComponent} from './popup-completed/popup-completed.component';
import {CredixRadioButtonModule} from "../../../../shared/components/credix-radio-button/credix-radio-button.module";
import {CredixResultViewModule} from "../../../../shared/components/credix-result-view/credix-result-view.module";

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  }
];

@NgModule({
  declarations: [
    SignInComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    CredixStepperSignUpComponent,
    PopupCompletedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CredixButtonModule,
    ReactiveFormsModule,
    CredixTooltipsModule,
    CredixLinkButtonModule,
    CredixCardsModule,
    CredixResultNotificationModule,
    CredixCodeInputModule,
    CredixInputFieldModule,
    CredixSelectModule,
    CredixCodeLinkModule,
    CdkStepperModule,
    StepperModule,
    MatStepperModule,
    CredixRadioButtonModule,
    CredixResultViewModule
  ],
  providers: [
    SignInService,
    ForgotPasswordService,
    SignUpService,
    ModalService
  ]
})
export class SignInModule {
}
