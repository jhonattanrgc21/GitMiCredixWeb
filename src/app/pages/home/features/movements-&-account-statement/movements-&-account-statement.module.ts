import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovementsAccountStatementComponent} from './movements-&-account-statement.component';
import {CredixTabModule} from '../../../../shared/components/credix-tab/credix-tab.module';
import {SharedModule} from '../../../../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';
import {CredixPaginatorModule} from '../../../../shared/components/credix-paginator/credix-paginator.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {TablesDirectivesModule} from '../../../../shared/directives/tables/tables-directives.module';
import {DateFormatterModule} from '../../../../shared/pipes/date-formatter/date-formatter.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {MovementsComponent} from './movements/movements.component';
import {AccountStatementComponent} from './account-statement/account-statement.component';
import {AccountStatementToolbarComponent} from './account-statement/account-statement-toolbar/account-statement-toolbar.component';
import {MovementsToolbarComponent} from './movements/movements-toolbar/movements-toolbar.component';
import {MovementsService} from './movements/movements.service';
import {CredixSwitchModule} from '../../../../shared/components/credix-switch/credix-switch.module';
import {CredixNumericBlockModule} from '../../../../shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {AccountStatementService} from './account-statement/account-statement.service';
import {GlobalApiService} from '../../../../core/services/global-api.service';

const routes: Routes = [
  {
    path: '',
    component: MovementsAccountStatementComponent,
    children: [
      {
        path: '',
        redirectTo: 'movements',
        pathMatch: 'full'
      },
      {
        path: 'movements',
        children: [
          {
            path: '',
            component: MovementsComponent
          },
          {
            path: '',
            outlet: 'toolbar',
            component: MovementsToolbarComponent
          }
        ]
      },
      {
        path: 'account-statement',
        children: [
          {
            path: '',
            component: AccountStatementComponent
          },
          {
            path: '',
            outlet: 'toolbar',
            component: AccountStatementToolbarComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    MovementsAccountStatementComponent,
    MovementsComponent,
    MovementsToolbarComponent,
    AccountStatementComponent,
    AccountStatementToolbarComponent],
  imports: [
    CommonModule,
    CredixTabModule,
    SharedModule,
    RouterModule.forChild(routes),
    CredixPaginatorModule,
    NgxPaginationModule,
    TablesDirectivesModule,
    DateFormatterModule,
    CredixLinkButtonModule,
    CredixSwitchModule,
    CredixNumericBlockModule,
    CredixSelectModule,
  ],
  providers: [
    MovementsService,
    AccountStatementService,
    GlobalApiService
  ]
})
export class MovementsAccountStatementModule {
}
