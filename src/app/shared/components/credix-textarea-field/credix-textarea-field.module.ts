import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixTextareaFieldComponent} from './credix-textarea-field.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';

const maskConfig: Partial<IConfig> = {
  validation: false,
  decimalMarker: ',',
  thousandSeparator: '.',
  specialCharacters: ['(', ')', '-', '*', '[', ']', ' ', '@', '"', '\'', '+', '.', ',', '=', '/']
};

@NgModule({
  declarations: [CredixTextareaFieldComponent],
  exports: [
    CredixTextareaFieldComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    NgxMaskModule.forRoot(maskConfig),
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ]
})
export class CredixTextareaFieldModule {
}
