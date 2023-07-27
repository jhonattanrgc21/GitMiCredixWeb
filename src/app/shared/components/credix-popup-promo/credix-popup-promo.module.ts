import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CredixPopupPromoComponent} from './credix-popup-promo.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [CredixPopupPromoComponent],
  exports: [CredixPopupPromoComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule
  ]
})
export class CredixPopupPromoModule { }
