import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredixMasComponent } from './credix-mas.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CredixMasInfoComponent } from './credix-mas-info/credix-mas-info.component';
import { CredixButtonModule } from 'src/app/shared/components/credix-button/credix-button.module';

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
      }
    ]
  }

];


@NgModule({
  declarations: [CredixMasComponent, CredixMasInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CredixButtonModule
  ]
})
export class CredixMasModule { }
