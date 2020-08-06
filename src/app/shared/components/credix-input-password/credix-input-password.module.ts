import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixInputPasswordComponent} from './credix-input-password.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {CredixTooltipsModule} from '../../directives/credix-tooltips/credix-tooltips.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [CredixInputPasswordComponent],
  exports: [
    CredixInputPasswordComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    CredixTooltipsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class CredixInputPasswordModule {
}
