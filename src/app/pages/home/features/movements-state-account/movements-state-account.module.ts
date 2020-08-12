import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MovementsStateAccountComponent} from "./movements-state-account.component";
import {CredixTabModule} from "../../../../shared/components/credix-tab/credix-tab.module";
import {SharedModule} from "../../../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {CredixPaginatorModule} from "../../../../shared/components/credix-paginator/credix-paginator.module";
import {NgxPaginationModule} from "ngx-pagination";
import {TablesDirectivesModule} from "../../../../shared/directives/tables/tables-directives.module";
import {DateFormatterModule} from "../../../../shared/pipes/date-formatter/date-formatter.module";
import {CredixLinkButtonModule} from "../../../../shared/components/credix-link-button/credix-link-button.module";

const routes: Routes = [
  {
    path: '',
    component: MovementsStateAccountComponent
  }
];

@NgModule({
  declarations: [MovementsStateAccountComponent],
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
  ]
})
export class MovementsStateAccountModule { }
