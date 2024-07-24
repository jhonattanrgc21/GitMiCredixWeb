import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {NgxPaginationModule} from 'ngx-pagination';
import {ExtendTermComponent} from './extend-term.component';
import {SharedModule} from '../../../../shared/shared.module';
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
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {CredixResultViewModule} from '../../../../shared/components/credix-result-view/credix-result-view.module';
import {ExtendTermService} from './extend-term.service';
import {ExtendTermSuccessScreenComponent} from './extend-term-success-screen/extend-term-success-screen.component';
import {TablesDirectivesModule} from 'src/app/shared/directives/tables/tables-directives.module';
import {CredixPaginatorModule} from '../../../../shared/components/credix-paginator/credix-paginator.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CredixCheckboxButtonModule} from 'src/app/shared/components/credix-checkbox-button/credix-checkbox-button.module';
import {PreviousExtendComponent} from './previous-extend/previous-extend.component';
import {ExtendTermPreviousSuccessComponent} from './extend-term-previous-success/extend-term-previous-success.component';
import {PopupPromoComponent} from './popup-promo/popup-promo.component';
import { RecentExtendComponent } from './recent-extend/recent-extend.component';
import { CredixMasPopupComponent } from './credix-mas-popup/credix-mas-popup.component';
import { SliderPopupComponent } from './slider-popup/slider-popup.component';
import { CapitalizeModule } from "src/app/shared/pipes/capitalize/capitalize.module";
import { ReminderPopupComponent } from "./extend-term-previous-success/reminder-popup/reminder-popup.component";

const routes: Routes = [
  {
    path: "",
    component: ExtendTermComponent,
    children: [
      {
        path: "",
        redirectTo: "recent",
        pathMatch: "full",
      },
      {
        path: "recent",
        loadChildren: () =>
          import("./recent-purchases/recent-purchases.module").then(
            (m) => m.RecentPurchasesModule
          ),
      },
      {
        path: "recent/:movementId",
        loadChildren: () =>
          import("./recent-purchases/recent-purchases.module").then(
            (m) => m.RecentPurchasesModule
          ),
      },
      {
        path: "previous",
        loadChildren: () =>
          import("./previous-purchases/previous-purchases.module").then(
            (m) => m.PreviousPurchasesModule
          ),
      },
    ],
  },
  {
    path: "establishment/:establishment?/success",
    component: ExtendTermSuccessScreenComponent,
  },
  {
    path: "previous-extend",
    component: PreviousExtendComponent,
  },
  {
    path: "previous-extend-success",
    component: ExtendTermPreviousSuccessComponent,
  },
  {
    path: "recent-extend",
    component: RecentExtendComponent,
  },
  {
    path: "recent-extend/:id",
    component: RecentExtendComponent,
  },
];

@NgModule({
  declarations: [
    ExtendTermComponent,
    ExtendTermSuccessScreenComponent,
    PreviousExtendComponent,
    ExtendTermPreviousSuccessComponent,
    ReminderPopupComponent,
    PopupPromoComponent,
    RecentExtendComponent,
    CredixMasPopupComponent,
    SliderPopupComponent,
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
    CredixNumericBlockModule,
    CredixResultNotificationModule,
    MatDividerModule,
    CredixSliderModule,
    DateFormatterModule,
    SimplebarAngularModule,
    CredixDividerModule,
    CredixResultViewModule,
    TablesDirectivesModule,
    NgxPaginationModule,
    CredixPaginatorModule,
    CredixNumericBlockModule,
    SharedModule,
    MatCheckboxModule,
    CredixCheckboxButtonModule,
    CapitalizeModule,
  ],
  providers: [ExtendTermService, ModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ExtendTermModule {}
