import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PersonalInfoComponent} from './personal-info/personal-info.component';
import {FlexModule} from '@angular/flex-layout';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {MatCardModule} from '@angular/material/card';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {MatDividerModule} from '@angular/material/divider';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {CredixImageUploadModule} from '../../../../shared/components/credix-image-upload/credix-image-upload.module';
import {PersonalInfoManagementService} from './personal-info-management.service';
import {PersonalInfoEditorComponent} from './personal-info-editor/personal-info-editor.component';

const routes: Routes = [
  {
    path: '',
    component: PersonalInfoComponent
  },
  {
    path: 'edit',
    component: PersonalInfoEditorComponent
  }
];

@NgModule({
  declarations: [PersonalInfoComponent, PersonalInfoEditorComponent],
  imports: [
    CommonModule,
    FlexModule,
    RouterModule.forChild(routes),
    CredixCardsModule,
    MatCardModule,
    CredixButtonModule,
    MatDividerModule,
    CredixDividerModule,
    CredixImageUploadModule
  ],
  providers: [
    PersonalInfoManagementService
  ]
})
export class PersonalInfoManagementModule {
}
