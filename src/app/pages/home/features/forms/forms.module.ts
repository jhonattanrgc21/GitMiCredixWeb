import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsComponent} from './forms.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixCheckboxButtonModule} from '../../../../shared/components/credix-checkbox-button/credix-checkbox-button.module';
import {CredixRadioButtonModule} from '../../../../shared/components/credix-radio-button/credix-radio-button.module';

const routes: Routes = [
  {
    path: '',
    component: FormsComponent
  }
];

@NgModule({
  declarations: [FormsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixCheckboxButtonModule,
    CredixRadioButtonModule
  ]
})
export class FormsModule {
}
