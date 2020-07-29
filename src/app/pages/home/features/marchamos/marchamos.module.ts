import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarchamosComponent } from './marchamos.component';
import { Routes, RouterModule } from '@angular/router';
import { FlexModule } from '@angular/flex-layout';
import {SharedModule} from '../../../../shared/shared.module';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpService } from 'src/app/core/services/http.service';
import { CustomIconLoaderService } from 'src/app/core/services/custom-icon-loader.service';
import { ModalService } from 'src/app/core/services/modal.service';
import { CredixStepperModule } from 'src/app/shared/components/credix-stepper/credix-stepper.module';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperModule } from 'src/app/shared/directives/stepper/stepper.module';


const routes: Routes = [
  {
    path: '',
    component: MarchamosComponent
  }
];

@NgModule({
  declarations: [MarchamosComponent],
  entryComponents:[MarchamosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    SharedModule,
    CredixButtonModule,
    ReactiveFormsModule,
    CredixStepperModule,
    CdkStepperModule,
    StepperModule,

  ],
  providers: [
    HttpService,
    CustomIconLoaderService,
    ModalService
  ]

})
export class MarchamosModule { }
