import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {PublicServicesComponent} from './public-services.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {MatCardModule} from '@angular/material/card';
import {CredixTabModule} from '../../../../shared/components/credix-tab/credix-tab.module';
import {AllServicesComponent} from './all-services/all-services.component';
import {FavoriteServicesComponent} from './favorite-services/favorite-services.component';
import {AutomaticsServicesComponent} from './automatics-services/automatics-services.component';
import {PublicServicesService} from './public-services.service';
import {CredixNavigationTableModule} from '../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {SimplebarAngularModule} from 'simplebar-angular';
import {MatIconModule} from '@angular/material/icon';
import {NewRechargeComponent} from './all-services/new-recharge/new-recharge.component';
import {NewServiceComponent} from './all-services/new-service/new-service.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixStepperModule} from '../../../../shared/components/credix-stepper/credix-stepper.module';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import {NewServiceFirstStepComponent} from './all-services/new-service/new-service-first-step/new-service-first-step.component';
import {NewServiceSecondStepComponent} from './all-services/new-service/new-service-second-step/new-service-second-step.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {MatDividerModule} from '@angular/material/divider';
import {CredixNumericBlockModule} from '../../../../shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixCodeLinkModule} from '../../../../shared/components/credix-code-link/credix-code-link.module';
import {CredixCodeInputModule} from '../../../../shared/components/credix-code-input/credix-code-input.module';
import {CredixCheckboxButtonModule} from '../../../../shared/components/credix-checkbox-button/credix-checkbox-button.module';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixShareButtonModule} from '../../../../shared/components/credix-share-button/credix-share-button.module';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixRadioButtonModule} from '../../../../shared/components/credix-radio-button/credix-radio-button.module';
import {DigitOnlyModule} from '../../../../shared/directives/digit-only/digit-only.module';
import {NgxMaskModule} from 'ngx-mask';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {MatOptionModule} from '@angular/material/core';
import {PopupReceiptComponent} from './success-screen/popup-receipt/popup-receipt.component';
import {NewRechargeSecondStepComponent} from './all-services/new-recharge/new-recharge-second-step/new-recharge-second-step.component';
import {CredixSearchBoxModule} from 'src/app/shared/components/credix-search-box/credix-search-box.module';
import {SuccessScreenComponent} from './success-screen/success-screen.component';
import {PopupAllReceiptsComponent} from './all-services/popup-all-receipts/popup-all-receipts.component';
import { NewServiceThirdStepComponent } from './all-services/new-service/new-service-third-step/new-service-third-step.component';
import { CredixSliderModule } from 'src/app/shared/components/credix-slider/credix-slider.module';
import { NewRechargeThirdStepComponent } from './all-services/new-recharge/new-recharge-third-step/new-recharge-third-step.component';
import { AutomaticsService } from '../favorites-management/automatics/automatics.service';
import { DateFormatterPipe } from 'src/app/shared/pipes/date-formatter/date-formatter.pipe';

const routes: Routes = [
  {
    path: '',
    component: PublicServicesComponent,
    children: [
      {
        path: '',
        component: AllServicesComponent
      },
      {
        path: 'favorites',
        component: FavoriteServicesComponent
      },
      {
        path: 'automatics',
        component: AutomaticsServicesComponent
      }
    ]
  },
  {
    path: 'success',
    component: SuccessScreenComponent
  },
  {
    path: 'recharge',
    component: NewRechargeComponent
  },
  {
    path: 'public-service',
    component: NewServiceComponent
  }
];

@NgModule({
  declarations: [
    PublicServicesComponent,
    AllServicesComponent,
    FavoriteServicesComponent,
    AutomaticsServicesComponent,
    NewRechargeComponent,
    NewServiceComponent,
    NewServiceFirstStepComponent,
    NewServiceSecondStepComponent,
    PopupReceiptComponent,
    NewRechargeSecondStepComponent,
    SuccessScreenComponent,
    PopupAllReceiptsComponent,
    NewServiceThirdStepComponent,
    NewRechargeThirdStepComponent,
  ],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixCardsModule,
    MatCardModule,
    MatOptionModule,
    CredixTabModule,
    CredixSearchBoxModule,
    CredixNavigationTableModule,
    SimplebarAngularModule,
    MatIconModule,
    CdkStepperModule,
    CredixButtonModule,
    CredixStepperModule,
    CredixResultViewModule,
    ReactiveFormsModule,
    CredixInputFieldModule,
    CredixDividerModule,
    MatDividerModule,
    CredixNumericBlockModule,
    CredixCodeLinkModule,
    CredixCodeInputModule,
    CredixCheckboxButtonModule,
    DateFormatterModule,
    CredixLinkButtonModule,
    CredixShareButtonModule,
    CredixResultNotificationModule,
    CredixRadioButtonModule,
    DigitOnlyModule,
    NgxMaskModule,
    CredixSelectModule,
    CredixSliderModule,
  ],
  providers: [
    PublicServicesService,
    AutomaticsService,
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublicServicesModule {
}
