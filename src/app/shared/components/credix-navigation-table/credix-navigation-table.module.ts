import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixNavigationTableComponent} from './credix-navigation-table.component';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {CredixLinkButtonModule} from '../credix-link-button/credix-link-button.module';


@NgModule({
  declarations: [CredixNavigationTableComponent],
  exports: [
    CredixNavigationTableComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatIconModule,
    CredixLinkButtonModule
  ]
})
export class CredixNavigationTableModule {
}
