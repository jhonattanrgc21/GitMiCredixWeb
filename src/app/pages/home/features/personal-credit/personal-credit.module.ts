import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalCreditComponent} from './personal-credit.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {FlexModule} from '@angular/flex-layout';
import {CredixStepperModule} from '../../../../shared/components/credix-stepper/credix-stepper.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixRadioButtonModule} from '../../../../shared/components/credix-radio-button/credix-radio-button.module';
import {MatDividerModule} from '@angular/material/divider';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {MatOptionModule} from '@angular/material/core';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixSliderModule} from '../../../../shared/components/credix-slider/credix-slider.module';
import {CredixNumericBlockModule} from '../../../../shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {MatIconModule} from '@angular/material/icon';
import {PersonalCreditService} from './personal-credit.service';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {PersonalCreditFirstStepComponent} from './personal-credit-first-step/personal-credit-first-step.component';
import {PersonalCreditSecondStepComponent} from './personal-credit-second-step/personal-credit-second-step.component';
import {PersonalCreditThirdStepComponent} from './personal-credit-third-step/personal-credit-third-step.component';
import {CredixConfirmationPopupModule} from '../../../../shared/components/credix-confirmation-popup/credix-confirmation-popup.module';
import {ModalService} from '../../../../core/services/modal.service';

const routes: Routes = [
  {
    path: '',
    component: PersonalCreditComponent
  }
];

@NgModule({
  declarations: [
    PersonalCreditComponent,
    PersonalCreditFirstStepComponent,
    PersonalCreditSecondStepComponent,
    PersonalCreditThirdStepComponent
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
    CredixResultNotificationModule,
    CredixConfirmationPopupModule
  ],
  providers: [
    PersonalCreditService,
    ModalService]
})
export class PersonalCreditModule {
}
