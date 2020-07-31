import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';
import {AuthorizationGuard} from '../../core/guards/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./features/landing/landing.module.js').then(m => m.LandingModule)
      },
      {
        path: 'awards',
        loadChildren: () => import('./features/awards/awards.module.js').then(m => m.AwardsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
