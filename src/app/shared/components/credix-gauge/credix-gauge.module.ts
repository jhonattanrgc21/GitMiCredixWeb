import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixGaugeComponent} from './credix-gauge.component';
import {NgxGaugeModule} from 'ngx-gauge';


@NgModule({
  declarations: [CredixGaugeComponent],
  exports: [
    CredixGaugeComponent
  ],
  imports: [
    CommonModule,
    NgxGaugeModule
  ]
})
export class CredixGaugeModule {
}
