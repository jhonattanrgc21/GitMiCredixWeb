import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonalInfoComponent} from './personal-info.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixCardsModule} from '../../../../shared/directives/credix-cards/credix-cards.module';
import {MatCardModule} from '@angular/material/card';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {MatDividerModule} from '@angular/material/divider';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';
import {CredixImageUploadModule} from '../../../../shared/components/credix-image-upload/credix-image-upload.module';
import {PersonalInfoService} from './personal-info.service';

const routes: Routes = [
  {
    path: '',
    component: PersonalInfoComponent
  }
];

@NgModule({
  declarations: [PersonalInfoComponent],
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
    PersonalInfoService
  ]
})
export class PersonalInfoModule {
}
