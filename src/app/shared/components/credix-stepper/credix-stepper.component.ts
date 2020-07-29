import {Component} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-stepper',
  templateUrl: './credix-stepper.component.html',
  styleUrls: ['./credix-stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: CredixStepperComponent}]
})
export class CredixStepperComponent extends CdkStepper {
  linear = true;

}
