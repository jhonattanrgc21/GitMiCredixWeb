import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdditionalCardsManagementService} from './additional-cards-management.service';
import {ModalService} from '../../../../core/services/modal.service';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {NewAdditionalCardComponent} from './new-additional-card/new-additional-card.component';
import {AdditionalCardsComponent} from './additional-cards/additional-cards.component';
import {MatCardModule} from '@angular/material/card';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {MatIconModule} from '@angular/material/icon';
import {CredixSliderModule} from '../../../../shared/components/credix-slider/credix-slider.module';
import {CredixStepperModule} from '../../../../shared/components/credix-stepper/credix-stepper.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {NewAdditionalCardFirstStepComponent} from './new-additional-card/new-additional-card-first-step/new-additional-card-first-step.component';
import {NewAdditionalCardSecondStepComponent} from './new-additional-card/new-additional-card-second-step/new-additional-card-second-step.component';
import {NewAdditionalCardThirdStepComponent} from './new-additional-card/new-additional-card-third-step/new-additional-card-third-step.component';
import {MatDividerModule} from '@angular/material/divider';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {MatOptionModule} from '@angular/material/core';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {CredixRadioButtonModule} from '../../../../shared/components/credix-radio-button/credix-radio-button.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {NgxMaskModule} from 'ngx-mask';
import {NewAddressPopupComponent} from './new-additional-card/new-additional-card-second-step/new-address-popup/new-address-popup.component';
import {CredixTextareaFieldModule} from '../../../../shared/components/credix-textarea-field/credix-textarea-field.module';
import {CredixCodeInputModule} from '../../../../shared/components/credix-code-input/credix-code-input.module';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import {CredixCodeLinkModule} from '../../../../shared/components/credix-code-link/credix-code-link.module';
import {ChannelsApiService} from '../../../../core/services/channels-api.service';
import {GlobalApiService} from '../../../../core/services/global-api.service';
import {CredixDatePickerModule} from '../../../../shared/components/credix-date-picker/credix-date-picker.module';
import {CredixCalendarInputModule} from '../../../../shared/components/credix-calendar-input/credix-calendar-input.module';

const routes: Routes = [
  {
    path: '',
    component: AdditionalCardsComponent
  },
  {
    path: 'new-card',
    component: NewAdditionalCardComponent
  }
];

@NgModule({
  declarations: [
    AdditionalCardsComponent,
    NewAdditionalCardComponent,
    NewAdditionalCardFirstStepComponent,
    NewAdditionalCardSecondStepComponent,
    NewAdditionalCardThirdStepComponent,
    NewAddressPopupComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixCardsModule,
    MatCardModule,
    CredixButtonModule,
    CredixResultNotificationModule,
    MatIconModule,
    CredixSliderModule,
    CredixStepperModule,
    CdkStepperModule,
    MatDividerModule,
    CredixDividerModule,
    CredixInputFieldModule,
    ReactiveFormsModule,
    CredixSelectModule,
    MatOptionModule,
    DateFormatterModule,
    CredixRadioButtonModule,
    CredixLinkButtonModule,
    NgxMaskModule,
    CredixTextareaFieldModule,
    CredixCodeInputModule,
    CredixResultViewModule,
    CredixCodeLinkModule,
    CredixDatePickerModule,
    CredixCalendarInputModule
  ],
  providers: [
    AdditionalCardsManagementService,
    ModalService,
    ChannelsApiService,
    GlobalApiService
  ]
})
export class AdditionalCardsManagementModule {
}
