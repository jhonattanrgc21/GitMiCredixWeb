import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomIconLoaderService} from './services/custom-icon-loader.service';
import {ModalService} from './services/modal.service';
import {HttpClientModule} from '@angular/common/http';
import {CredixToastService} from './services/credix-toast.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CustomIconLoaderService,
    ModalService,
    CredixToastService
  ]
})
export class CoreModule {
}
