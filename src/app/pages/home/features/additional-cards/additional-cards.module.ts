import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdditionalCardsComponent} from './additional-cards.component';
import {AdditionalCardsService} from './additional-cards.service';
import {ModalService} from '../../../../core/services/modal.service';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';

const routes: Routes = [
  {
    path: '',
    component: AdditionalCardsComponent
  }
];

@NgModule({
  declarations: [AdditionalCardsComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixCardsModule
  ],
  providers: [
    AdditionalCardsService,
    ModalService
  ]
})
export class AdditionalCardsModule {
}
