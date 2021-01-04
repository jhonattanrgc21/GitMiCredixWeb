import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixDatePickerComponent} from './credix-date-picker.component';
import {CredixInputFieldModule} from '../credix-input-field/credix-input-field.module';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {DateFormatterModule} from '../../pipes/date-formatter/date-formatter.module';


@NgModule({
  declarations: [CredixDatePickerComponent],
  exports: [
    CredixDatePickerComponent
  ],
  imports: [
    CommonModule,
    CredixInputFieldModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    DateFormatterModule
  ]
})
export class CredixDatePickerModule {
}
