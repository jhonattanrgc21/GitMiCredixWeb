import {animate, AnimationTriggerMetadata, style, transition, trigger} from '@angular/animations';

export const credixToastAnimations: {
  readonly fadeToast: AnimationTriggerMetadata;
} = {
  fadeToast:
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate('200ms ease-in-out', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({transform: 'translateY(-100%)'}))
      ])
    ])
};
