import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixCalendarComponent} from './credix-calendar.component';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [CredixCalendarComponent],
  exports: [
    CredixCalendarComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatButtonModule
  ]
})
export class CredixCalendarModule {
}
