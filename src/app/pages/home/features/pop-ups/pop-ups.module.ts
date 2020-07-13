import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FlexModule} from '@angular/flex-layout';
import {RouterModule, Routes} from '@angular/router';

import {PopUpsComponent} from './pop-ups.component';
import {CredixPopupComponent} from '../../../../shared/components/credix-popup/credix-popup.component';
import {CredixPopupModule} from '../../../../shared/components/credix-popup/credix-popup.module';
import {ModalService} from '../../../../core/services/modal.service';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixConfirmationPopupModule} from '../../../../shared/components/credix-confirmation-popup/credix-confirmation-popup.module';

const routes: Routes = [
  {
    path: '',
    component: PopUpsComponent
  }
];

@NgModule({
  declarations: [PopUpsComponent],
  entryComponents: [CredixPopupComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixPopupModule,
    CredixConfirmationPopupModule,
    CredixButtonModule
  ],
  providers: [ModalService]
})
export class PopUpsModule {
}
