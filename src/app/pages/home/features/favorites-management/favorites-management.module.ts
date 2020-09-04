import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesManagementComponent} from './favorites-management.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FlexModule} from '@angular/flex-layout';
import {ModalService} from '../../../../core/services/modal.service';
import {FavoritesManagementService} from './favorites-management.service';

const routes: Routes = [
  {
    path: '',
    component: FavoritesManagementComponent
  }
];

@NgModule({
  declarations: [FavoritesManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FlexModule
  ],
  providers: [
    FavoritesManagementService,
    ModalService
  ]
})
export class FavoritesManagementModule {
}
