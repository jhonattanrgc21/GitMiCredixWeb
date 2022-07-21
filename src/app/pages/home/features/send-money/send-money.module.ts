import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {SendMoneyComponent} from './send-money.component';
import {MatCardModule} from '@angular/material/card';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {FlexModule} from '@angular/flex-layout';
import {CredixStepperModule} from '../../../../shared/components/credix-stepper/credix-stepper.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {RouterModule, Routes} from '@angular/router';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {SendMoneyFirstStepComponent} from './send-money-first-step/send-money-first-step.component';
import {SendMoneySecondStepComponent} from './send-money-second-step/send-money-second-step.component';
import {SendMoneyThirdStepComponent} from './send-money-third-step/send-money-third-step.component';
import {CredixRadioButtonModule} from '../../../../shared/components/credix-radio-button/credix-radio-button.module';
import {MatDividerModule} from '@angular/material/divider';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {MatOptionModule} from '@angular/material/core';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixSliderModule} from '../../../../shared/components/credix-slider/credix-slider.module';
import {CredixNumericBlockModule} from '../../../../shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {MatIconModule} from '@angular/material/icon';
import {CredixCodeInputModule} from '../../../../shared/components/credix-code-input/credix-code-input.module';
import {SendMoneyService} from './send-money.service';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixShareButtonModule} from '../../../../shared/components/credix-share-button/credix-share-button.module';
import {ModalAddIbanComponent} from './send-money-first-step/modal-add-iban/modal-add-iban.component';
import {CredixCheckboxButtonModule} from '../../../../shared/components/credix-checkbox-button/credix-checkbox-button.module';
import {ModalDetailsComponent} from './send-money-second-step/modal-details/modal-details.component';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {ModalService} from '../../../../core/services/modal.service';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import {CredixCodeLinkModule} from '../../../../shared/components/credix-code-link/credix-code-link.module';
import {AccountApiService} from '../../../../core/services/account-api.service';
import {GlobalApiService} from '../../../../core/services/global-api.service';
import {CustomerApiService} from '../../../../core/services/customer-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  {
    path: '',
    component: SendMoneyComponent
  }
];

@NgModule({
  declarations: [
    SendMoneyComponent,
    SendMoneyFirstStepComponent,
    SendMoneySecondStepComponent,
    SendMoneyThirdStepComponent,
    ModalAddIbanComponent,
    ModalDetailsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    CredixCardsModule,
    FlexModule,
    CredixStepperModule,
    CdkStepperModule,
    CredixButtonModule,
    CredixRadioButtonModule,
    MatDividerModule,
    CredixSelectModule,
    MatOptionModule,
    CredixInputFieldModule,
    CredixSliderModule,
    CredixNumericBlockModule,
    CredixLinkButtonModule,
    MatIconModule,
    CredixCodeInputModule,
    CredixResultNotificationModule,
    CredixShareButtonModule,
    ReactiveFormsModule,
    CredixCheckboxButtonModule,
    CredixDividerModule,
    CredixResultViewModule,
    CredixCodeLinkModule,
    MatFormFieldModule,
  ],
  providers: [
    SendMoneyService,
    ModalService,
    AccountApiService,
    GlobalApiService,
    CustomerApiService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class SendMoneyModule {
}
