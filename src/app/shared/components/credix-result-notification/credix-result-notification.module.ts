import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixResultNotificationComponent} from './credix-result-notification.component';

@NgModule({
  declarations: [CredixResultNotificationComponent],
  exports: [
    CredixResultNotificationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CredixResultNotificationModule {
}
