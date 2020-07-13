import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignComponent} from './sign.component';

const routes: Routes = [
  {
    path: '',
    component: SignComponent,
    children: [
      {
        path: '',
        redirectTo: 'sign-in'
      },
      {
        path: 'sign-in',
        loadChildren: () => import('./features/sign-in/sign-in.module.js').then(m => m.SignInModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignRoutingModule {
}
