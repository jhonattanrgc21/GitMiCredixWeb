import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';

import {CardsComponent} from './cards.component';
import {MatCardModule} from '@angular/material/card';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';

const routes: Routes = [
  {
    path: '',
    component: CardsComponent
  }
];

@NgModule({
  declarations: [CardsComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    MatCardModule,
    CredixButtonModule,
    CredixCardsModule
  ],

})
export class CardsModule {
}
