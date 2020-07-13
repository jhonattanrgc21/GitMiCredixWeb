import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixCheckboxButtonComponent} from './credix-checkbox-button.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [CredixCheckboxButtonComponent],
  exports: [
    CredixCheckboxButtonComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule
  ]
})
export class CredixCheckboxButtonModule {
}
