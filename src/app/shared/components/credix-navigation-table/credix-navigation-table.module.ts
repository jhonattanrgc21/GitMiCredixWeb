import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixNavigationTableComponent} from './credix-navigation-table.component';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [CredixNavigationTableComponent],
  exports: [
    CredixNavigationTableComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatIconModule
  ]
})
export class CredixNavigationTableModule {
}
