import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredixCardsListSelectionComponent } from './credix-cards-list-selection.component';
import { CredixCheckboxButtonModule } from '../credix-checkbox-button/credix-checkbox-button.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [CredixCardsListSelectionComponent],
  exports: [CredixCardsListSelectionComponent],
  imports: [
    CommonModule,
    CredixCheckboxButtonModule,
    MatIconModule
  ]
})
export class CredixCardsListSelectionModule { }
