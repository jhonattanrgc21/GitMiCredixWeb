import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomIconLoaderService} from './services/custom-icon-loader.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CredixToastService} from './services/credix-toast.service';
import {HttpRequestsResponseInterceptor} from './interceptors/http.interceptor';
import {AuthorizationGuard} from './guards/authorization.guard';
import {HttpService} from './services/http.service';
import {StorageService} from './services/storage.service';
import {IConfig, NgxMaskModule} from 'ngx-mask';
import {NavigationService} from './services/navigation.service';
import {TagsService} from './services/tags.service';
import {ScrollService} from './services/scroll.service';
import {GlobalApiService} from './services/global-api.service';
import {ChannelsApiService} from './services/channels-api.service';
import {ApplicantApiService} from './services/applicant-api.service';
import {AccountApiService} from './services/account-api.service';
import {CustomerApiService} from './services/customer-api.service';
import {PublicServicesApiService} from './services/public-services-api.service';
import {CredixCodeErrorService} from './services/credix-code-error.service';
import {CredixBotService} from './services/credix-bot.service';
import { ExtendTermTotalOwedApiService } from './services/extend-term-total-owed-apoi.service';
import { ModalService } from './services/modal.service';
import { SharedModule } from '../shared/shared.module';
import { HomeService } from '../pages/home/home.service';
import { SignInService } from '../pages/sign/features/sign-in/sign-in.service';

const maskConfig: Partial<IConfig> = {
  validation: false,
  decimalMarker: ',',
  thousandSeparator: '.',
  specialCharacters: ['(', ')', '-', '*', '[', ']', ' ', '@', '"', '\'', '+', '.', ',', '=', '/']
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxMaskModule.forRoot(maskConfig),
    SharedModule
  ],
  providers: [
    CustomIconLoaderService,
    CredixToastService,
    HttpService,
    CredixBotService,
    CredixCodeErrorService,
    GlobalApiService,
    ChannelsApiService,
    ApplicantApiService,
    AccountApiService,
    CustomerApiService,
    PublicServicesApiService,
    TagsService,
    NavigationService,
    StorageService,
    ScrollService,
    AuthorizationGuard,
    ExtendTermTotalOwedApiService,
    ModalService,
    HomeService,
    SignInService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestsResponseInterceptor, multi: true}
  ]
})
export class CoreModule {
}
