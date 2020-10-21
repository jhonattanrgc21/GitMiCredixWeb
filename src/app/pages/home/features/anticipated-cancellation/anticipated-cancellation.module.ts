import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';

import {AnticipatedCancellationComponent} from './anticipated-cancellation.component';
import {CredixPopupModule} from '../../../../shared/components/credix-popup/credix-popup.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixConfirmationPopupModule} from '../../../../shared/components/credix-confirmation-popup/credix-confirmation-popup.module';
import {ModalService} from '../../../../core/services/modal.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {CredixShareButtonModule} from '../../../../shared/components/credix-share-button/credix-share-button.module';
import {CredixProgressBarModule} from '../../../../shared/components/credix-progress-bar/credix-progress-bar.module';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {CredixTabModule} from '../../../../shared/components/credix-tab/credix-tab.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {TablesDirectivesModule} from '../../../../shared/directives/tables/tables-directives.module';
import {CredixPaginatorModule} from '../../../../shared/components/credix-paginator/credix-paginator.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {CredixNumericBlockModule} from '../../../../shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixCheckboxButtonModule} from '../../../../shared/components/credix-checkbox-button/credix-checkbox-button.module';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {SimplebarAngularModule} from 'simplebar-angular';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {AnticipatedCancellationService} from './anticipated-cancellation.service';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {CastToNumberModule} from '../../../../shared/pipes/cast-to-number/cast-to-number.module';

const routes: Routes = [
  {
    path: '',
    component: AnticipatedCancellationComponent
  }
];

@NgModule({
  declarations: [AnticipatedCancellationComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixPopupModule,
    CredixConfirmationPopupModule,
    CredixButtonModule,
    MatCardModule,
    MatDialogModule,
    MatSliderModule,
    MatIconModule,
    CredixShareButtonModule,
    CredixProgressBarModule,
    CredixCardsModule,
    CredixTabModule,
    CredixLinkButtonModule,
    TablesDirectivesModule,
    CredixPaginatorModule,
    NgxPaginationModule,
    MatTableModule,
    CredixNumericBlockModule,
    CredixCheckboxButtonModule,
    CredixResultNotificationModule,
    MatDividerModule,
    SimplebarAngularModule,
    MatCheckboxModule,
    DateFormatterModule,
    CredixResultViewModule,
    CredixDividerModule,
    CastToNumberModule

  ],
  providers: [
    ModalService,
    AnticipatedCancellationService
  ]
})
export class AnticipatedCancellationModule {
}
