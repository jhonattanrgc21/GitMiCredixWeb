import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarchamosComponent } from './marchamos.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';


const routes: Routes = [
  {
    path: '',
    component: MarchamosComponent
  }
];

@NgModule({
  declarations: [MarchamosComponent],
  entryComponents:[MarchamosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule
  ]
})
export class MarchamosModule { }
