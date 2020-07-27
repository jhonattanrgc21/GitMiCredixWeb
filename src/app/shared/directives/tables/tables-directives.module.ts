import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixHeaderRowDirective} from './credix-header-row.directive';
import {CredixHeaderCellDirective} from './credix-header-cell.directive';
import {CredixRowDirective} from './credix-row.directive';
import {CredixCellDirective} from './credix-cell.directive';


@NgModule({
  declarations: [
    CredixHeaderRowDirective,
    CredixHeaderCellDirective,
    CredixRowDirective,
    CredixCellDirective],
  imports: [
    CommonModule
  ],
  exports: [
    CredixHeaderRowDirective,
    CredixHeaderCellDirective,
    CredixRowDirective,
    CredixCellDirective
  ]
})
export class TablesDirectivesModule {
}
