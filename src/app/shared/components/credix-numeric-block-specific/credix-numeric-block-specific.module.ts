import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixNumericBlockSpecificComponent} from './credix-numeric-block-specific.component';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [CredixNumericBlockSpecificComponent],
  exports: [
    CredixNumericBlockSpecificComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule,
  ]
})
export class CredixNumericBlockSpecificModule {
}
