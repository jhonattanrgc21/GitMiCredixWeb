import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarchamosComponent} from './marchamos.component';
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
import {PopupMarchamosDetailComponent} from './popup-marchamos-detail/popup-marchamos-detail.component';
import {CredixCodeInputModule} from 'src/app/shared/components/credix-code-input/credix-code-input.module';
import {PopupMarchamosNewDirectionComponent} from './popup-marchamos-new-direction/popup-marchamos-new-direction.component';
import {SimplebarAngularModule} from 'simplebar-angular';
import {PopupMarchamosPayResumeComponent} from './popup-marchamos-pay-resume/popup-marchamos-pay-resume.component';
import {CredixNumericBlockModule} from 'src/app/shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixResultNotificationModule} from 'src/app/shared/components/credix-result-notification/credix-result-notification.module';
import {CredixShareButtonModule} from 'src/app/shared/components/credix-share-button/credix-share-button.module';
import {NgxMaskModule} from 'ngx-mask';
import {FirstStepComponent} from './first-step/first-step.component';
import {CredixSelectModule} from 'src/app/shared/components/credix-select/credix-select.module';
import {CredixInputFieldModule} from 'src/app/shared/components/credix-input-field/credix-input-field.module';
import {SecondStepMarchamoComponent} from './second-step-marchamo/second-step-marchamo.component';
import {ResultPayResumeComponent} from './result-pay-resume/result-pay-resume.component';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {MarchamosService} from './marchamos.service';
import { ThirstyStepMarchamoComponent } from './thirsty-step-marchamo/thirsty-step-marchamo.component';
import { FourStepMarchamoComponent } from './four-step-marchamo/four-step-marchamo.component';

const routes: Routes = [
  {
    path: '',
    component: MarchamosComponent
  }
];

@NgModule({
  declarations: [
    MarchamosComponent,
    PopupMarchamosDetailComponent,
    PopupMarchamosNewDirectionComponent,
    PopupMarchamosPayResumeComponent,
    FirstStepComponent,
    SecondStepMarchamoComponent,
    ResultPayResumeComponent,
    ThirstyStepMarchamoComponent,
    FourStepMarchamoComponent
  ],
  entryComponents: [MarchamosComponent],
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
    CredixDividerModule
  ],
  providers: [
    MarchamosService,
    ModalService
  ]

})
export class MarchamosModule {
}
