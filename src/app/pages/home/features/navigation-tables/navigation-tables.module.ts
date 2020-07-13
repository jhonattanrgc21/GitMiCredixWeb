import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationTablesComponent} from './navigation-tables.component';
import {FlexModule} from '@angular/flex-layout';
import {CredixNavigationTableModule} from '../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NavigationTablesComponent
  }
];

@NgModule({
  declarations: [NavigationTablesComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixNavigationTableModule
  ]
})
export class NavigationTablesModule {
}
