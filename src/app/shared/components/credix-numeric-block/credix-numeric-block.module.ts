import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixNumericBlockComponent} from './credix-numeric-block.component';


@NgModule({
  declarations: [CredixNumericBlockComponent],
  exports: [
    CredixNumericBlockComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CredixNumericBlockModule {
}
