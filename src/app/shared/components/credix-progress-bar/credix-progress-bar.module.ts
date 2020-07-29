import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixProgressBarComponent} from './credix-progress-bar.component';


@NgModule({
  declarations: [CredixProgressBarComponent],
  exports: [
    CredixProgressBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CredixProgressBarModule {
}
