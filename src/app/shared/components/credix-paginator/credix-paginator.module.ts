import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixPaginatorComponent} from './credix-paginator.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [CredixPaginatorComponent],
  exports: [
    CredixPaginatorComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule
  ]
})
export class CredixPaginatorModule {
}
