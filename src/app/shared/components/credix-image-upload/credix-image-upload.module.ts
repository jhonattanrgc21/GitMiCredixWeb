import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixImageUploadComponent} from './credix-image-upload.component';
import {CredixImageUploadConfirmComponent} from './credix-image-upload-confirm/credix-image-upload-confirm.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    CredixImageUploadComponent,
    CredixImageUploadConfirmComponent],
  exports: [
    CredixImageUploadComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class CredixImageUploadModule {
}
