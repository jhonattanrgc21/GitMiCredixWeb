import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleQuotasComponent } from './schedule-quotas.component';
import { FlexModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import {SharedModule} from '../../../../shared/shared.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalService} from 'src/app/core/services/modal.service';
import {CredixStepperModule} from 'src/app/shared/components/credix-stepper/credix-stepper.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {StepperModule} from 'src/app/shared/directives/stepper/stepper.module';
import {CredixCheckboxButtonModule} from 'src/app/shared/components/credix-checkbox-button/credix-checkbox-button.module';
import {CredixSliderModule} from 'src/app/shared/components/credix-slider/credix-slider.module';
import {CredixRadioButtonModule} from '../../../../shared/components/credix-radio-button/credix-radio-button.module';
import {CredixLinkButtonModule} from 'src/app/shared/components/credix-link-button/credix-link-button.module';
import {CredixCodeInputModule} from 'src/app/shared/components/credix-code-input/credix-code-input.module';
import {SimplebarAngularModule} from 'simplebar-angular';
// tslint:disable-next-line:max-line-length
import {CredixNumericBlockModule} from 'src/app/shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixResultNotificationModule} from 'src/app/shared/components/credix-result-notification/credix-result-notification.module';
import {CredixShareButtonModule} from 'src/app/shared/components/credix-share-button/credix-share-button.module';
import {NgxMaskModule} from 'ngx-mask';
import {CredixSelectModule} from 'src/app/shared/components/credix-select/credix-select.module';
import {CredixInputFieldModule} from 'src/app/shared/components/credix-input-field/credix-input-field.module';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';

import {CredixCodeLinkModule} from '../../../../shared/components/credix-code-link/credix-code-link.module';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {CredixTextareaFieldModule} from '../../../../shared/components/credix-textarea-field/credix-textarea-field.module';
import { CredixNumericBlockSpecificModule } from 'src/app/shared/components/credix-numeric-block-specific/credix-numeric-block-specific.module';
import { ScheduleQuotasService } from './schedule-quotas.service';
import { ScheduleQuotasFirstStepComponent } from './schedule-quotas-first-step/schedule-quotas-first-step.component';
import { ScheduleQuotasSecondStepComponent } from './schedule-quotas-second-step/schedule-quotas-second-step.component';
import { ScheduleQuotasThirdStepComponent } from './schedule-quotas-third-step/schedule-quotas-third-step.component';
import { DateRangePopupComponent } from './schedule-quotas-second-step/date-range-popup/date-range-popup.component';
import { CredixDatePickerModule } from 'src/app/shared/components/credix-date-picker/credix-date-picker.module';
import { InformationPopupComponent } from './information-popup/information-popup.component';
import { RuleCardComponent } from './rule-card/rule-card.component';
import { MatIconModule } from '@angular/material/icon';
import { InProgressPopupComponent } from './in-progress-popup/in-progress-popup.component';


const routes: Routes = [
  {
    path: '',
    component: ScheduleQuotasComponent
  }
];

@NgModule({
  declarations: [ScheduleQuotasComponent, ScheduleQuotasFirstStepComponent, ScheduleQuotasSecondStepComponent, ScheduleQuotasThirdStepComponent, DateRangePopupComponent, InformationPopupComponent, RuleCardComponent, InProgressPopupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    SharedModule,
    CredixButtonModule,
    ReactiveFormsModule,
    CredixStepperModule,
    CredixCheckboxButtonModule,
    CredixSliderModule,
    CredixLinkButtonModule,
    CredixCodeInputModule,
    CredixNumericBlockModule,
    CredixResultNotificationModule,
    CredixShareButtonModule,
    CredixSelectModule,
    CredixInputFieldModule,
    CdkStepperModule,
    StepperModule,
    CredixRadioButtonModule,
    SimplebarAngularModule,
    NgxMaskModule,
    CredixCardsModule,
    CredixDividerModule,
    CredixCodeLinkModule,
    CredixResultViewModule,
    DateFormatterModule,
    CredixTextareaFieldModule,
    CredixNumericBlockSpecificModule,
    CredixDatePickerModule,
    MatIconModule
  ], providers: [
    ScheduleQuotasService,
    ModalService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class ScheduleQuotasModule { }
