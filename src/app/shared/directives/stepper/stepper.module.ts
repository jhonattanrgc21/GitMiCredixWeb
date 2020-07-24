import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixStepperNextDirective} from './credix-stepper-next.directive';
import {CredixStepperPreviousDirective} from './credix-stepper-previous.directive';


@NgModule({
  declarations: [CredixStepperNextDirective, CredixStepperPreviousDirective],
  exports: [
    CredixStepperNextDirective,
    CredixStepperPreviousDirective
  ],
  imports: [
    CommonModule
  ]
})
export class StepperModule {
}
