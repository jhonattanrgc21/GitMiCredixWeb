import {Directive, HostListener, Input} from '@angular/core';
import {CdkStepper} from '@angular/cdk/stepper';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[credixStepperPrevious]'
})
export class CredixStepperPreviousDirective {
  @Input() stepper: CdkStepper;

  constructor() {
  }

  @HostListener('click') onClick() {
    this.stepper.selectedIndex = this.stepper.selectedIndex - 1;
    this.stepper.previous();
  }
}
