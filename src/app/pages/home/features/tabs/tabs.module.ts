import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsComponent} from './tabs.component';
import {RouterModule, Routes} from '@angular/router';
import {FlexModule} from '@angular/flex-layout';
import {CredixTabModule} from '../../../../shared/components/credix-tab/credix-tab.module';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent
  }
];

@NgModule({
  declarations: [TabsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexModule,
    CredixTabModule,
  ]
})
export class TabsModule {
}
