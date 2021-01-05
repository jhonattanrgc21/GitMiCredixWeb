import {Component, OnInit} from '@angular/core';
import {DeviceInfo} from 'ngx-device-detector/device-detector.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-sign-header',
  templateUrl: './sign-header.component.html',
  styleUrls: ['./sign-header.component.scss']
})
export class SignHeaderComponent implements OnInit {
  close = false;
  isTablet = false;
  deviceInfo: DeviceInfo;

  constructor(private deviceService: DeviceDetectorService,
              private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.getOS();
    this.checkBreakpoint();
  }

  getOS() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  checkBreakpoint() {
    this.breakpointObserver
      .observe(['(max-width: 1199px)'])
      .subscribe((state: BreakpointState) => {
        this.isTablet = state.matches;
      });
  }

  googlePlayStore() {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.Mobtion.Credix.Credixcel';
  }

  iOStore() {
    window.location.href = 'https://apps.apple.com/cr/app/micredix/id505208283';
  }

  huaweiStore() {
    window.location.href = 'https://appgallery.huawei.com/#/app/C102830839?locale=en_US&source=appshare&subsource=C102830839';
  }
}
