import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertsAndMessagesComponent} from './alerts-and-messages.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';

const routes: Routes = [
  {
    path: '',
    component: AlertsAndMessagesComponent
  }
];

@NgModule({
  declarations: [AlertsAndMessagesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixButtonModule
  ]
})
export class AlertsAndMessagesModule {
}
