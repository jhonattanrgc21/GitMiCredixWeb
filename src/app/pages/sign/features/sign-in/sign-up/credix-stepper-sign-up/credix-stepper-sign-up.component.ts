import {Component} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-stepper-sign-up',
  templateUrl: './credix-stepper-sign-up.component.html',
  styleUrls: ['./credix-stepper-sign-up.component.scss'],
  providers: [{provide: CdkStepper, useExisting: CredixStepperSignUpComponent}]
})
export class CredixStepperSignUpComponent extends CdkStepper {
  linear = true;

}
