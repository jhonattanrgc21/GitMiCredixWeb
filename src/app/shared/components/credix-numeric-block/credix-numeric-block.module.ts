import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixNumericBlockComponent} from './credix-numeric-block.component';
import {IConfig, NgxMaskModule} from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [CredixNumericBlockComponent],
  exports: [
    CredixNumericBlockComponent
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(maskConfig),
  ]
})
export class CredixNumericBlockModule {
}
