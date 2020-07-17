import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from "../../../../shared/shared.module";
import {CredixButtonModule} from "../../../../shared/components/credix-button/credix-button.module";
import {ReactiveFormsModule} from "@angular/forms";

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
    SharedModule,
    CredixButtonModule,
    ReactiveFormsModule,
  ]
})
export class SignInModule {
}
