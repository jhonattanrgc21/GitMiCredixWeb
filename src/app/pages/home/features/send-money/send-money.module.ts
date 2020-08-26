import {NgModule} from '@angular/core';
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
import {FirstStepComponent} from './first-step/first-step.component';
import {SecondStepComponent} from './second-step/second-step.component';
import {ThirdStepComponent} from './third-step/third-step.component';
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
import {ModalAddIbanComponent} from './first-step/modal-add-iban/modal-add-iban.component';
import {CredixCheckboxButtonModule} from '../../../../shared/components/credix-checkbox-button/credix-checkbox-button.module';
import {ModalDetailsComponent} from './second-step/modal-details/modal-details.component';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';

const routes: Routes = [
  {
    path: '',
    component: SendMoneyComponent
  }
];

@NgModule({
  declarations: [
    SendMoneyComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent,
    ModalAddIbanComponent,
    ModalDetailsComponent],
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
    CredixDividerModule
  ],
  providers: [SendMoneyService]
})
export class SendMoneyModule {
}
