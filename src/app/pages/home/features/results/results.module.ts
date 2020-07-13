import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResultsComponent} from './results.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';

const routes: Routes = [
  {
    path: '',
    component: ResultsComponent
  }
];

@NgModule({
  declarations: [ResultsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixResultNotificationModule
  ]
})
export class ResultsModule {
}
