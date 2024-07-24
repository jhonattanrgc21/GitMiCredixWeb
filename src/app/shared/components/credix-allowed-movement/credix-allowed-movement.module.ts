import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredixAllowedMovementComponent } from './credix-allowed-movement.component';
import { CredixCheckboxButtonModule } from "../credix-checkbox-button/credix-checkbox-button.module";
import { CredixNumericBlockModule } from '../credix-numeric-block/credix-numeric-block.module';



@NgModule({
    declarations: [
        CredixAllowedMovementComponent
    ],
    exports: [
        CredixAllowedMovementComponent
    ],
    imports: [
        CommonModule,
        CredixCheckboxButtonModule,
        CredixNumericBlockModule
    ]
})
export class CredixAllowedMovementModule { }
