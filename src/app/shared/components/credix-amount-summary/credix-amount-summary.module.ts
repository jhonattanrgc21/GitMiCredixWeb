import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CredixAmountSummaryComponent} from './credix-amount-summary.component';
import {CredixNumericBlockModule} from "../credix-numeric-block/credix-numeric-block.module";
import {FlexModule} from "@angular/flex-layout";



@NgModule({
  declarations: [
    CredixAmountSummaryComponent
  ],
  exports: [
    CredixAmountSummaryComponent
  ],
    imports: [
        CommonModule,
        CredixNumericBlockModule,
        FlexModule
    ]
})
export class CredixAmountSummaryModule { }
