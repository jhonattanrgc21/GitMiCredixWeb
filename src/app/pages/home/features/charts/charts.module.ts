import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsComponent} from './charts.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {NgxGaugeModule} from 'ngx-gauge';
import {CredixGaugeModule} from '../../../../shared/components/credix-gauge/credix-gauge.module';
import {CredixNumericBlockModule} from '../../../../shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixPaymentBarModule} from '../../../../shared/components/credix-payment-bar/credix-payment-bar.module';
import {CredixProgressBarModule} from '../../../../shared/components/credix-progress-bar/credix-progress-bar.module';

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent
  }
];

@NgModule({
  declarations: [ChartsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    NgxGaugeModule,
    CredixGaugeModule,
    CredixNumericBlockModule,
    CredixPaymentBarModule,
    CredixProgressBarModule,
  ]
})
export class ChartsModule {
}
