import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarchamosComponent} from './marchamos.component';

import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {SharedModule} from '../../../../shared/shared.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpService} from 'src/app/core/services/http.service';
import {CustomIconLoaderService} from 'src/app/core/services/custom-icon-loader.service';
import {ModalService} from 'src/app/core/services/modal.service';
import {CredixStepperModule} from 'src/app/shared/components/credix-stepper/credix-stepper.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {StepperModule} from 'src/app/shared/directives/stepper/stepper.module';
import {IConfig, NgxMaskModule} from 'ngx-mask';
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
import { FirstStepComponent } from './first-step/first-step.component';
import { CredixSelectModule } from 'src/app/shared/components/credix-select/credix-select.module';
import { CredixInputFieldModule } from 'src/app/shared/components/credix-input-field/credix-input-field.module';
import { ConsultInformationComponent } from './consult-information/consult-information.component';
import { SecondStepMarchamoComponent } from './second-step-marchamo/second-step-marchamo.component';
import { SecondStepOptionalInsurancesComponent } from './second-step-optional-insurances/second-step-optional-insurances.component';
import { SecondStepQuotesComponent } from './second-step-quotes/second-step-quotes.component';
import { ThirstyStepEmailRegisteredComponent } from './thirsty-step-email-registered/thirsty-step-email-registered.component';
import { ThirstyStepPlaceOfRetreatComponent } from './thirsty-step-place-of-retreat/thirsty-step-place-of-retreat.component';
import { FourStepConfirmContactComponent } from './four-step-confirm-contact/four-step-confirm-contact.component';
import { FourStepConfirmPayResumeComponent } from './four-step-confirm-pay-resume/four-step-confirm-pay-resume.component';
import { ResultPayResumeComponent } from './result-pay-resume/result-pay-resume.component';


const maskConfig: Partial<IConfig> = {
  validation: false,
};

const routes: Routes = [
  {
    path: '',
    component: MarchamosComponent
  }
];

@NgModule({
  declarations: [MarchamosComponent, PopupMarchamosDetailComponent, PopupMarchamosNewDirectionComponent, PopupMarchamosPayResumeComponent, FirstStepComponent, ConsultInformationComponent, SecondStepMarchamoComponent, SecondStepOptionalInsurancesComponent, SecondStepQuotesComponent, ThirstyStepEmailRegisteredComponent, ThirstyStepPlaceOfRetreatComponent, FourStepConfirmContactComponent, FourStepConfirmPayResumeComponent, ResultPayResumeComponent],
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
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    HttpService,
    CustomIconLoaderService,
    ModalService
  ]

})
export class MarchamosModule {
}
