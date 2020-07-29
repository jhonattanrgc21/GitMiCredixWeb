import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignComponent} from './sign.component';
import {SignRoutingModule} from './sign-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ExtendedModule} from '@angular/flex-layout';
import {SignHeaderComponent} from './sign-header/sign-header.component';
import {SignFooterComponent} from './sign-footer/sign-footer.component';

@NgModule({
  declarations: [SignComponent, SignHeaderComponent, SignFooterComponent],
  imports: [
    CommonModule,
    SignRoutingModule,
    SharedModule,
    DeviceDetectorModule,
    ExtendedModule
  ]
})
export class SignModule {
}
