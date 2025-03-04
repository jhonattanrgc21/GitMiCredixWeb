import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FavoritesManagementComponent} from './favorites-management.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {ModalService} from '../../../../core/services/modal.service';
import {FavoritesManagementService} from './favorites-management.service';
import {CredixTabModule} from '../../../../shared/components/credix-tab/credix-tab.module';
import {SharedModule} from '../../../../shared/shared.module';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {CredixNavigationTableModule} from '../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';
import {CredixCodeInputModule} from '../../../../shared/components/credix-code-input/credix-code-input.module';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {NgxMaskModule} from 'ngx-mask';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {AddIbanAccountComponent} from './add-iban-account/add-iban-account.component';
import {AddAutomaticsComponent} from './add-automatics/add-automatics.component';
import {AddFavoritesPaymentComponent} from './add-favorites-payment/add-favorites-payment.component';
import {SimplebarAngularModule} from 'simplebar-angular';
import {IbanAccountsService} from './iban-accounts/iban-accounts.service';
import {FavoritesPaymentsService} from './favorites-payments/favorites-payments.service';
import {AutomaticsService} from './automatics/automatics.service';
import {CredixToastService} from '../../../../core/services/credix-toast.service';
import {CredixCodeLinkModule} from '../../../../shared/components/credix-code-link/credix-code-link.module';
import {CredixDatePickerModule} from '../../../../shared/components/credix-date-picker/credix-date-picker.module';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import { CredixStepperModule } from 'src/app/shared/components/credix-stepper/credix-stepper.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CredixSliderModule } from 'src/app/shared/components/credix-slider/credix-slider.module';
import { CredixRadioButtonModule } from 'src/app/shared/components/credix-radio-button/credix-radio-button.module';
import { CredixNumericBlockModule } from 'src/app/shared/components/credix-numeric-block/credix-numeric-block.module';
import { AddAutomaticsSecondStepComponent } from './add-automatics/add-automatics-second-step/add-automatics-second-step.component';
import { SuccessScreenComponent } from './success-screen/success-screen.component';
import { GlobalApiService } from 'src/app/core/services/global-api.service';

const routes: Routes = [
  {
    path: '',
    component: FavoritesManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'iban-accounts',
        pathMatch: 'full'
      },
      {
        path: 'iban-accounts',
        loadChildren: () => import('./iban-accounts/iban-accounts.module').then(m => m.IbanAccountsModule)
      },
      {
        path: 'favorites-payments',
        loadChildren: () => import('./favorites-payments/favorites-payments.module').then(m => m.FavoritesPaymentsModule)
      },
      {
        path: 'automatics',
        loadChildren: () => import('./automatics/automatics.module').then(m => m.AutomaticsModule)
      },
      {
        path: 'automatics/:id',
        loadChildren: () => import('./automatics/automatics.module').then(m => m.AutomaticsModule)
      }
    ]
  },
  {
    path: 'new-account',
    component: AddIbanAccountComponent
  },
  {
    path: 'new-favorite',
    component: AddFavoritesPaymentComponent
  },
  {
    path: 'new-automatics',
    component: AddAutomaticsComponent
  },
  {
    path: 'success',
    component: SuccessScreenComponent,
  },
];

@NgModule({
  declarations: [
    FavoritesManagementComponent,
    AddIbanAccountComponent,
    AddAutomaticsComponent,
    AddFavoritesPaymentComponent,
    AddAutomaticsSecondStepComponent,
    SuccessScreenComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FlexModule,
    CredixTabModule,
    SharedModule,
    CredixCardsModule,
    CredixNavigationTableModule,
    CredixButtonModule,
    CredixResultNotificationModule,
    CredixCodeInputModule,
    CredixInputFieldModule,
    CredixSelectModule,
    CredixLinkButtonModule,
    CredixDividerModule,
    NgxMaskModule,
    DateFormatterModule,
    SimplebarAngularModule,
    CredixCodeLinkModule,
    CredixDatePickerModule,
    CredixResultViewModule,
    CredixStepperModule,
    CdkStepperModule,
    CredixSliderModule,
    CredixRadioButtonModule,
    CredixNumericBlockModule,
  ],
  providers: [
    FavoritesManagementService,
    ModalService,
    DatePipe,
    IbanAccountsService,
    FavoritesPaymentsService,
    AutomaticsService,
    CredixToastService,
    GlobalApiService,
  ],
  exports: [
    MatCardModule,
    FlexModule,
    CredixTabModule,
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class FavoritesManagementModule {
}
