import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixLinkButtonComponent} from './credix-link-button.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [CredixLinkButtonComponent],
  exports: [
    CredixLinkButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class CredixLinkButtonModule {
}
