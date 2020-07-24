import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixSwitchComponent} from './credix-switch.component';


@NgModule({
  declarations: [CredixSwitchComponent],
  exports: [
    CredixSwitchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CredixSwitchModule {
}
