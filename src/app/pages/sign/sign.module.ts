import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignComponent} from './sign.component';
import {SignRoutingModule} from './sign-routing.module';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {SignHeaderComponent} from './sign-header/sign-header.component';
import {SignFooterComponent} from './sign-footer/sign-footer.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [SignComponent, SignHeaderComponent, SignFooterComponent],
  imports: [
    CommonModule,
    SignRoutingModule,
    DeviceDetectorModule,
    ExtendedModule,
    MatIconModule,
    FlexModule,
    MatButtonModule
  ]
})
export class SignModule {
}
