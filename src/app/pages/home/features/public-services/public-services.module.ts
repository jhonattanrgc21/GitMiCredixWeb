import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {NewRechargeComponent} from './new-recharge/new-recharge.component';
import {NewServiceComponent} from './new-service/new-service.component';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixStepperModule} from '../../../../shared/components/credix-stepper/credix-stepper.module';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import {NewServiceFirstStepComponent} from './new-service/new-service-first-step/new-service-first-step.component';
import {NewServiceSecondStepComponent} from './new-service/new-service-second-step/new-service-second-step.component';
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
    path: 'recharge/category/:categoryId/enterprise/:enterpriseId/service/:serviceId',
    component: NewRechargeComponent
  },
  {
    path: 'category/:categoryId/enterprise/:enterpriseId/service/:serviceId',
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
    NewServiceSecondStepComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixCardsModule,
    MatCardModule,
    CredixTabModule,
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
  ],
  providers: [
    PublicServicesService
  ]
})
export class PublicServicesModule {
}
