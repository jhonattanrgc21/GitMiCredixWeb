import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomIconLoaderService} from './services/custom-icon-loader.service';
import {ModalService} from './services/modal.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CredixToastService} from './services/credix-toast.service';
import {HttpRequestsResponseInterceptor} from './interceptors/http.interceptor';
import {AuthorizationGuard} from './guards/authorization.guard';
import {HttpService} from './services/http.service';
import {SecurityService} from './services/security.service';
import {StorageService} from './services/storage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CustomIconLoaderService,
    ModalService,
    CredixToastService,
    HttpService,
    SecurityService,
    StorageService,
    AuthorizationGuard,
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestsResponseInterceptor, multi: true}
  ]
})
export class CoreModule {
}
