import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixConfirmationPopupComponent} from './credix-confirmation-popup.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [CredixConfirmationPopupComponent],
  exports: [CredixConfirmationPopupComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class CredixConfirmationPopupModule {
}
