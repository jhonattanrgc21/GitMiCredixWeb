import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SignInComponent} from './sign-in.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from "../../../../shared/shared.module";
import {CredixButtonModule} from "../../../../shared/components/credix-button/credix-button.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CredixFormsModule} from "../../../../shared/directives/credix-forms/credix-forms.module";
import {CredixTooltipsModule} from "../../../../shared/directives/credix-tooltips/credix-tooltips.module";

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
    CredixFormsModule,
    CredixTooltipsModule,
  ]
})
export class SignInModule {
}
