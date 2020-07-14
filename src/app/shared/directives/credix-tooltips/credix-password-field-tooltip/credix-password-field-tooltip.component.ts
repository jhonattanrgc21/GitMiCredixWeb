import {Component, Input, OnInit} from '@angular/core';
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

  constructor() {
  }

  ngOnInit(): void {
  }

}
