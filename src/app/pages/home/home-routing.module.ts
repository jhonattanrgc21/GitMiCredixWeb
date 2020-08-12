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
        path: 'movements-state-account',
        loadChildren: () => import('./features/movements-state-account/movements-state-account.module.js').then( m => m.MovementsStateAccountModule)
      },
      {
        path: 'awards',
        loadChildren: () => import('./features/awards/awards.module.js').then(m => m.AwardsModule)
      },
      {
        path: 'marchamos',
        loadChildren: () => import('./features/marchamos/marchamos.module.js').then(m => m.MarchamosModule)
      },
      {
        path: 'payment-places',
        loadChildren: () => import('./features/payment-places/payment-places.module.js').then(m => m.PaymentPlacesModule)
      },
      {
        path: 'send-money',
        loadChildren: () => import('./features/send-money/send-money.module.js').then(m => m.SendMoneyModule)
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
