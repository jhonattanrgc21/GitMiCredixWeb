import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmailMaskPipe} from './email-mask.pipe';


@NgModule({
  declarations: [EmailMaskPipe],
  exports: [
    EmailMaskPipe
  ],
  imports: [
    CommonModule
  ]
})
export class EmailMaskModule {
}
