import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './landing.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {BalancesComponent} from './balances/balances.component';
import {PaymentDetailsComponent} from './payment-details/payment-details.component';
import {MovementsComponent} from './movements/movements.component';
import {AwardsComponent} from './awards/awards.component';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {CredixGaugeModule} from '../../../../shared/components/credix-gauge/credix-gauge.module';
import {CredixNumericBlockModule} from '../../../../shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {CredixPaymentBarModule} from '../../../../shared/components/credix-payment-bar/credix-payment-bar.module';
import {MatTableModule} from '@angular/material/table';
import {TablesDirectivesModule} from '../../../../shared/directives/tables/tables-directives.module';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {LandingService} from './landing.service';
import {ModalService} from '../../../../core/services/modal.service';
import {CastToNumberModule} from '../../../../shared/pipes/cast-to-number/cast-to-number.module';
import { HomePopupComponent } from '../credix-mas/home-popup/home-popup.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  }
];

@NgModule({
  declarations: [LandingComponent, BalancesComponent, PaymentDetailsComponent, MovementsComponent, AwardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixCardsModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    CredixGaugeModule,
    CredixNumericBlockModule,
    CredixLinkButtonModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    ClipboardModule,
    CredixPaymentBarModule,
    MatTableModule,
    TablesDirectivesModule,
    DateFormatterModule,
    CredixDividerModule,
    CastToNumberModule,
    HomePopupComponent
  ],
  providers: [
    LandingService,
    ModalService
  ]
})
export class LandingModule {
}
