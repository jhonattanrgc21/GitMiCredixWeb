import {Component} from '@angular/core';
import {CustomIconLoaderService} from './core/services/custom-icon-loader.service';
import {LoadingSpinnerService} from './core/services/loading-spinner.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CredixBotService} from './core/services/credix-bot.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mi Credix';

  constructor(customIconLoaderService: CustomIconLoaderService,
              private loadingSpinnerService: LoadingSpinnerService,
              private spinner: NgxSpinnerService,
              private readonly credixBotService: CredixBotService,
              private route: Router) {
    customIconLoaderService.registerIcons();
    this.loadingSpinnerService.loadingStatusObs.subscribe(value => {
      value ? this.spinner.show() : this.spinner.hide();
    });
    const url = window.location.href;
    if (url.includes('?redirect_uri')) {
      // tslint:disable-next-line:max-line-length
      this.credixBotService.redirectUri = 'redirect_uri' + (url.split('redirect_uri')[1]).split('account_linking_token')[0] + 'account_linking_token' + url.split('account_linking_token')[1];

      this.route.navigate( ['/sign'], {queryParams: { redirect_uri: (url.split('redirect_uri=')[1])}} );

    }
  }

}
