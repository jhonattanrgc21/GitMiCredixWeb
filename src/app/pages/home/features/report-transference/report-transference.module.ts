import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportTransferenceComponent} from './report-transference.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {MatCardModule} from '@angular/material/card';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {ReportTransferenceService} from './report-transference.service';
import {ReactiveFormsModule} from '@angular/forms';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {MatOptionModule} from '@angular/material/core';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {ModalService} from '../../../../core/services/modal.service';
import {CredixCalendarModule} from '../../../../shared/components/credix-calendar/credix-calendar.module';
import {MatIconModule} from '@angular/material/icon';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {CredixImageUploadModule} from '../../../../shared/components/credix-image-upload/credix-image-upload.module';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import {CredixDatePickerModule} from '../../../../shared/components/credix-date-picker/credix-date-picker.module';

const routes: Routes = [
  {
    path: '',
    component: ReportTransferenceComponent
  }
];

@NgModule({
  declarations: [ReportTransferenceComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixCardsModule,
    MatCardModule,
    CredixButtonModule,
    ReactiveFormsModule,
    CredixSelectModule,
    MatOptionModule,
    CredixInputFieldModule,
    CredixLinkButtonModule,
    CredixCalendarModule,
    MatIconModule,
    DateFormatterModule,
    CredixImageUploadModule,
    CredixResultNotificationModule,
    CredixResultViewModule,
    CredixDatePickerModule
  ],
  providers: [
    ReportTransferenceService,
    ModalService
  ]
})
export class ReportTransferenceModule {
}
