import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PhoneMaskPipe} from './phone-mask.pipe';


@NgModule({
  declarations: [PhoneMaskPipe],
  exports: [
    PhoneMaskPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PhoneMaskModule {
}
