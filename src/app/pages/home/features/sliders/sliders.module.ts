import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SlidersComponent} from './sliders.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixSliderModule} from '../../../../shared/components/credix-slider/credix-slider.module';

const routes: Routes = [
  {
    path: '',
    component: SlidersComponent
  }
];

@NgModule({
  declarations: [SlidersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixSliderModule
  ]
})
export class SlidersModule {
}
