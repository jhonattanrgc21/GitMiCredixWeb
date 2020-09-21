import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AutomaticsComponent} from './automatics.component';
import {RouterModule, Routes} from '@angular/router';
import {CredixNavigationTableModule} from '../../../../../shared/components/credix-navigation-table/credix-navigation-table.module';
import {CredixInputFieldModule} from '../../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixButtonModule} from '../../../../../shared/components/credix-button/credix-button.module';
import {CredixSelectModule} from '../../../../../shared/components/credix-select/credix-select.module';
import {CredixLinkButtonModule} from '../../../../../shared/components/credix-link-button/credix-link-button.module';
import {CredixCodeInputModule} from '../../../../../shared/components/credix-code-input/credix-code-input.module';
import {ModalService} from '../../../../../core/services/modal.service';
import {AutomaticsService} from './automatics.service';
import {SharedModule} from '../../../../../shared/shared.module';
import {DateFormatterModule} from '../../../../../shared/pipes/date-formatter/date-formatter.module';
import {CredixToastService} from '../../../../../core/services/credix-toast.service';

const routes: Routes = [
  {
    path: '',
    component: AutomaticsComponent
  }
];

@NgModule({
  declarations: [
    AutomaticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CredixNavigationTableModule,
    CredixInputFieldModule,
    CredixButtonModule,
    CredixInputFieldModule,
    CredixSelectModule,
    CredixLinkButtonModule,
    CredixCodeInputModule,
    DateFormatterModule
  ],
  providers: [
    ModalService,
    AutomaticsService,
    DatePipe,
    CredixToastService
  ]
})
export class AutomaticsModule {
}
