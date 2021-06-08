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
        loadChildren: () => import('./features/marchamo/marchamo.module.js').then(m => m.MarchamoModule)
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
      /*{
        path: 'change-pin',
        loadChildren: () => import('./features/change-pin/change-pin.module.js').then(m => m.ChangePinModule)
      },*/
      {
        path: 'personal-info',
        loadChildren: () => import('./features/personal-info-management/personal-info-management.module.js')
          .then(m => m.PersonalInfoManagementModule)
      },
      {
        path: 'buy-without-card',
        loadChildren: () => import('./features/buy-without-card/buy-without-card.module.js').then(m => m.BuyWithoutCardModule)
      },
      {
        path: 'anticipated-cancellation',
        loadChildren: () => import('./features/anticipated-cancellation/anticipated-cancellation.module.js')
          .then(m => m.AnticipatedCancellationModule)
      },
      {
        path: 'extend-term',
        loadChildren: () => import('./features/extend-term/extend-term.module.js').then(m => m.ExtendTermModule)
      },
      {
        path: 'change-password',
        loadChildren: () => import('./features/change-password/change-password.module.js').then(m => m.ChangePasswordModule)
      },
      {
        path: 'increase-limit',
        loadChildren: () => import('./features/increase-limit/increase-limit.module.js').then(m => m.IncreaseLimitModule)
      },
      {
        path: 'favorites-management',
        loadChildren: () => import('./features/favorites-management/favorites-management.module.js').then(m => m.FavoritesManagementModule)
      },
      {
        path: 'additional-cards-management',
        loadChildren: () => import('./features/additional-cards-management/additional-cards-management.module.js')
          .then(m => m.AdditionalCardsManagementModule)
      },
      {
        path: 'public-services',
        loadChildren: () => import('./features/public-services/public-services.module.js').then(m => m.PublicServicesModule)
      },
      {
        path: 'current-pin',
        loadChildren: () => import('./features/pin-code/pin-code.module.js').then(m => m.PinCodeModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
