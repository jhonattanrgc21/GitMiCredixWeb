import {NgModule} from '@angular/core';
import {CredixToastComponent} from './credix-toast.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [CredixToastComponent],
  imports: [
    CommonModule,
    OverlayModule
  ],
  entryComponents: [CredixToastComponent]
})
export class CredixToastModule {
}
