import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementsMainPageComponent } from './managements.component';
import { RouterModule, Routes } from '@angular/router';
import { IncreaseLimitPageComponent } from './pages/increase-limit/increase-limit.component';
import { CardPinCodesPageComponent } from './pages/card-pin-codes/card-pin-codes.component';
import { RenewCardsPageComponent } from './pages/renew-cards/renew-cards.component';
import { RobOrLossPageComponent } from './pages/rob-or-loss/rob-or-loss.component';
import { DamagedCardPageComponent } from './pages/damaged-card/damaged-card.component';
import { AddManagementPageComponent } from './pages/add-management/add-management.component';
import { CredixButtonModule } from 'src/app/shared/components/credix-button/credix-button.module';
import { MyManagementsPageComponent } from './pages/my-managements/my-managements.component';
import { CredixNavigationTableModule } from 'src/app/shared/components/credix-navigation-table/credix-navigation-table.module';
import { CredixLinkButtonModule } from 'src/app/shared/components/credix-link-button/credix-link-button.module';
import { MatIconModule } from '@angular/material/icon';

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
        path: 'card-pin-codes',
        component: CardPinCodesPageComponent
      },
      {
        path: 'increase-limit',
        component: IncreaseLimitPageComponent
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
    IncreaseLimitPageComponent,
    CardPinCodesPageComponent,
    RenewCardsPageComponent,
    RobOrLossPageComponent,
    DamagedCardPageComponent,
    AddManagementPageComponent,
    MyManagementsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CredixButtonModule,
    CredixNavigationTableModule,
    CredixLinkButtonModule,
    MatIconModule
  ],
  exports: [],
  providers: [],
})
export class ManagementsModule {}
