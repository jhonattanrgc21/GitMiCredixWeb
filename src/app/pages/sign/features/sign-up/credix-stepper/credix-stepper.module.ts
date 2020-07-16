import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixStepperComponent} from './credix-stepper.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatStepperModule} from '@angular/material/stepper';


@NgModule({
  declarations: [CredixStepperComponent],
  exports: [
    CredixStepperComponent
  ],
  imports: [
    CommonModule,
    CdkStepperModule,
    MatStepperModule
  ]
})
export class CredixStepperModule {
}
