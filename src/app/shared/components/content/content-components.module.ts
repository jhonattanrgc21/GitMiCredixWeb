import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleCardNotActiveComponent } from './title-card-not-active-content/title-card-not-active-content.component';
import { CredixButtonModule } from '../credix-button/credix-button.module';
import { CredixLinkButtonModule } from '../credix-link-button/credix-link-button.module';

@NgModule({
  declarations: [TitleCardNotActiveComponent],
  imports: [ CommonModule, CredixButtonModule, CredixLinkButtonModule ],
  exports: [ TitleCardNotActiveComponent ],
})
export class ContentComponentsModule {}
