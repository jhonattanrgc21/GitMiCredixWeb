import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixRadioButtonComponent} from './credix-radio-button.component';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [CredixRadioButtonComponent],
  exports: [
    CredixRadioButtonComponent
  ],
  imports: [
    CommonModule,
    MatRadioModule
  ]
})
export class CredixRadioButtonModule {
}
