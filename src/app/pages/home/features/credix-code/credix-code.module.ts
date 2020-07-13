import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixCodeComponent} from './credix-code.component';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';
import {CredixCodeInputModule} from 'src/app/shared/components/credix-code-input/credix-code-input.module';

const routes: Routes = [
  {
    path: '',
    component: CredixCodeComponent
  }
];

@NgModule({
  declarations: [CredixCodeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixCodeInputModule
  ]
})
export class CredixCodeModule {
}
