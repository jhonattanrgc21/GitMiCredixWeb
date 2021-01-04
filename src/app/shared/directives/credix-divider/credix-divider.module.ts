import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixDividerDirective} from './credix-divider.directive';

@NgModule({
  declarations: [CredixDividerDirective],
  exports: [
    CredixDividerDirective
  ],
  imports: [
    CommonModule
  ]
})
export class CredixDividerModule {
}
