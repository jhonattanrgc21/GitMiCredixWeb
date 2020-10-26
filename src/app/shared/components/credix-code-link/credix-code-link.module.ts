import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixCodeLinkComponent} from './credix-code-link.component';
import {FlexModule} from '@angular/flex-layout';
import {CredixLinkButtonModule} from '../credix-link-button/credix-link-button.module';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [CredixCodeLinkComponent],
  exports: [
    CredixCodeLinkComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    CredixLinkButtonModule,
    MatIconModule
  ]
})
export class CredixCodeLinkModule {
}
