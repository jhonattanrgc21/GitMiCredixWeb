import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixTextFieldDirective} from './credix-text-field.directive';
import {CredixFormFieldDirective} from './credix-form-field.directive';


@NgModule({
  declarations: [CredixTextFieldDirective, CredixFormFieldDirective],
  exports: [
    CredixTextFieldDirective,
    CredixFormFieldDirective
  ],
  imports: [
    CommonModule
  ]
})
export class CredixFormsModule {
}
