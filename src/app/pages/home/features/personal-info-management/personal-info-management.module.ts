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
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';
import {MatIconModule} from '@angular/material/icon';
import {CredixCodeInputModule} from '../../../../shared/components/credix-code-input/credix-code-input.module';
import {CredixInputFieldModule} from '../../../../shared/components/credix-input-field/credix-input-field.module';
import {CredixSelectModule} from '../../../../shared/components/credix-select/credix-select.module';
import {MatOptionModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {EmailMaskModule} from '../../../../shared/pipes/email-mask/email-mask.module';
import {PhoneMaskModule} from '../../../../shared/pipes/phone-mask/phone-mask.module';
import {CredixTextareaFieldModule} from '../../../../shared/components/credix-textarea-field/credix-textarea-field.module';
import {CredixResultNotificationModule} from '../../../../shared/components/credix-result-notification/credix-result-notification.module';

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
    CredixImageUploadModule,
    CredixLinkButtonModule,
    MatIconModule,
    CredixCodeInputModule,
    CredixInputFieldModule,
    CredixSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    EmailMaskModule,
    PhoneMaskModule,
    CredixTextareaFieldModule,
    CredixResultNotificationModule
  ],
  providers: [
    PersonalInfoManagementService
  ]
})
export class PersonalInfoManagementModule {
}
