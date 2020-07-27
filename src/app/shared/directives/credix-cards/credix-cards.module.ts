import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixCardDirective} from './credix-card.directive';


@NgModule({
  declarations: [CredixCardDirective],
  exports: [
    CredixCardDirective
  ],
  imports: [
    CommonModule
  ]
})
export class CredixCardsModule {
}
