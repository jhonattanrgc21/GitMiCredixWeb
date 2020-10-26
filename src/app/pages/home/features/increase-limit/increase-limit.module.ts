import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IncreaseLimitComponent} from './increase-limit.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {IncreaseLimitService} from './increase-limit.service';
import {ModalService} from '../../../../core/services/modal.service';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {MatCardModule} from '@angular/material/card';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';

const routes: Routes = [
  {
    path: '',
    component: IncreaseLimitComponent
  }
];

@NgModule({
  declarations: [IncreaseLimitComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixCardsModule,
    MatCardModule,
    CredixResultNotificationModule,
    CredixButtonModule,
    CredixResultViewModule
  ],
  providers: [
    IncreaseLimitService,
    ModalService
  ]
})
export class IncreaseLimitModule {
}
