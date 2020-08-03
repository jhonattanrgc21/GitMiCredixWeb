import {Component} from '@angular/core';
import {CustomIconLoaderService} from './core/services/custom-icon-loader.service';
import {LoadingSpinnerService} from './core/services/loading-spinner.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mi Credix';

  constructor(customIconLoaderService: CustomIconLoaderService,
              private loadingSpinnerService: LoadingSpinnerService,
              private spinner: NgxSpinnerService) {
    customIconLoaderService.registerIcons();
    this.loadingSpinnerService.loadingStatusObs.subscribe(value => {
      value ? this.spinner.show() : this.spinner.hide();
    });
  }

}
