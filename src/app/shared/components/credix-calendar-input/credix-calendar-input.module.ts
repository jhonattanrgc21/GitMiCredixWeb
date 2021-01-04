import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixCalendarInputComponent} from './credix-calendar-input.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateFormatterModule} from '../../pipes/date-formatter/date-formatter.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [CredixCalendarInputComponent],
  exports: [
    CredixCalendarInputComponent
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    DateFormatterModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ]
})
export class CredixCalendarInputModule {
}
