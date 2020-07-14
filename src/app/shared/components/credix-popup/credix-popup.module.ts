import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import {CredixPopupComponent} from './credix-popup.component';


@NgModule({
  declarations: [CredixPopupComponent],
  exports: [
    CredixPopupComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatDialogModule,
    MatIconModule
  ]
})
export class CredixPopupModule {
}
