import {Directive, HostListener, Input} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixStepperNext]'
})
export class CredixStepperNextDirective {
  @Input() stepper: CdkStepper;

  constructor() {

  }

  @HostListener('click') onClick() {
    this.stepper.selectedIndex = this.stepper.selectedIndex + 1;
    this.stepper.next();
  }

}
