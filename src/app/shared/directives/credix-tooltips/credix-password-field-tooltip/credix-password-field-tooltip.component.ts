import {Component, Input, OnInit} from '@angular/core';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {animate, style, transition, trigger} from '@angular/animations';
import {ValidationErrors} from '@angular/forms';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-password-field-tooltip',
  templateUrl: './credix-password-field-tooltip.component.html',
  styleUrls: ['./credix-password-field-tooltip.component.scss'],
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({opacity: 0}),
        animate(300, style({opacity: 1})),
      ]),
      transition(':leave', [
        animate(300, style({opacity: 0})),
      ]),
    ]),
  ]
})
export class CredixPasswordFieldTooltipComponent implements OnInit {
  @Input() errors: ValidationErrors | null;
  @Input() tooltipType: 'password' | 'pin' = 'password';
  isTablet: boolean;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.checkScreenBreakpoint();
  }

  checkScreenBreakpoint() {
    this.breakpointObserver
      .observe(['(max-width: 1199px)'])
      .subscribe((state: BreakpointState) => {
        this.isTablet = state.matches;
      });
  }

}
