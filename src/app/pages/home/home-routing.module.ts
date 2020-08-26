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
        path: 'movements-&-account-statement',
        loadChildren: () => import('./features/movements-&-account-statement/movements-&-account-statement.module.js')
          .then(m => m.MovementsAccountStatementModule)
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
      },
      {
        path: 'report-transference',
        loadChildren: () => import('./features/report-transference/report-transference.module.js').then(m => m.ReportTransferenceModule)
      },
      {
        path: 'personal-credit',
        loadChildren: () => import('./features/personal-credit/personal-credit.module.js').then(m => m.PersonalCreditModule)
        
      },
      {
        path: 'buy-without-card',
        loadChildren: () => import('./features/buy-without-card/buy-without-card.module.js').then(m => m.BuyWithoutCardModule)
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
