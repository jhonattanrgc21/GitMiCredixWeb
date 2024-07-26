import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';
import { CredixStepperSignUpComponent } from './credix-stepper-sign-up.component';


@NgModule({
  declarations: [CredixStepperSignUpComponent],
  exports: [
    CredixStepperSignUpComponent
  ],
  imports: [
    CommonModule,
    CdkStepperModule,
    MatStepperModule
  ]
})
export class CredixStepperSignUpModule {
}
