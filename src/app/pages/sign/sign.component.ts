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
    if (this.activatedRoute.snapshot.fragment?.split('redirect_uri=')[1]) {
      this.credixBotService.isFromBot = true;
      this.credixBotService.redirectUri = this.activatedRoute.snapshot.fragment.split('redirect_uri=')[1];
      this.router.navigate(['sign/sign-in']);
    }
  }

  ngOnInit(): void {
    this.storageService.removeCurrentSession();
    globalCacheBusterNotifier.next();
  }

}
