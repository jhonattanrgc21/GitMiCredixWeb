import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredixMasComponent } from './credix-mas.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CredixMasInfoComponent } from './credix-mas-info/credix-mas-info.component';
import { CredixButtonModule } from 'src/app/shared/components/credix-button/credix-button.module';
import { CredixMasAccountInfoComponent } from './credix-mas-account-info/credix-mas-account-info.component';
import { SubscribePopupComponent } from './credix-mas-account-info/subscribe-popup/subscribe-popup.component';
import { CredixNumericBlockModule } from 'src/app/shared/components/credix-numeric-block/credix-numeric-block.module';
import { CredixMasSuccessScreenComponent } from './credix-mas-success-screen/credix-mas-success-screen.component';
import { CredixResultViewModule } from 'src/app/shared/components/credix-result-view/credix-result-view.module';
import { CredixShareButtonModule } from 'src/app/shared/components/credix-share-button/credix-share-button.module';


const routes: Routes = [
  {
    path: '',
    component: CredixMasComponent,
    children: [
      {
        path: '',
        redirectTo: 'info'
      },
      {
        path: 'info',
        component: CredixMasInfoComponent
      },
      {
        path: 'account-info',
        component: CredixMasAccountInfoComponent
      },
      {
        path: 'success',
        component: CredixMasSuccessScreenComponent
      }
    ]
  }

];


@NgModule({
  declarations: [CredixMasComponent, CredixMasInfoComponent, CredixMasAccountInfoComponent, SubscribePopupComponent, CredixMasSuccessScreenComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CredixButtonModule,
    CredixNumericBlockModule,
    CredixResultViewModule,
    CredixShareButtonModule
  ]
})
export class CredixMasModule { }
