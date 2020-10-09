import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixCalendarComponent} from './credix-calendar.component';
import {FlexModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [CredixCalendarComponent],
  exports: [
    CredixCalendarComponent
  ],
  imports: [
    CommonModule,
    FlexModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class CredixCalendarModule {
}
