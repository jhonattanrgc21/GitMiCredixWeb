import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixTextFieldDirective} from './credix-text-field.directive';


@NgModule({
  declarations: [CredixTextFieldDirective],
  exports: [
    CredixTextFieldDirective
  ],
  imports: [
    CommonModule
  ]
})
export class CredixFormsModule {
}
