import {Component, OnInit} from '@angular/core';
import {DeviceInfo} from 'ngx-device-detector/device-detector.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'credix-sign-header',
  templateUrl: './sign-header.component.html',
  styleUrls: ['./sign-header.component.scss']
})
export class SignHeaderComponent implements OnInit {
  close = false;
  close1 = false;
  isTablet = false;
  deviceInfo: DeviceInfo;

  constructor(private deviceService: DeviceDetectorService, private breakpointObserver: BreakpointObserver) {
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
}
