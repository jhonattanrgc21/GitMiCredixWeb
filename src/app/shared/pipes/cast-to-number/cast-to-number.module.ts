import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CastToNumberPipe} from './cast-to-number.pipe';


@NgModule({
  declarations: [CastToNumberPipe],
  exports: [
    CastToNumberPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CastToNumberModule {
}
