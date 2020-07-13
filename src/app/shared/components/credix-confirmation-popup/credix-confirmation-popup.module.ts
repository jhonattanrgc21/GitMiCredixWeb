import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixConfirmationPopupComponent} from './credix-confirmation-popup.component';
import {CredixButtonModule} from '../credix-button/credix-button.module';

@NgModule({
  declarations: [CredixConfirmationPopupComponent],
  exports: [CredixConfirmationPopupComponent],
  imports: [
    CommonModule,
    CredixButtonModule
  ]
})
export class CredixConfirmationPopupModule {
}
