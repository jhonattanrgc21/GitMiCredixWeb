import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';

import {ExtendTermComponent} from './extend-term.component';
import {CredixPopupModule} from '../../../../shared/components/credix-popup/credix-popup.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixConfirmationPopupModule} from '../../../../shared/components/credix-confirmation-popup/credix-confirmation-popup.module';
import {ModalService} from '../../../../core/services/modal.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {MatIconModule} from '@angular/material/icon';
import {CredixShareButtonModule} from '../../../../shared/components/credix-share-button/credix-share-button.module';
import {CredixProgressBarModule} from '../../../../shared/components/credix-progress-bar/credix-progress-bar.module';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {CredixTabModule} from '../../../../shared/components/credix-tab/credix-tab.module';
import {CredixNavigationTableModule} from '../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {CredixNumericBlockModule} from '../../../../shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {MatDividerModule} from '@angular/material/divider';
import {CredixSliderModule} from '../../../../shared/components/credix-slider/credix-slider.module';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {SimplebarAngularModule} from 'simplebar-angular';


const routes: Routes = [
  {
    path: '',
    component: ExtendTermComponent
  }
];

@NgModule({
  declarations: [ExtendTermComponent],
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
    CredixNavigationTableModule,
    CredixLinkButtonModule,
    ClipboardModule,
    MatTooltipModule,
    MatButtonModule,
    CredixNumericBlockModule,
    CredixResultNotificationModule,
    MatDividerModule,
    CredixSliderModule,
    DateFormatterModule,
    SimplebarAngularModule
  ],
  providers: [ModalService]
})
export class ExtendTermModule {
}
