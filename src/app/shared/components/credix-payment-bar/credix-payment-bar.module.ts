import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixPaymentBarComponent} from './credix-payment-bar.component';
import {DateFormatterModule} from '../../pipes/date-formatter/date-formatter.module';


@NgModule({
  declarations: [CredixPaymentBarComponent],
  exports: [CredixPaymentBarComponent],
  imports: [
    CommonModule,
    DateFormatterModule
  ]
})
export class CredixPaymentBarModule {
}
