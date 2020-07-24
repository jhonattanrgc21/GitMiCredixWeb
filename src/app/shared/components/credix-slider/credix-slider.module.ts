import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixSliderComponent} from './credix-slider.component';
import {MatSliderModule} from '@angular/material/slider';
import {FlexModule} from '@angular/flex-layout';


@NgModule({
  declarations: [CredixSliderComponent],
  exports: [
    CredixSliderComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    FlexModule
  ]
})
export class CredixSliderModule {
}
