import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PinCodeComponent } from './pin-code.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import { CredixCardsModule } from 'src/app/shared/directives/credix-cards/credix-cards.module';
import { ShareModule } from 'ngx-sharebuttons';
import {MatIconModule} from '@angular/material/icon';
import { CardDetailsComponent } from './card-details/card-details.component';

const routes: Routes = [{
  path: '',
  component: PinCodeComponent,
}];

@NgModule({
  declarations: [PinCodeComponent, CardDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixCardsModule,
    ShareModule,
    MatIconModule,
  ]
})
export class PinCodeModule { }
