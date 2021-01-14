import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../core/services/storage.service';
import {globalCacheBusterNotifier} from 'ngx-cacheable';
import {ActivatedRoute, Router} from '@angular/router';
import {SignInService} from './features/sign-in/sign-in.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(private storageService: StorageService,
              private activedRoute: ActivatedRoute,
              private router: Router,
              private signInService: SignInService) {
    if (this.activedRoute.snapshot.queryParamMap.get('redirect_uri')) {
      this.router.navigate(['sign/sign-in']);
      this.signInService.signInOnBot = true;
    }
  }

  ngOnInit(): void {
    this.storageService.removeCurrentSession();
    globalCacheBusterNotifier.next();
  }

}
