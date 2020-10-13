import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CredixSearchBoxComponent } from './credix-search-box.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

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
  ]
})
export class CredixSearchBoxModule {
}
