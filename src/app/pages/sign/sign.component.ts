import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../core/services/storage.service';
import {globalCacheBusterNotifier} from 'ngx-cacheable';
import {ActivatedRoute, Router} from '@angular/router';
import {CredixBotService} from '../../core/services/credix-bot.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(private readonly credixBotService: CredixBotService,
              private storageService: StorageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {

    // tslint:disable-next-line:max-line-length
    if (this.activatedRoute.snapshot.queryParamMap.get('redirect_uri') && this.activatedRoute.snapshot.queryParamMap.get('account_linking_token')) {
      this.credixBotService.isFromBot = true;
      this.credixBotService.redirectUri = this.activatedRoute.snapshot.queryParamMap.get('redirect_uri');
      this.credixBotService.accountLinkingToken = this.activatedRoute.snapshot.queryParamMap.get('account_linking_token');
      this.router.navigate(['sign/sign-in']);
    }
  }

  ngOnInit(): void {
    this.storageService.removeCurrentSession();
    globalCacheBusterNotifier.next();
  }

}
