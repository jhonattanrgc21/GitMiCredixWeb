import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AutomaticsComponent} from './automatics.component';
import {RouterModule, Routes} from '@angular/router';
import {CredixNavigationTableModule} from '../../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {CredixInputFieldModule} from '../../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixButtonModule} from '../../../../../shared/components/credix-button/credix-button.module';
import {CredixSelectModule} from '../../../../../shared/components/credix-select/credix-select.module';
import {CredixLinkButtonModule} from '../../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixCodeInputModule} from '../../../../../shared/components/credix-code-input/credix-code-input.module';
import {ModalService} from '../../../../../core/services/modal.service';
import {AutomaticsService} from './automatics.service';
import {SharedModule} from '../../../../../shared/shared.module';
import {DateFormatterModule} from '../../../../../shared/pipes/date-formatter/date-formatter.module';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';
import {CredixDatePickerModule} from '../../../../../shared/components/credix-date-picker/credix-date-picker.module';
import { CredixNumericBlockModule } from 'src/app/shared/components/credix-numeric-block/credix-numeric-block.module';
import { CredixSliderModule } from 'src/app/shared/components/credix-slider/credix-slider.module';
import { CredixRadioButtonModule } from 'src/app/shared/components/credix-radio-button/credix-radio-button.module';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CredixResultNotificationModule } from 'src/app/shared/components/credix-result-notification/credix-result-notification.module';
import { CredixResultViewModule } from 'src/app/shared/components/credix-result-view/credix-result-view.module';

const routes: Routes = [
  {
    path: '',
    component: AutomaticsComponent
  },
  {
    path: ':id',
    component: AutomaticsComponent
  }
];

@NgModule({
  declarations: [
    AutomaticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CredixNavigationTableModule,
    CredixInputFieldModule,
    CredixButtonModule,
    CredixInputFieldModule,
    CredixSelectModule,
    CredixLinkButtonModule,
    CredixCodeInputModule,
    DateFormatterModule,
    CredixDatePickerModule,
    CredixNumericBlockModule,
    CredixSliderModule,
    CredixRadioButtonModule,
    SimplebarAngularModule,
    CredixResultNotificationModule,
    CredixResultViewModule,

  ],
  providers: [
    ModalService,
    AutomaticsService,
    DatePipe,
    CredixToastService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AutomaticsModule {
}
