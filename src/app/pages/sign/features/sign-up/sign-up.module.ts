import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { CredixButtonModule } from 'src/app/shared/components/credix-button/credix-button.module';
import { CredixPopupModule } from 'src/app/shared/components/credix-popup/credix-popup.module';
import { CredixConfirmationPopupModule } from 'src/app/shared/components/credix-confirmation-popup/credix-confirmation-popup.module';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent
  }
];

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    CredixButtonModule,
    CredixPopupModule,
    CredixConfirmationPopupModule
  ]
})
export class SignUpModule { }
