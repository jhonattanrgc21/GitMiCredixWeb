import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateAccountInfoReminderPopUp } from './update-account-info-reminder-popup/update-account-info-reminder-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CredixButtonModule } from 'src/app/shared/components/credix-button/credix-button.module';
import { MatButtonModule } from '@angular/material/button';
import { ModalService } from 'src/app/core/services/modal.service';
import { UpdateAccountInfoPopUp } from './update-account-info-popup/update-account-info-popup.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CredixStepperSignUpModule } from 'src/app/shared/components/credix-stepper-sign-up/credix-stepper-sign-up.module';
import { IncomeStepComponent } from './income-step/income-step.component';
import { AdressStepComponent } from './address-step/adress-step.component';
import { PersonalInfoStepComponent } from './personal-info-step/personal-info-step.component';
import { CredixInputFieldModule } from 'src/app/shared/components/credix-input-field/credix-input-field.module';
import { CredixSelectModule } from 'src/app/shared/components/credix-select/credix-select.module';
import { GlobalApiService } from 'src/app/core/services/global-api.service';
import { CredixDatePickerModule } from 'src/app/shared/components/credix-date-picker/credix-date-picker.module';
import { CredixLinkButtonModule } from 'src/app/shared/components/credix-link-button/credix-link-button.module';
import { IdPhotoUploadComponent } from './id-photo-upload/id-photo-upload.component';
import { CredixImageUploadModule } from 'src/app/shared/components/credix-image-upload/credix-image-upload.module';

@NgModule({
  declarations: [
    UpdateAccountInfoReminderPopUp,
    UpdateAccountInfoPopUp,
    PersonalInfoStepComponent,
    IncomeStepComponent,
    AdressStepComponent,
    IdPhotoUploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    CdkStepperModule,
    CredixButtonModule,
    CredixStepperSignUpModule,
    CredixInputFieldModule,
    CredixSelectModule,
    CredixDatePickerModule,
    CredixLinkButtonModule,
    CredixImageUploadModule
  ],
  providers: [
    ModalService,
    GlobalApiService
  ]
})
export class UpdateAccountInfoModule { }
