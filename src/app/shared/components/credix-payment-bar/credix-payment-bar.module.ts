import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixPaymentBarComponent} from './credix-payment-bar.component';


@NgModule({
  declarations: [CredixPaymentBarComponent],
  exports: [CredixPaymentBarComponent],
  imports: [
    CommonModule
  ]
})
export class CredixPaymentBarModule {
}
