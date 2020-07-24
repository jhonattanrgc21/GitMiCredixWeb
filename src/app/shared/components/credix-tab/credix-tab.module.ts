import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixTabComponent} from './credix-tab.component';

@NgModule({
  declarations: [CredixTabComponent],
  exports: [
    CredixTabComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CredixTabModule {
}
