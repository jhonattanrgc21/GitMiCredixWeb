import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredixSearchBoxComponent} from './credix-search-box.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {CredixDividerModule} from '../../directives/credix-divider/credix-divider.module';
import {MatRippleModule} from '@angular/material/core';
import {HighlightSearchModule} from '../../pipes/highlight-search/highlight-search.module';

@NgModule({
  declarations: [CredixSearchBoxComponent],
  exports: [
    CredixSearchBoxComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatDividerModule,
    CredixDividerModule,
    MatRippleModule,
    HighlightSearchModule,
  ]
})
export class CredixSearchBoxModule {
}
