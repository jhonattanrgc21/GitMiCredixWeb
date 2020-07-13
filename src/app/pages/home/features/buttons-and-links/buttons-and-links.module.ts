import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonsAndLinksComponent} from './buttons-and-links.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixButtonModule} from '../../../../shared/components/credix-button/credix-button.module';
import {CredixLinkButtonModule} from '../../../../shared/components/credix-link-button/credix-link-button.module';

const routes: Routes = [
  {
    path: '',
    component: ButtonsAndLinksComponent
  }
];

@NgModule({
  declarations: [ButtonsAndLinksComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixButtonModule,
    CredixLinkButtonModule
  ]
})
export class ButtonsAndLinksModule {
}
