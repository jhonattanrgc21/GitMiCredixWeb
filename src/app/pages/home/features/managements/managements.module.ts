import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementsMainPageComponent } from './managements.component';
import { RouterModule, Routes } from '@angular/router';
import { RenewCardsPageComponent } from './pages/renew-cards/renew-cards.component';
import { RobOrLossPageComponent } from './pages/rob-or-loss/rob-or-loss.component';
import { DamagedCardPageComponent } from './pages/damaged-card/damaged-card.component';
import { AddManagementPageComponent } from './pages/add-management/add-management.component';
import { CredixButtonModule } from 'src/app/shared/components/credix-button/credix-button.module';
import { MyManagementsPageComponent } from './pages/my-managements/my-managements.component';
import { CredixLinkButtonModule } from 'src/app/shared/components/credix-link-button/credix-link-button.module';
import { MatIconModule } from '@angular/material/icon';
import { CredixResultNotificationModule } from 'src/app/shared/components/credix-result-notification/credix-result-notification.module';
import { CredixRadioButtonModule } from 'src/app/shared/components/credix-radio-button/credix-radio-button.module';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from 'src/app/shared/shared.module';
import { GlobalApiService } from 'src/app/core/services/global-api.service';
import { ChannelsApiService } from 'src/app/core/services/channels-api.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { PhoneMaskModule } from 'src/app/shared/pipes/phone-mask/phone-mask.module';
import { ModalService } from 'src/app/core/services/modal.service';
import { CredixSelectModule } from 'src/app/shared/components/credix-select/credix-select.module';
import { CredixInputFieldModule } from 'src/app/shared/components/credix-input-field/credix-input-field.module';
import { CredixNumericBlockModule } from 'src/app/shared/components/credix-numeric-block/credix-numeric-block.module';
import { CredixDeliveryOptionsModule } from 'src/app/shared/components/credix-delivery-options/credix-delivery-options.module';

const routes: Routes = [
  {
    path: '',
    component: ManagementsMainPageComponent,
    children: [
      {
        path: 'my-managements',
        component: MyManagementsPageComponent
      },
      {
        path: 'add-management',
        component: AddManagementPageComponent,
      },
      {
        path: 'rob-or-loss',
        component: RobOrLossPageComponent,
      },
      {
        path: 'renew-cards',
        component: RenewCardsPageComponent
      },
      {
        path: 'damaged-card',
        component: DamagedCardPageComponent
      },
      {
        path: '**',
        redirectTo: 'my-managements'
      }
    ]
  }
]


@NgModule({
  declarations: [
    ManagementsMainPageComponent,
    RenewCardsPageComponent,
    RobOrLossPageComponent,
    DamagedCardPageComponent,
    AddManagementPageComponent,
    MyManagementsPageComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes),
    CredixButtonModule,
    CredixLinkButtonModule,
    CredixNumericBlockModule,
    CredixSelectModule,
    CredixInputFieldModule,
    CredixDeliveryOptionsModule,
    MatIconModule,
    CredixResultNotificationModule,
    CredixRadioButtonModule,
    MatRadioModule,
    PhoneMaskModule
  ],
  exports: [],
  providers: [
    GlobalApiService,
    ChannelsApiService,
    StorageService,
    ModalService
  ],
})
export class ManagementsModule {}
