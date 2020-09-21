import {Component, OnInit} from '@angular/core';
import {StorageService} from '../../core/services/storage.service';
import {GlobalRequestsService} from '../../core/services/global-requests.service';
import {globalCacheBusterNotifier} from 'ngx-cacheable';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  constructor(private storageService: StorageService,
              private globalRequestsService: GlobalRequestsService) {
    this.globalRequestsService.clearCache();
  }

  ngOnInit(): void {
    this.storageService.removeCurrentSession();
    globalCacheBusterNotifier.next();
  }
}
