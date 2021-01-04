import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixCodeInputComponent} from './credix-code-input.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {DigitOnlyModule} from '../../directives/digit-only/digit-only.module';
import {NgxMaskModule} from 'ngx-mask';


@NgModule({
  declarations: [CredixCodeInputComponent],
  exports: [CredixCodeInputComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    DigitOnlyModule,
    NgxMaskModule
  ]
})
export class CredixCodeInputModule {
}
