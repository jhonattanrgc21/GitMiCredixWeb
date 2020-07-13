import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixConfirmationPopupComponent} from './credix-confirmation-popup.component';
import {CredixButtonModule} from '../credix-button/credix-button.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [CredixConfirmationPopupComponent],
  exports: [CredixConfirmationPopupComponent],
  imports: [
    CommonModule,
    CredixButtonModule,
    MatButtonModule
  ]
})
export class CredixConfirmationPopupModule {
}
