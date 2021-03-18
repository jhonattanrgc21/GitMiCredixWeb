import {Component} from '@angular/core';
import {CustomIconLoaderService} from './core/services/custom-icon-loader.service';
import {LoadingSpinnerService} from './core/services/loading-spinner.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CredixBotService} from './core/services/credix-bot.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mi Credix';
  private readonly botRedirectUri: string;
  private readonly botToken: string;

  constructor(customIconLoaderService: CustomIconLoaderService,
              private loadingSpinnerService: LoadingSpinnerService,
              private spinner: NgxSpinnerService,
              private readonly credixBotService: CredixBotService) {
    customIconLoaderService.registerIcons();
    this.loadingSpinnerService.loadingStatusObs.subscribe(value => {
      value ? this.spinner.show() : this.spinner.hide();
    });
    const url = window.location.href;
    if (url.includes('?redirect_uri')) {
      this.botRedirectUri = 'redirect_uri' + url.split('redirect_uri')[1];
      this.botToken = 'account_linking_token' + url.split('account_linking_token')[1];
      this.credixBotService.redirectUri = this.botRedirectUri;
      this.credixBotService.accountLinkingToken = this.botToken;
    }
  }

}
