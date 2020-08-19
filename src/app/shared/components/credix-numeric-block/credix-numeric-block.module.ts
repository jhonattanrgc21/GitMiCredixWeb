import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixNumericBlockComponent} from './credix-numeric-block.component';
import {NgxMaskModule} from 'ngx-mask';

@NgModule({
  declarations: [CredixNumericBlockComponent],
  exports: [
    CredixNumericBlockComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule,
  ]
})
export class CredixNumericBlockModule {
}
