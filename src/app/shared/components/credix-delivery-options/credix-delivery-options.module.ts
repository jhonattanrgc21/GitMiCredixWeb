import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from 'src/app/core/services/modal.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { GlobalApiService } from 'src/app/core/services/global-api.service';
import { ChannelsApiService } from 'src/app/core/services/channels-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CredixDeliveryOptionsComponent } from './credix-delivery-options.component';
import { CredixButtonModule } from '../credix-button/credix-button.module';
import { CredixRadioButtonModule } from '../credix-radio-button/credix-radio-button.module';
import { CredixLinkButtonModule } from '../credix-link-button/credix-link-button.module';
import { MatRadioModule } from '@angular/material/radio';
import { CredixSelectModule } from '../credix-select/credix-select.module';
import { PhoneMaskModule } from '../../pipes/phone-mask/phone-mask.module';
import { SharedModule } from '../../shared.module';
import { NewAddressPopupComponent } from './new-address-popup/new-address-popup.component';
import { CredixInputFieldModule } from '../credix-input-field/credix-input-field.module';



@NgModule({
  declarations: [
    CredixDeliveryOptionsComponent,
    NewAddressPopupComponent
  ],
  exports: [
    CredixDeliveryOptionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CredixButtonModule,
    CredixRadioButtonModule,
    CredixLinkButtonModule,
    CredixInputFieldModule,
    MatRadioModule,
    CredixSelectModule,
    PhoneMaskModule
  ],
  providers: [
    ModalService,
    StorageService,
    GlobalApiService,
    ChannelsApiService
  ]
})
export class CredixDeliveryOptionsModule { }
