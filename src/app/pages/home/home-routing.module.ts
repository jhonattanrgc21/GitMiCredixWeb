import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./features/landing/landing.module.js').then(m => m.LandingModule)
      },
      {
        path: 'buttons-and-links',
        loadChildren: () => import('./features/buttons-and-links/buttons-and-links.module.js')
          .then(m => m.ButtonsAndLinksModule)
      },
      {
        path: 'sliders',
        loadChildren: () => import('./features/sliders/sliders.module.js')
          .then(m => m.SlidersModule)
      },
      {
        path: 'navigation-table',
        loadChildren: () => import('./features/navigation-tables/navigation-tables.module.js')
          .then(m => m.NavigationTablesModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./features/tables/tables.module.js')
          .then(m => m.TablesModule)
      },
      {
        path: 'cards',
        loadChildren: () => import('./features/cards/cards.module.js')
          .then(m => m.CardsModule)
      },
      {
        path: 'tabs',
        loadChildren: () => import('./features/tabs/tabs.module.js')
          .then(m => m.TabsModule)
      },
      {
        path: 'switches',
        loadChildren: () => import('./features/switches/switches.module.js')
          .then(m => m.SwitchesModule)
      },
      {
        path: 'steppers',
        loadChildren: () => import('./features/steppers/steppers.module.js')
          .then(m => m.SteppersModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./features/charts/charts.module.js')
          .then(m => m.ChartsModule)
      },
      {
        path: 'alerts-and-messages',
        loadChildren: () => import('./features/alerts-and-messages/alerts-and-messages.module.js')
          .then(m => m.AlertsAndMessagesModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./features/forms/forms.module.js')
          .then(m => m.FormsModule)
      },
      {
        path: 'credix-code',
        loadChildren: () => import('./features/credix-code/credix-code.module.js')
          .then(m => m.CredixCodeModule)
      },
      {
        path: 'pop-ups',
        loadChildren: () => import('./features/pop-ups/pop-ups.module.js')
          .then(m => m.PopUpsModule)
      },
      {
        path: 'results',
        loadChildren: () => import('./features/results/results.module.js')
          .then(m => m.ResultsModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./features/icons/icons.module.js')
          .then(m => m.IconsModule)
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
