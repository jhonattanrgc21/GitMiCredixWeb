import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixButtonComponent} from './credix-button.component';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [CredixButtonComponent],
  exports: [
    CredixButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ]
})
export class CredixButtonModule {
}
