import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in.component';
import {RouterModule, Routes} from '@angular/router';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {FlexModule} from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  }
];

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CredixButtonModule,
    FlexModule,
  ]
})
export class SignInModule {
}
