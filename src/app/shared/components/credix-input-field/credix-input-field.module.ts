import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixInputFieldComponent} from './credix-input-field.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgxMaskModule} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [CredixInputFieldComponent],
  exports: [
    CredixInputFieldComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    NgxMaskModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ]
})
export class CredixInputFieldModule {
}
