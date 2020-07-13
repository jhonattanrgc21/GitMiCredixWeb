import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectButtonsComponent} from './select-buttons.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixCheckboxButtonModule} from 'src/app/shared/components/credix-checkbox-button/credix-checkbox-button.module';
import {CredixRadioButtonModule} from 'src/app/shared/components/credix-radio-button/credix-radio-button.module';

const routes: Routes = [
  {
    path: '',
    component: SelectButtonsComponent
  }
];

@NgModule({
  declarations: [SelectButtonsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixCheckboxButtonModule,
    CredixRadioButtonModule
  ]
})
export class SelectButtonsModule {
}
