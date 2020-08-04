import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixPopupAlternativeComponent} from './credix-popup-alternative.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {OverlayscrollbarsModule} from 'overlayscrollbars-ngx';


@NgModule({
  declarations: [CredixPopupAlternativeComponent],
  exports: [CredixPopupAlternativeComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    OverlayscrollbarsModule
  ]
})
export class CredixPopupAlternativeModule {
}
