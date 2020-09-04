import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BuyWithoutCardComponent} from './buy-without-card.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {CredixCardsModule} from 'src/app/shared/directives/credix-cards/credix-cards.module';
import {FlexModule} from '@angular/flex-layout';
import {CredixStepperModule} from 'src/app/shared/components/credix-stepper/credix-stepper.module';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CredixButtonModule} from 'src/app/shared/components/credix-button/credix-button.module';
import {CredixRadioButtonModule} from 'src/app/shared/components/credix-radio-button/credix-radio-button.module';
import {MatDividerModule} from '@angular/material/divider';
import {CredixSelectModule} from 'src/app/shared/components/credix-select/credix-select.module';
import {MatOptionModule} from '@angular/material/core';
import {CredixInputFieldModule} from 'src/app/shared/components/credix-input-field/credix-input-field.module';
import {CredixSliderModule} from 'src/app/shared/components/credix-slider/credix-slider.module';
import {CredixNumericBlockModule} from 'src/app/shared/components/credix-numeric-block/credix-numeric-block.module';
import {CredixLinkButtonModule} from 'src/app/shared/components/credix-link-button/credix-link-button.module';
import {MatIconModule} from '@angular/material/icon';
import {CredixCodeInputModule} from 'src/app/shared/components/credix-code-input/credix-code-input.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {NgxMaskModule} from 'ngx-mask';
import {NgxBarcode6Module} from 'ngx-barcode6';
import {BuyWithoutCardFirstStepComponent} from './buy-without-card-first-step/buy-without-card-first-step.component';
import {BuyWithoutCardSecondStepComponent} from './buy-without-card-second-step/buy-without-card-second-step.component';
import {BuyWithoutCardService} from './buy-without-card.service';
import {CredixDividerModule} from '../../../../shared/directives/credix-divider/credix-divider.module';

const routes: Routes = [
  {
    path: '',
    component: BuyWithoutCardComponent
  }
];

@NgModule({
  declarations: [BuyWithoutCardComponent, BuyWithoutCardFirstStepComponent, BuyWithoutCardSecondStepComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    CredixCardsModule,
    FlexModule,
    CredixStepperModule,
    CdkStepperModule,
    CredixButtonModule,
    CredixRadioButtonModule,
    MatDividerModule,
    CredixSelectModule,
    MatOptionModule,
    CredixInputFieldModule,
    CredixSliderModule,
    CredixNumericBlockModule,
    CredixLinkButtonModule,
    MatIconModule,
    CredixCodeInputModule,
    SharedModule,
    NgxMaskModule,
    NgxBarcode6Module,
    CredixDividerModule
  ],
  providers: [
    BuyWithoutCardService
  ]
})
export class BuyWithoutCardModule {
}
