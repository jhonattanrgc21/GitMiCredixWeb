import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CredixButtonModule } from 'src/app/shared/components/credix-button/credix-button.module';
import { CredixPopupModule } from 'src/app/shared/components/credix-popup/credix-popup.module';
import { CredixConfirmationPopupModule } from 'src/app/shared/components/credix-confirmation-popup/credix-confirmation-popup.module';
import { ModalService } from 'src/app/core/services/modal.service';
import { CredixPopupComponent } from 'src/app/shared/components/credix-popup/credix-popup.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperModule } from 'src/app/shared/directives/stepper/stepper.module';
import { CredixStepperModule } from './credix-stepper/credix-stepper.module';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  }
];

@NgModule({
  declarations: [SignUpComponent],
  entryComponents: [CredixPopupComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CredixButtonModule,
    CredixPopupModule,
    CredixConfirmationPopupModule,
    CredixStepperModule,
    CdkStepperModule,
    StepperModule
  ],
  providers: [ModalService]
})
export class SignUpModule { }
