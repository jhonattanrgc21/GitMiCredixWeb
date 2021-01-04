import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';

import {PaymentPlacesComponent} from './payment-places.component';
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
import {PaymentPlacesService} from './payment-places.service';
import {DigitalPaymentsComponent} from './digital-payments/digital-payments.component';
import {ShopsComponent} from './shops/shops.component';
import {MatDividerModule} from '@angular/material/divider';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';

const routes: Routes = [
  {
    path: '',
    component: PaymentPlacesComponent,
    children: [
      {
        path: '',
        redirectTo: 'digital-payments',
        pathMatch: 'full'
      },
      {
        path: 'digital-payments',
        component: DigitalPaymentsComponent
      },
      {
        path: 'shops',
        component: ShopsComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    PaymentPlacesComponent,
    DigitalPaymentsComponent,
    ShopsComponent
  ],
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
    MatDividerModule,
    CredixDividerModule
  ],
  providers: [
    PaymentPlacesService,
    ModalService]
})
export class PaymentPlacesModule {
}
