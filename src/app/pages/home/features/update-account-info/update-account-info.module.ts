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

@NgModule({
  declarations: [
    UpdateAccountInfoReminderPopUp,
    UpdateAccountInfoPopUp,
    PersonalInfoStepComponent,
    IncomeStepComponent,
    AdressStepComponent
  ],
  imports: [ CommonModule, SharedModule, CredixButtonModule, MatButtonModule, CdkStepperModule, CredixStepperSignUpModule ],
  providers: [ModalService]
})
export class UpdateAccountInfoModule {}
