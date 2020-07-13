import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TablesComponent} from './tables.component';
import {MatTableModule} from '@angular/material/table';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {TablesDirectivesModule} from '../../../../shared/directives/tables/tables-directives.module';
import {CredixPaginatorModule} from '../../../../shared/components/credix-paginator/credix-paginator.module';
import {NgxPaginationModule} from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    component: TablesComponent
  }
];

@NgModule({
  declarations: [TablesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    FlexModule,
    TablesDirectivesModule,
    CredixPaginatorModule,
    NgxPaginationModule
  ]
})
export class TablesModule {
}
