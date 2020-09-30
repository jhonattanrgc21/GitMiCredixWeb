import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import {ShareButtonsModule} from 'ngx-sharebuttons/buttons';
import {ShareIconsModule} from 'ngx-sharebuttons/icons';
import {MatMenuModule} from '@angular/material/menu';

import {CredixButtonModule} from '../credix-button/credix-button.module';
import {CredixShareButtonComponent} from './credix-share-button.component';


@NgModule({
  declarations: [CredixShareButtonComponent],
  exports: [
    CredixShareButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
    CredixButtonModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    ShareButtonsModule,
    ShareIconsModule
  ]
})
export class CredixShareButtonModule {
}
