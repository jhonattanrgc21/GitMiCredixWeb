import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StepperComponent} from './stepper.component';
import {CredixStepperModule} from '../../../../shared/components/credix-stepper/credix-stepper.module';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../../../shared/shared.module';
import {StepperModule} from '../../../../shared/directives/stepper/stepper.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';

const routes: Routes = [
  {
    path: '',
    component: StepperComponent
  }
];

@NgModule({
  declarations: [StepperComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CredixStepperModule,
    FlexModule,
    CdkStepperModule,
    SharedModule,
    ReactiveFormsModule,
    StepperModule,
    CredixButtonModule
  ]
})
export class SteppersModule {
}
