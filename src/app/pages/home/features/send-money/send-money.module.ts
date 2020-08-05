import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SendMoneyComponent} from './send-money.component';
import {MatCardModule} from '@angular/material/card';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {FlexModule} from '@angular/flex-layout';
import {CredixStepperModule} from '../../../../shared/components/credix-stepper/credix-stepper.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {RouterModule, Routes} from '@angular/router';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {FirstStepComponent} from './first-step/first-step.component';
import {SecondStepComponent} from './second-step/second-step.component';
import {ThirdStepComponent} from './third-step/third-step.component';
import {CredixRadioButtonModule} from '../../../../shared/components/credix-radio-button/credix-radio-button.module';
import {MatDividerModule} from '@angular/material/divider';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {MatOptionModule} from '@angular/material/core';

const routes: Routes = [
  {
    path: '',
    component: SendMoneyComponent
  }
];

@NgModule({
  declarations: [SendMoneyComponent, FirstStepComponent, SecondStepComponent, ThirdStepComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    CredixCardsModule,
    FlexModule,
    CredixStepperModule,
    CdkStepperModule,
    CredixButtonModule,
    CredixRadioButtonModule,
    MatDividerModule,
    CredixSelectModule,
    MatOptionModule
  ]
})
export class SendMoneyModule {
}
