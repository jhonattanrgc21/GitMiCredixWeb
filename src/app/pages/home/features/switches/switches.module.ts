import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwitchesComponent} from './switches.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixSwitchModule} from '../../../../shared/components/credix-switch/credix-switch.module';

const routes: Routes = [
  {
    path: '',
    component: SwitchesComponent
  }
];

@NgModule({
  declarations: [SwitchesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixSwitchModule,
  ]
})
export class SwitchesModule {
}
