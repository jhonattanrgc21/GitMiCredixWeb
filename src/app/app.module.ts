import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeES from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {CredixToastModule} from './shared/components/credix-toast';
import {NgxSpinnerModule} from 'ngx-spinner';
import { BarcodeGeneratorAllModule,QRCodeGeneratorAllModule,DataMatrixGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';

registerLocaleData(localeES, 'es');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CredixToastModule,
    CoreModule,
    NgxSpinnerModule,
    BarcodeGeneratorAllModule, 
    QRCodeGeneratorAllModule ,
    DataMatrixGeneratorAllModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'es'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
