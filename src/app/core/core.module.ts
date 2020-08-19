import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomIconLoaderService} from './services/custom-icon-loader.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CredixToastService} from './services/credix-toast.service';
import {HttpRequestsResponseInterceptor} from './interceptors/http.interceptor';
import {AuthorizationGuard} from './guards/authorization.guard';
import {HttpService} from './services/http.service';
import {SecurityService} from './services/security.service';
import {StorageService} from './services/storage.service';
import {GlobalRequestsService} from './services/global-requests.service';
import {IConfig, NgxMaskModule} from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
  decimalMarker: ',',
  thousandSeparator: '.',
  dropSpecialCharacters: true
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [
    CustomIconLoaderService,
    CredixToastService,
    HttpService,
    SecurityService,
    GlobalRequestsService,
    StorageService,
    AuthorizationGuard,
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestsResponseInterceptor, multi: true}
  ]
})
export class CoreModule {
}
