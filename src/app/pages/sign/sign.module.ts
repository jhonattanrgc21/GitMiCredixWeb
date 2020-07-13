import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignComponent} from './sign.component';
import {SignRoutingModule} from './sign-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [SignComponent],
  imports: [
    CommonModule,
    SignRoutingModule,
    SharedModule,
  ]
})
export class SignModule {
}
