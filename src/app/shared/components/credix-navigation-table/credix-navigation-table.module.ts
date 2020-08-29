import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixNavigationTableComponent} from './credix-navigation-table.component';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {CredixLinkButtonModule} from '../credix-link-button/credix-link-button.module';
import {CredixSliderModule} from '../credix-slider/credix-slider.module';
import {CredixNumericBlockModule} from '../credix-numeric-block/credix-numeric-block.module';
import {DateFormatterModule} from '../../pipes/date-formatter/date-formatter.module';
import {SimplebarAngularModule} from 'simplebar-angular';

@NgModule({
  declarations: [CredixNavigationTableComponent],
  exports: [
    CredixNavigationTableComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatIconModule,
    CredixLinkButtonModule,
    CredixSliderModule,
    CredixNumericBlockModule,
    DateFormatterModule,
    SimplebarAngularModule
  ]
})
export class CredixNavigationTableModule {
}
