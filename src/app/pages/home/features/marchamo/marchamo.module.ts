import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarchamoComponent} from './marchamo.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {SharedModule} from '../../../../shared/shared.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ModalService} from 'src/app/core/services/modal.service';
import {CredixStepperModule} from 'src/app/shared/components/credix-stepper/credix-stepper.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {StepperModule} from 'src/app/shared/directives/stepper/stepper.module';
import {CredixFormsModule} from 'src/app/shared/directives/credix-forms/credix-forms.module';
import {CredixCheckboxButtonModule} from 'src/app/shared/components/credix-checkbox-button/credix-checkbox-button.module';
import {CredixSliderModule} from 'src/app/shared/components/credix-slider/credix-slider.module';
import {CredixRadioButtonModule} from '../../../../shared/components/credix-radio-button/credix-radio-button.module';
import {CredixLinkButtonModule} from 'src/app/shared/components/credix-link-button/credix-link-button.module';
import {PopupMarchamosDetailComponent} from './marchamo-second-step/popup-marchamos-detail/popup-marchamos-detail.component';
import {CredixCodeInputModule} from 'src/app/shared/components/credix-code-input/credix-code-input.module';
import {SimplebarAngularModule} from 'simplebar-angular';
// tslint:disable-next-line:max-line-length
import {PopupMarchamosPaymentSummaryComponent} from './marchamo-second-step/popup-marchamos-payment-summary/popup-marchamos-payment-summary.component';
import {CredixNumericBlockModule} from 'src/app/shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixResultNotificationModule} from 'src/app/shared/components/credix-result-notification/credix-result-notification.module';
import {CredixShareButtonModule} from 'src/app/shared/components/credix-share-button/credix-share-button.module';
import {NgxMaskModule} from 'ngx-mask';
import {MarchamoFirstStepComponent} from './marchamo-first-step/marchamo-first-step.component';
import {CredixSelectModule} from 'src/app/shared/components/credix-select/credix-select.module';
import {CredixInputFieldModule} from 'src/app/shared/components/credix-input-field/credix-input-field.module';
import {MarchamoSecondStepComponent} from './marchamo-second-step/marchamo-second-step.component';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {MarchamoService} from './marchamo.service';
import {MarchamoThirdStepComponent} from './marchamo-third-step/marchamo-third-step.component';
import {MarchamoFourthStepComponent} from './marchamo-fourth-step/marchamo-fourth-step.component';
import {CredixCodeLinkModule} from '../../../../shared/components/credix-code-link/credix-code-link.module';
import {NewAddressPopupComponent} from './marchamo-third-step/new-address-popup/new-address-popup.component';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {CredixTextareaFieldModule} from '../../../../shared/components/credix-textarea-field/credix-textarea-field.module';

const routes: Routes = [
  {
    path: '',
    component: MarchamoComponent
  }
];

@NgModule({
  declarations: [
    MarchamoComponent,
    MarchamoFirstStepComponent,
    MarchamoSecondStepComponent,
    PopupMarchamosDetailComponent,
    PopupMarchamosPaymentSummaryComponent,
    MarchamoThirdStepComponent,
    NewAddressPopupComponent,
    MarchamoFourthStepComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    SharedModule,
    CredixButtonModule,
    ReactiveFormsModule,
    CredixStepperModule,
    CredixFormsModule,
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
    CredixTextareaFieldModule
  ],
  providers: [
    MarchamoService,
    ModalService
  ]

})
export class MarchamoModule {
}
