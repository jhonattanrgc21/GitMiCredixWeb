import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixResultViewComponent} from './credix-result-view.component';
import {MatCardModule} from '@angular/material/card';
import {CredixResultNotificationModule} from '../credix-result-notification/credix-result-notification.module';
import {CredixCardsModule} from '../../directives/credix-cards/credix-cards.module';
import {FlexModule} from '@angular/flex-layout';
import {CredixButtonModule} from '../credix-button/credix-button.module';


@NgModule({
  declarations: [CredixResultViewComponent],
  exports: [
    CredixResultViewComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    CredixResultNotificationModule,
    CredixCardsModule,
    FlexModule,
    CredixButtonModule
  ]
})
export class CredixResultViewModule {
}
