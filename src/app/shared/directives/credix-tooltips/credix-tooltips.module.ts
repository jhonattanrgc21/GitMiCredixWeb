import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixPasswordFieldTooltipDirective} from './credix-password-field-tooltip.directive';
import {CredixPasswordFieldTooltipComponent} from './credix-password-field-tooltip/credix-password-field-tooltip.component';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [CredixPasswordFieldTooltipDirective, CredixPasswordFieldTooltipComponent],
  exports: [
    CredixPasswordFieldTooltipDirective
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule
  ]
})
export class CredixTooltipsModule {
}
