import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IconsComponent} from './icons.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: IconsComponent
  }
];

@NgModule({
  declarations: [IconsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    MatIconModule
  ]
})
export class IconsModule {
}
